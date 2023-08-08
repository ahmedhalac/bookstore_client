import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category!: Category;
  id: number = 0;
  isEditFlow = false;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.isEditFlow = true;
      this.getCategory(this.id);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditFlow) {
        this.updateCategory();
      } else {
        this.addCategory(form);
      }
    }
  }

  onBackToList(): void {
    this.router.navigate(['/categories']);
  }

  getCategory(id: number): void {
    this.apiService.getCategory(id).subscribe({
      next: (category) => (this.category = category),
      error: (error) => {
        console.error(`Error fetching category with and id ${id}`, error);
        this.toastr.error(error.message);
      },
    });
  }

  addCategory(form: NgForm): void {
    this.apiService.addCategory(form.value).subscribe({
      next: () => {
        this.toastr.success('You added category!');
        form.reset();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }

  updateCategory(): void {
    this.apiService.updateCategory(this.id, this.category).subscribe({
      next: () => {
        this.toastr.success('You updated category!');
        this.onBackToList();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }

  handleValidation(form: NgForm): boolean {
    if (typeof form?.value.name === 'string' && form?.value.name?.length > 30)
      return true;
    return false;
  }
}
