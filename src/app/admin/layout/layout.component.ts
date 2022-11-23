import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private signalrService: SignalRService, private alertify: AlertifyService) {

    signalrService.start(HubUrls.ProductHub);
    signalrService.start(HubUrls.OrderHub)
  }

  ngOnInit(): void {
    this.signalrService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Notify
      });
    });
    this.signalrService.on(HubUrls.ProductHub, ReceiveFunctions.ProductRemovedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Notify
      });
    });
    this.signalrService.on(HubUrls.OrderHub, ReceiveFunctions.OrderCreatedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Notify
      });
    });
  }


}




