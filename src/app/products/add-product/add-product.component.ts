import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product!: Product;
  productForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeFrom();
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
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.addProduct(this.productForm);
    }
  }

  onBackToList(): void {
    this.router.navigate(['/products']);
  }

  addProduct(form: FormGroup): void {
    this.apiService.addProduct(form.value).subscribe({
      next: () => {
        this.toastr.success('You added product!');
        form.reset();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }
}
