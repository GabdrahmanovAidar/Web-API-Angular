import { Directive, Input, Renderer2, SimpleChanges, ElementRef, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, UrlTree } from "@angular/router";
import { Subject } from "rxjs/Rx";

@Directive({
  selector: '[udRoutesActive]'
})
export class UDRoutesActive implements OnInit, OnDestroy, OnChanges {
  @Input('udRoutesActive') config: string | string[] | { routes: string | string[], className: string };
  @Input('udRoutesActiveExact') exact: boolean = false;

  private defaultActiveClassName = 'active';
  private destroyed$ = new Subject<any>();
  private urlTrees: UrlTree[];
  private active: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.router.events
      .takeUntil(this.destroyed$)
      .subscribe((s) => {
        if (s instanceof NavigationEnd) {
          this.update();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config')) {
      this.createUrlTrees();
      this.update();
    }
  }

  private createUrlTrees(): void {
    const routes = (Array.isArray(this.config) || typeof this.config === 'string') ?
      this.config :
      (this.config as any).routes;

    this.urlTrees = (routes as any[]).map((routeCommands) => {
      const commands = Array.isArray(routeCommands) ? routeCommands : [routeCommands];
      return this.router.createUrlTree(commands, { relativeTo: this.route });
    });
  }

  private update(): void {
    const hasActiveLinks = this.hasActiveLinks();
    if (this.active !== hasActiveLinks) {
      this.active = hasActiveLinks;
      if (this.active) {
        this.renderer.addClass(this.elementRef.nativeElement, this.getActiveClassNames);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, this.getActiveClassNames);
      }
    }
  }

  private hasActiveLinks(): boolean {
    return this.urlTrees.some((urlTree) => this.router.isActive(urlTree, this.exact));
  }

  private get getActiveClassNames(): string {
    if (typeof this.config === 'object' && typeof (this.config as any).classNames === 'string') {
      return (this.config as any).classNames;
    }
    return this.defaultActiveClassName;
  }

}