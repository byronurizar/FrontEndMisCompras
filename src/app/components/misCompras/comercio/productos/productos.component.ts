import { Component, OnInit, Output } from '@angular/core';
import { Products } from 'src/app/shared/model/e-commerce/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { Producto } from 'src/app/modelos/producto.model';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ListaDeseos } from 'src/app/servicios/listadeseos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @Output() productDetail: any;
  @Output() productoDetalleVistaRapida: any;
  modalReference: NgbModalRef;
  public productos: Producto[] = [];

  public urlImagenes = environment.urlImagnes;


  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService, private route: ActivatedRoute, private modalService: NgbModal, private listaDeseos: ListaDeseos) { 
    this.route.params.subscribe(params => {
      const idCatalogo = +params['idCatalogo'];
      const idCategoria = +params['idCategoria'];
      this.listarProductos(idCatalogo,idCategoria);
    });
  }

  async listarProductos(idCatalogo,idCategoria) {
    this.conectorApi.Get(`productos/comercio/listar/${idCatalogo}/${idCategoria}`).subscribe(
      async (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
          this.productos = await dat.data;
        }
      },
      (dataError) => {
        this.toastrService.error(dataError.error.error.message, 'Alerta!');
      }
    )
  }
  ngOnInit() {
    // this.listarProductos();
  }
  abrirDetalle(content, id: number) {
    this.modalReference=this.modalService.open(content, { centered: true, size: 'lg' });
    this.productoDetalleVistaRapida = this.productos.find(item => item.id == id);
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
