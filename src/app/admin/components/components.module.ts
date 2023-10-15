import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { CustomerModule } from './customers/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { DynamicLoadComponentDirective } from 'src/app/directives/common/dynamic-load-component.directive';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule
  ]
})
export class ComponentsModule { }