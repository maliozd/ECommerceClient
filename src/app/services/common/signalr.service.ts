import { ThisReceiver } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  
  //başlatılmış bir hub dönecek
  //
  start(hubUrl: string) {
    hubUrl = `${this.baseSignalRUrl}${hubUrl}`;
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection.start().then(() =>
        console.log("hubConnection successfull!")
      ).catch(error =>
        setTimeout(() => this.start(hubUrl), 2000));

    hubConnection.onreconnected(connectionId => console.log("Hub connection reconnected!!"));
    hubConnection.onreconnecting(error => console.log("Hub reconnecting..."));
    hubConnection.onclose(error => console.log("Hub connection closed"));
    return hubConnection;
  }
  //event fırlatmak gibi
  //procedureName = backend -> receiveFunctionNames
  invoke(hubUrl : string,procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message).then(successCallBack).catch(errorCallBack)
  }
  //serverdan gelecek olan mesajları runtimeda yakalayacak fonksiyonları tetikleyecek fonksyion
  on(hubUrl:string,procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
