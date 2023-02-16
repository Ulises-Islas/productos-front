import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../interfaces/product-category.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.sass']
})
export class CategoriasComponent implements OnInit {

  categories: ProductCategory[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  constructor(private service: ProductCategoryService) { }

  getCategories(): void {
    this.service.findCategories().subscribe(res => {
      this.categories = res;
    });
  }

  registrar() {
    Swal.fire({
      title: 'Registrar Categoría',
      input: 'text',
      inputLabel: 'Nombre',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Registrar',
      preConfirm: (value) => {
        var tmp: ProductCategory = {};
        tmp.name = value;
        this.service.saveCategory(tmp).subscribe(res => {
          if (res) {
            Swal.fire({
              title: 'Categoría registrada',
              text: 'La categoría se registró con éxito',
              icon: 'success',
              timer: 4000,
              timerProgressBar: true,
            });
            this.getCategories();
          } else {
            this.errorAlert();
          }
        });
      }
    });
  }

  actualizar(x: ProductCategory) {
    Swal.fire({
      title: `Actualizar "${x.name}"`,
      input: 'text',
      inputLabel: 'Nombre',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: (value) => {
        x.name = value;
        this.service.updateCategory(x).subscribe(res => {
          if (res) {
            Swal.fire({
              title: 'Categoría actualizada',
              text: 'La categoría se actualizón con éxito',
              icon: 'success',
              timer: 4000,
              timerProgressBar: true,
            });
            this.getCategories();
          } else {
            this.errorAlert();
          }
        });
      }
    });
  }

  inhabilitar(x: number) {
    Swal.fire({
      title: 'Inhabilitar Categoría',
      text: '¿Desea inhabilitar esta categoría?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Inhabilitar',
      preConfirm: () => {
        this.service.deactivateCategory(x).subscribe(res => {
          Swal.fire({
            title: 'Categoría inhabilitada',
            text: 'La categoría se inhabilitó con éxito',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
          });
          this.getCategories();
        });
      }
    });
  }

  habilitar(x: number) {
    Swal.fire({
      title: 'Habilitar Categoría',
      text: '¿Desea habilitar esta categoría?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Habilitar',
      preConfirm: () => {
        this.service.activateCategory(x).subscribe(res => {
          Swal.fire({
            title: 'Categoría habilitada',
            text: 'La categoría se habilitó con éxito',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
          });
          this.getCategories();
        });
      }
    });
  }

  errorAlert() {
    Swal.fire({
      title: 'Ocurrió un error',
      text: 'Lo sentimos mucho, ocurrió un error inesperado...',
      icon: 'error',
      timer: 4000,
      timerProgressBar: true,
    })
  }

  getStatusClass(x: boolean): string {
    return x ? 'badge bg-success' : 'badge bg-danger';
  }

  getStatusText(x: boolean): string {
    return x ? 'Activo' : 'Inactivo';
  }

}
