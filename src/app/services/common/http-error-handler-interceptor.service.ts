import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService,private userAuthService : UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          console.log("interceptor")
          this.toastrService.message("No authorzied.", "Yetkisiz işlem", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          this.userAuthService.refreshTokenLogin(localStorage.getItem('refreshToken')).then(data =>{
            
          });
          break;
        case HttpStatusCode.InternalServerError:
          console.log(error)

          this.toastrService.message("Server error.", "Sunucu hatası", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
        case HttpStatusCode.BadRequest:
          console.log(error)

          this.toastrService.message("Invalid request.", "Geçersiz istek", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
        case HttpStatusCode.NotFound:
          console.log(error)

          this.toastrService.message("Not found.", "Bulunamadı", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
        default:
          console.log(error)

          this.toastrService.message("ERROR.", "HATA", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopFullWidth
          })
          break;
      }
      return of(error);
    }));
  }
}