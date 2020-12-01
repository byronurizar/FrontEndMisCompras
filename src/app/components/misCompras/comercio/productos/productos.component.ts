import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Products } from 'src/app/shared/model/e-commerce/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal,NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { Producto } from 'src/app/modelos/producto.model';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ListaDeseos } from 'src/app/servicios/listadeseos.service';
import { environment } from 'src/environments/environment';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @Output() productDetail: any;
  @Output() productoDetalleVistaRapida: any;
  @ViewChild("modalInformacion",{static:true}) modal: ElementRef;
  modalReference: NgbModalRef;
  public productos: Producto[] = [];

  public urlImagenes = environment.urlImagnes;


  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService, private route: ActivatedRoute, private modalService: NgbModal, private listaDeseos: ListaDeseos,public productoService:ProductosService) { 
    this.route.params.subscribe(params => {
      const {idCatalogo} =params;
      const {idCategoria} =params;

      if(idCatalogo==="0" && idCategoria=="0"){
        this.productoService.listarProductos(btoa("0"),btoa("0"));
      }else{
      let auxIdCatalogo=atob(idCatalogo);
      if(Number(auxIdCatalogo)>0){
        productoService.catalogo=idCatalogo;
        productoService.categoria=idCategoria;
       this.productoService.listarProductos(idCatalogo,idCategoria);
      }
    }
     // this.listarProductos(idCatalogo,idCategoria);
    });
  }

  abrirModal(modal){
    let seAlerto=sessionStorage.getItem("notificacion") ||false;
    if(!seAlerto){
      this.modalService.open(modal,{ size: 'lg'});
      sessionStorage.setItem("notificacion",'true');
    }
}

  // async listarProductos(idCatalogo,idCategoria) {
  //   this.conectorApi.Get(`productos/comercio/listar/${idCatalogo}/${idCategoria}`).subscribe(
  //     async (data) => {
  //       let dat = data as ApiRest;
  //       if (dat.codigo == 0) {
  //         this.productos = await dat.data;
  //       }
  //     },
  //     (dataError) => {
  //       this.toastrService.error(dataError.error.error.message, 'Alerta!');
  //     }
  //   )
  // }
  ngOnInit() {
   // this.open();
    // this.listarProductos();
    this.abrirModal(this.modal);
  }
  abrirDetalle(content, id: number) {
    this.modalReference=this.modalService.open(content, { centered: true, size: 'lg' });
    this.productoDetalleVistaRapida = this.productoService.productos.find(item => item.id == id);
  }


  // add to cart service
  public addToCart(producto: any, quantity: number = 1) {
    //this.cartService.agregarProducto(producto,1,0,0);
  }

  //add to wish list service
  public addToWishlist(product: Products, quantity: number = 1) {
    // this.wishService.addToWishList(product, quantity);
    // this.showAdd();
  }

  public agregarListaDeseos(producto: any) {
    this.listaDeseos.agregarProducto(producto);
  }
  public cerrarModal(event){
    this.modalReference.close();
  }

}
