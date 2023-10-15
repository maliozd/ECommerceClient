import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }
  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  async createRole(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpinFadeRotating)
    debugger
    await this.roleService.createRole(name.value, () => {  //işlem başarılı olduysa callback fonksiyonu ile yapılan islemler -->
      this.hideSpinner(SpinnerType.BallSpinFadeRotating)
      this.alertify.message("Role successfully created.",
        {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });

      this.createdRole.emit(name.value);
         //create componenti referans eden componente fırlattık.
    }, errorMesage => {
      this.alertify.message(errorMesage, {
        position: Position.TopCenter,
        messageType: MessageType.Error,
        dismissOthers: true
      })
    })
  }
}
