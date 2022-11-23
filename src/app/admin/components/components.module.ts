import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './products/product.module';
import { OrderModule } from './orders/order.module';
import { CustomerModule } from './customers/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthorizeMenuComponent } from './authorize-menu/authorize-menu.component';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    AuthorizeMenuModule
  ]
})
export class ComponentsModule { }