import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) //baseUrl keyine karşılık, moduledaki singleton object value dönecek.
  //baseurl'e istek gönderilecek.baseUrl merkezi tutulmalı.-->appmodule -->providers[]
  { }
  private getUrl(requestParameter: Partial<RequestParameters>) {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> { //id, her işleme ait bir parametre değil.
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint

    else
      url = `${this.getUrl(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers })  //<T> , returns observable object 
  }  
  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> { //bodynin partial alınma amacı, fonksiyon kullanılırken tip güvenliği sağlayabilmek
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.getUrl(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`

    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers })
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.getUrl(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`

    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers })
  }
  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else
      url = `${this.getUrl(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.delete<T>(url, { headers: requestParameter.headers })
  }

  private createHeader(contentType: string): any {
    return { headers: new HttpHeaders({ 'Content-Type': contentType }), responseType: 'text' };
  }
}
export class RequestParameters {  //httpClient.get() request parameters
  controller?: string;
  action?: string;
  queryString?: string
  headers?: HttpHeaders;
  baseUrl?: string
  fullEndPoint?: string; //bizim api'ın dışına başka bir yere istek gönderebilmesi için
}
