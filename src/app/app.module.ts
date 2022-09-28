import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { JwtModule } from '@auth0/angular-jwt'
;


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,   
    AdminModule,
    UIModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config : {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7274"]
      }
    })    
  ],
  providers: [
    {
      provide : "baseUrl", useValue : "https://localhost:7274/api" , multi: true //singletonlandı??
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
