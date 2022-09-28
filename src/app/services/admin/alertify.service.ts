import { Injectable } from '@angular/core';
declare var alertify: any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position)
    const msg = alertify[options.messageType](message); // tsconfig.jsondan stricti false yaptığında kısıtlama kalkıyor.
    if (options.dismissOthers) {
      msg.dismissOthers();
    }

  }
  dismiss() {
    alertify.dismissAll();
  }
}
export class AlertifyOptions { 
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay : number = 2;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Success = "success",
  Notify = "notify",
  Warning = "warning"
}
export enum Position {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}