import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  product!: Product;
  categories: Category[] = [];
  productForm!: FormGroup;
  id: number = 0;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.getProduct(this.id);
    }
    this.initializeFrom();
    this.getCategories();
  }

  initializeFrom(): void {
    this.productForm = this.formBuilder.group({
      title: '',
      description: '',
      isbn: '',
      author: '',
      listPrice: '',
      price: '',
      price50: '',
      price100: '',
      categoryId: '',
      imageUrl: '',
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.updateProduct();
    }
  }

  getProduct(id: number): void {
    this.apiService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.productForm.patchValue(product);
      },
      error: (error) => {
        console.error(`Error fetching product with and id ${id}`, error);
        this.toastr.error(error.message);
      },
    });
  }

  onBackToList(): void {
    this.router.navigate(['/products']);
  }

  updateProduct(): void {
    this.product = this.productForm.value;
    this.apiService.updateProduct(this.id, this.product).subscribe({
      next: () => {
        this.toastr.success('You updated product!');
        this.onBackToList();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }

  getCategories(): void {
    this.spinner.show();
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.spinner.hide();
        this.toastr.error(error.message);
      },
    });
  }
}
