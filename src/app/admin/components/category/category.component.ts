import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseComponent implements OnInit {

  constructor(private categoryService : CategoryService,spinner : NgxSpinnerService) { 
    super(spinner)
  }
  @ViewChild(ListComponent) listComponents : ListComponent

  async ngOnInit() {
  }
  

 
}
