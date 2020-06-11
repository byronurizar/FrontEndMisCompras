import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbRatingConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from 'src/app/shared/model/e-commerce/product.model';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Carrito } from 'src/app/servicios/carrito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vista-rapida',
  templateUrl: './vista-rapida.component.html',
  styleUrls: ['./vista-rapida.component.scss']
})
export class VistaRapidaComponent implements OnInit {
  @Input() productoDetalleVistaRapida: any;
  public cantidad: number = 1;
  tallasDisponibles: any[] = [];
  coloresDisponibles: any[] = [];
  tallaSeleccionada = 0;
  colorSeleccionado = 0;
  idTalla: number;
  colorValido = true;
  tallaValido = true;
  public detailCnt = [];
  public slidesPerPage = 4;
  public urlImagenes = environment.urlImagnes;
  public incrementar() {
    this.cantidad += 1;
  }

  public disminuir() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;
    }
  }

  constructor(private router: Router, private conectorApi: ConectorApi, private toastrService: ToastrService, private route: ActivatedRoute, config: NgbRatingConfig, private cartService: Carrito, private ngb: NgbModal) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngb.dismissAll();
      }
    });

  }

  public addToCart(product: Products, quantity) {
    if (quantity == 0) return false;
    // this.cartService.addToCart(product, parseInt(quantity));
  }

  public agregarProducto(producto: any, cantidad: number) {
    if (cantidad == 0) {
      return false;
    } else {
      let talla = { idTalla: 0, descripcion: 'N/A' }
      if (this.coloresDisponibles.length > 0) {
        if (this.tallaSeleccionada > 0) {
          let itemTalla = this.tallasDisponibles.find(item => item.id == this.tallaSeleccionada);
          let descTalla = itemTalla.idTalla;
          talla = { idTalla: this.tallaSeleccionada, descripcion: descTalla }
        } else {
          this.tallaValido = true;
          this.toastrService.error("Debe de seleccionar una talla", 'Alerta!');
        }
      }
      let color = { idColor: 0, descripcion: 'N/A' }
      if (this.coloresDisponibles.length > 0) {
        if (this.colorSeleccionado > 0) {
          let itemColor = this.coloresDisponibles.find(item => item.id == this.colorSeleccionado);
          let descColor = itemColor.idColor;
          color = { idColor: this.colorSeleccionado, descripcion: descColor }
        } else {
          this.colorValido = false;
          this.toastrService.error("Debe de selecciónar un color", 'Alerta!');
        }
      }
      if (this.tallaValido && this.colorValido) {
        if(producto.oferta>0){
          producto.precio=producto.oferta;
        }
        this.cartService.agregarProducto(producto, cantidad, this.coloresDisponibles, color, this.tallasDisponibles, talla);
      }

    }
  }

  public buyNow(product: Products, quantity) {
    if (quantity > 0)
      this.router.navigate(['/comercio/finalizarpedido']);
  }
  ngOnInit() {
    this.litarTallasDisponibles();
  }
  async litarTallasDisponibles() {
    try {
      this.conectorApi.Get(`productos/asigtalla/listar/${this.productoDetalleVistaRapida.id}`).subscribe(
        async (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.tallasDisponibles = await apiResult.data;
            this.listarColoresDisponibles(this.productoDetalleVistaRapida.id);
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.message, 'Alerta!');
        }
      )

    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }
  async listarColoresDisponibles(idProducto) {
    try {
      this.conectorApi.Get(`productos/asigcolor/listar/${idProducto}`).subscribe(
        async (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.coloresDisponibles = await apiResult.data;
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.message, 'Alerta!');
        }
      )

    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }

}
