import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection: HubConnection
  get connection(): HubConnection {
    return this._connection
  }

  //başlatılmış bir hub dönecek
  //
  start(hubUrl: string) {
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection.start().then(() =>
        console.log("hubConnection successfull!")
      ).catch(error =>
        setTimeout(() => this.start(hubUrl), 2000));

      this._connection = hubConnection;
    }
    this._connection.onreconnected(connectionId => console.log("Hub connection reconnected!!"));
    this._connection.onreconnecting(error => console.log("Hub reconnecting..."));
    this._connection.onclose(error => console.log("Hub connection closed"));
  }
  //event fırlatmak gibi
  //procedureName = backend -> receiveFunctionNames
  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this._connection.invoke(procedureName, message).then(successCallBack).catch(errorCallBack)
  }
  //serverdan gelecek olan mesajları runtimeda yakalayacak fonksiyonları tetikleyecek fonksyion
  on(procedureName: string, callBack: (...message: any) => void) {
    this._connection.on(procedureName, callBack);
  }
}
