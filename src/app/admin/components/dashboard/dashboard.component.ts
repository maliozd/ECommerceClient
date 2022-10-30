import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private signalrService: SignalRService) {
    super(spinner)
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

    this.signalrService.on(HubUrls.OrderHub, ReceiveFunctions.OrderCreatedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Notify
      });
    });
  }

}
