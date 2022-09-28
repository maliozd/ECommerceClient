import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from "ngx-file-drop"
import { NgxFileDropModule } from "ngx-file-drop"
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => { //seçilen tüm dosyaları fileData içerisine koyduk
        fileData.append(_file.name, _file, file.relativePath)
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.BallScalePulse);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData)
          .subscribe(data => {
            const message: string = "Files succesfuly uploaded."
            if (this.options.isAdminPage) {
              this.alertifyService.message(message, {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopLeft
              })
            } else {
              this.customToastrService.message(message, "Success", {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopLeft
              });

            };
            this.spinner.hide(SpinnerType.BallScalePulse)

          }, (errorResponse: HttpErrorResponse) => {
            {
              const errorMessage: string = "Error occured while uploading data."
              if (this.options.isAdminPage) {
                this.alertifyService.message(errorMessage, {
                  dismissOthers: true,
                  messageType: MessageType.Error,
                  position: Position.TopLeft
                })
                this.spinner.hide(SpinnerType.BallScalePulse)
              }
              else {
                this.customToastrService.message(errorMessage, "Error", {
                  messageType: ToastrMessageType.Error,
                  position: ToastrPosition.TopLeft
                });
              }
            }
          })
      }
    })
    // //database'e gönderilecek.
    // this.httpClientService.post({
    //   controller: this.options.controller,
    //   action: this.options.action,
    //   queryString: this.options.queryString,         
    //   headers: new HttpHeaders({ "responseType": "blob" })
    // }, fileData)
    //   .subscribe(data => {
    //     const message: string = "Files succesfuly uploaded."
    //     if (this.options.isAdminPage) {
    //       this.alertifyService.message(message, {
    //         dismissOthers: true,
    //         messageType: MessageType.Success,
    //         position: Position.TopLeft
    //       })
    //     } else {
    //       this.customToastrService.message(message, "Success", {
    //         messageType: ToastrMessageType.Success,
    //         position: ToastrPosition.TopLeft
    //       });
    //     };
    //   }, (errorResponse: HttpErrorResponse) => {
    //     {
    //       const errorMessage: string = "Error occured while uploading data."
    //       if (this.options.isAdminPage) {
    //         this.alertifyService.message(errorMessage, {
    //           dismissOthers: true,
    //           messageType: MessageType.Error,
    //           position: Position.TopLeft
    //         })
    //       } else {
    //         this.customToastrService.message(errorMessage, "Error", {
    //           messageType: ToastrMessageType.Error,
    //           position: ToastrPosition.TopLeft
    //         });
    //       }
    //     }
    //   })
  }


  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: "250px",
      data: FileUploadDialogState.Yes
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.Yes) {
        afterClosed();
      }
    });
  }

}
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}

export enum FileUploadDialogState {
  Yes, No
}


