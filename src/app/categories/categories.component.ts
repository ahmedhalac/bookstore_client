import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCategories();
  }

  onAddCategoryClick(): void {
    this.router.navigate(['add-category'], { relativeTo: this.route });
  }

  getCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => {
        console.error('Error fetching categories', error);
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
