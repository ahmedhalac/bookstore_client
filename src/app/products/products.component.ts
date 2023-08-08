import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.commonService.sortArrayById(this.products);
      },
      error: (error) => {
        console.error('Error fetching categories', error);
        this.toastr.error(error.message);
      },
    });
  }

  onAddProductClick(): void {
    this.router.navigate(['add-product'], { relativeTo: this.route });
  }

  onDeleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('Category deleted successfully!');
        this.getProducts();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.message);
      },
    });
  }

  onEditProduct(id: number): void {
    this.router.navigate(['edit-product'], {
      relativeTo: this.route,
      queryParams: {
        id,
      },
    });
  }
}
