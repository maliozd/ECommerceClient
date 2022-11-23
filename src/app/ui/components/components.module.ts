import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';




@NgModule({
  declarations: [     
  
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule  ,
    RegisterModule,
    // LoginModule
    ProfileModule
  ],
  exports :[
    BasketsModule
  ]
})
export class ComponentsModule { }
