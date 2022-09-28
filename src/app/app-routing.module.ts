import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      {path:"", component : DashboardComponent , canActivate: [AuthGuard] },

      {path: "customers", loadChildren: () => import("./admin/components/customers/customer.module").then(module => module.CustomerModule), canActivate: [AuthGuard]},
      //.com/admin/customer diye bir request gelirse, bundan sonrası için customerModule'e git. 

      {path: "products", loadChildren: () => import("./admin/components/products/product.module").then(module => module.ProductModule), canActivate: [AuthGuard]},

      {path: "orders", loadChildren: () => import("./admin/components/orders/order.module").then(module => module.OrderModule) , canActivate: [AuthGuard]},
    ], canActivate: [AuthGuard]
  },
  {path : "", component:HomeComponent},
  {path: "basket", loadChildren : () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path : "register", loadChildren : () => import("./ui/components/register/register.module").then(module => module.RegisterModule)},
  {path : "login", loadChildren : () => import("./ui/components/login/login.module").then(module => module.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
