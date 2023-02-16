import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';
import { ProductCategory } from '../interfaces/product-category.interface';
import { ProductCategoryService } from '../services/product-category.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {

  products: Product[] = [];
  product: Product = {};
  categories: ProductCategory[] = [];
  closeResult: string = '';
  show = false;

  ngOnInit(): void {
    this.findProducts();
    this.getCategories();
  }

  findProducts() {
    this.service.findProducts().subscribe(res => {
      this.products = res;
      this.show = this.products.length > 0;
    });
  }

  getCategories() {
    this.categoryService.findActives().subscribe(res => {
      this.categories = res;
    });
  }

  findByCategory(x: number) {
    this.show = false;
    this.service.findProductsByCategory(x).subscribe(res => {
      this.products = res;
      this.show = this.products.length > 0;
    });
  }

  constructor(private service: ProductService, private categoryService: ProductCategoryService, private modalService: NgbModal) { }

  registrar() {
    if (this.product) {
      Swal.fire({
        title: 'Registrar Producto',
        text: 'Se registrará este producto',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        confirmButtonText: 'Registrar',
        icon: 'question',
        preConfirm: () => {
          this.service.saveProduct(this.product).subscribe(res => {
            if (res) {
              Swal.fire({
                title: 'Producto registrado',
                text: 'El producto se registró con éxito',
                icon: 'success',
                timer: 4000,
                timerProgressBar: true,
              });
              this.findProducts();
              this.modalService.dismissAll();
            } else {
              this.errorAlert();
            }
          });
        }
      });
    } else {
      this.errorAlertIncomplete();
    }
  }

  registrarCategoria() {
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
        this.categoryService.saveCategoryReturn(tmp).subscribe(res => {
          if (res) {
            Swal.fire({
              title: 'Categoría registrada',
              text: 'La categoría se registró con éxito',
              icon: 'success',
              timer: 4000,
              timerProgressBar: true,
            });
            this.getCategories();
            this.product.category = res;
          } else {
            this.errorAlert();
          }
        });
      }
    });
  }

  actualizar() {
    if (this.product) {
      Swal.fire({
        title: 'Actualizar Producto',
        text: 'Se actualizará este producto',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        confirmButtonText: 'Actualizar',
        icon: 'question',
        preConfirm: () => {
          this.service.updateProduct(this.product).subscribe(res => {
            if (res) {
              Swal.fire({
                title: 'Producto actualizado',
                text: 'El producto se actualizó con éxito',
                icon: 'success',
                timer: 4000,
                timerProgressBar: true,
              });
              this.findProducts();
              this.modalService.dismissAll();
            } else {
              this.errorAlert();
            }
          });
        }
      });
    } else {
      this.errorAlertIncomplete();
    }
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open2(content: any, x: Product): void {
    this.product = {...x};
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getStatusClass(x: boolean): string {
    return x ? 'badge bg-success' : 'badge bg-danger';
  }

  getStatusText(x:boolean): string {
    return x ? 'Activo' : 'Inactivo';
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

  errorAlertIncomplete() {
    Swal.fire({
      title: 'Ocurrió un error',
      text: 'Llena todos los campos...',
      icon: 'error',
      timer: 4000,
      timerProgressBar: true,
    })
  }

  inhabilitar(x: number) {
    Swal.fire({
      title: 'Inhabilitar Producto',
      text: '¿Desea inhabilitar este producto?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Inhabilitar',
      preConfirm: () => {
        this.service.deactivateProduct(x).subscribe(res => {
          Swal.fire({
            title: 'Producto inhabilitado',
            text: 'El producto se inhabilitó con éxito',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
          });
          this.findProducts();
        });
      }
    });
  }

  habilitar(x: number) {
    Swal.fire({
      title: 'Habilitar Producto',
      text: '¿Desea habilitar este producto?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Habilitar',
      preConfirm: () => {
        this.service.activateProduct(x).subscribe(res => {
          Swal.fire({
            title: 'Producto habilitado',
            text: 'El producto se habilitó con éxito',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
          });
          this.findProducts();
        });
      }
    });
  }


}
