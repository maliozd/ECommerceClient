import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entitites/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  form: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let passwordV = group.get('password').value;
          let passwordAgainV = group.get('passwordConfirm').value;
          return passwordV === passwordAgainV ? null : { notSame: true };
        },
      }
    );
  }
  //tsConfig.json  noPropertyAccessFromIndexSignature: false, --> htmlde validasyon çalışması için
  get component() {
    return this.form.controls;
    //property
  }
  submitted: boolean = false;

  async onSubmit(user: User) {
    // var form = this.form;
    // var c = this.component
    // debugger
    this.submitted = true;
    if (this.form.invalid) return;
    const result: Create_User = await this.userService.create(user);
    if (result.success)
      this.toastrService.message(result.message, 'Kayıt başarılı', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter,
      });
    else
      this.toastrService.message(result.message, 'Hata', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
      });
  }
}
