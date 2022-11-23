import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any
@Directive({
  selector: '[appDelete]' //keyword -- bu keywordu kullandığım html iteminde  domları manipüle etmeye başlar.
})
export class DeleteDirective {  //elementref --> otomatik olarak directivein üzerinde kullanıldığı html nesnesini getirir

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
    private alertifyService: AlertifyService,
  ) {
    const img = renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    renderer.appendChild(element.nativeElement, img)
  }
  @Input() id: string
  @Input() controller: string //html'den alınıyor --> daha global çözüm olabilir.
  @Output() getProductCallBack: EventEmitter<any> = new EventEmitter();  //output fonksiyon üzerinden getProducta erişiyorum

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).fadeOut(2000, () => {
          this.getProductCallBack.emit()
          this.alertifyService.message("Success", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopCenter
          });
        });
      },
      (errorResponse:HttpErrorResponse)=>{
        this.alertifyService.message("Somethings went wrong...",
        {
          messageType : MessageType.Error,
          dismissOthers:true,
          position : Position.TopCenter
        })
      })
    })
  };

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}




