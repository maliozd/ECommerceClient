import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Single_Category } from 'src/app/contracts/category/category';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'parentCategory', 'childCategory', "isParentCategory"];
  dataSource: MatTableDataSource<Single_Category> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    this.showSpinner(SpinnerType.BallSpinFadeRotating);
    const allCategories: {totalCount : number, categories : Single_Category[]} = await this.categoryService.getAllCategoriesPaged(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5);
    this.dataSource = new MatTableDataSource<Single_Category>(allCategories.categories);
    this.paginator.length = allCategories.totalCount;
    this.hideSpinner(SpinnerType.BallSpinFadeRotating);
    // this.changeDetectorRef.detectChanges();
  }

  async pageChanged() {
    await this.getCategories();
  }


  showDetail(id: number) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: "1000px"
      }
    });
  }


}
