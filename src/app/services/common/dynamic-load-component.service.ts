// import { Component, Injectable, ViewContainerRef } from '@angular/core';
// import { BaseComponent } from 'src/app/base/base.component';
// import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class DynamicLoadComponentService {

//   constructor(private viewContainerRef: ViewContainerRef) { }

//   async loadComponent(component: ComponentName, viewContainerRef : ViewContainerRef) {

//     let _component : any = null;

//     switch (component) {
//       case ComponentName.BasketComponent:
//         _component = await (await import ("../../ui/components/baskets/baskets.component")).BasketsComponent
//         break;
//     }
//     this.viewContainerRef.clear();
//     return this.viewContainerRef.createComponent(_component)
//   }
// }

// export enum ComponentName {
//   BasketComponent
// }
