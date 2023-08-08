import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/add-category', component: AddCategoryComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/add-product', component: AddProductComponent },
  { path: 'products/edit-product', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
