import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onAddCategoryClick(): void {
    this.router.navigate(['add-category'], { relativeTo: this.route });
  }

  getCategories(): void {
    this.spinner.show();
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.commonService.sortArrayById(this.categories);
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.spinner.hide();
        this.toastr.error(error.message);
      },
    });
  }

  onDeleteCategory(id: number): void {
    this.apiService.deleteCategory(id).subscribe({
      next: () => {
        this.toastr.success('Category deleted successfully!');
        this.getCategories();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }

  onEditCategory(id: number): void {
    this.router.navigate(['add-category'], {
      relativeTo: this.route,
      queryParams: {
        id,
      },
    });
  }
}
