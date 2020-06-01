import {
  Directive, ContentChild, AfterContentInit, ElementRef, OnDestroy,
  Inject, forwardRef
} from '@angular/core';
import { NgbDropdownMenu, NgbDropdown } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Subscription } from 'rxjs/Subscription';

// https://github.com/ng-bootstrap/ng-bootstrap/issues/1012
@Directive({
  selector: '[ngbDropdown][ngbDropdownReposition]',
})
export class NgbDropdownRepositionDirective implements AfterContentInit, OnDestroy {
  @ContentChild(NgbDropdownMenu) private menu: NgbDropdownMenu;
  @ContentChild(NgbDropdownMenu, { read: ElementRef }) private menuRef: ElementRef;

  private oldParent: HTMLElement | null;
  private onChangeSubscription: Subscription;

  constructor(@Inject(forwardRef(() => NgbDropdown)) private dropdown: NgbDropdown) {
  }

  ngAfterContentInit() {
    this.oldParent = (this.menuRef.nativeElement as HTMLElement).parentElement;
    this.menu.position = (triggerEl: HTMLElement, placement: string) => {
      if (!this.isInBody()) {
        this.appendMenuToBody();
      }
      this.menu.applyPlacement(positionElements(triggerEl, this.menuRef.nativeElement, placement, true));
    };

    this.onChangeSubscription = this.dropdown.openChange.subscribe((open: boolean) => {
      if (!open) {
        this.removeMenuFromBody();
      }
    });

  }

  ngOnDestroy() {
    this.removeMenuFromBody();
    if (this.onChangeSubscription) {
      this.onChangeSubscription.unsubscribe();
    }
  }

  private isInBody() {
    return this.menuRef.nativeElement.parentNode === document.body;
  }

  private removeMenuFromBody() {
    if (this.isInBody()) {
      if (this.oldParent) {
        this.oldParent.appendChild(this.menuRef.nativeElement);
      }
      window.document.body.classList.remove('dropdown');
    }
  }

  private appendMenuToBody() {
    window.document.body.appendChild(this.menuRef.nativeElement);
  }
}
