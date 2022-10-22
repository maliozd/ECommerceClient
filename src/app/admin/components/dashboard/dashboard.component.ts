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
  }

  ngOnInit(): void {
    this.signalrService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Notify
      });
    });
  }

}
