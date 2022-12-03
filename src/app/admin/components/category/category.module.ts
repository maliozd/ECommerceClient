import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { MatSortHeader } from '@angular/material/sort';
import { ListComponent } from './list/list.component';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    CategoryComponent,
    SingleCategoryComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: CategoryComponent },
      { path : ":categoryId", component : SingleCategoryComponent}
    ]),
    MatCardModule,MatTableModule,  MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatPaginatorModule,MatSelectModule,
    MatCardModule,MatBadgeModule,
  ]
})
export class CategoryModule { }
