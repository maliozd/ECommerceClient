import { Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Injectable({
    providedIn: 'root'
})
export class DynamicLoadComponentService {

    //ViewContainerRef          : Dinamik olarak yüklenecek componenti içerisinde barındıran container'dır. (Her dinamik yükleme sürecinde önceki view'leri clear etmemiz gerekmektedir.)

    constructor() { }

    async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
        let _component: any = null;

        switch (component) {
            case ComponentType.BasketsComponent:
                _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
                break;
        }

        viewContainerRef.clear();
        return viewContainerRef.createComponent(_component)
    }
}

export enum ComponentType {
    BasketsComponent
}
