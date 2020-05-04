import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { env } from "app/helpers/env";

@Directive({
    selector: '[udEnv]'
})
export class UDEnvDirective implements OnInit {
    @Input('udEnv') env: string;

    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        if (this.env === env.toString()) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
