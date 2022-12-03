import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/common/models/category.service';




@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private categoryService : CategoryService ) { }


 

  
  
  categoryId : string;

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];
    console.log(this.categoryId)
  }

}

