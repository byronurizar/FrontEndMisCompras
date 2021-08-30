import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementoLista } from 'src/app/modelos/elementoLista.model';
import { ToastrService } from 'ngx-toastr';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Carrito } from 'src/app/servicios/carrito.service';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/servicios/productos.service';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.scss']
})
export class FinalizarPedidoComponent implements OnInit {
  direcciones: any[];
  itemDireccion: any = {};
  tipoPagoSeleccionado = 0;
  nuevoTipoPago = 0;
  departamentos: ElementoLista[] = [];
  municipios: ElementoLista[] = [];
  tiposPago: any[] = [];
  detallePedido: any[] = [];
  public cartItems: Observable<any[]> = of([]);
  public checkOutItems: any;
  public totalPedido: number;
  public costoEnvio: number;
  public submitted = false;
  public userInfo: string;
  modalReference: NgbModalRef;
  public observaciones: string = "";
  constructor(private router: Router, private fb: FormBuilder, private conectorApi: ConectorApi, private toastrService: ToastrService, private carrito: Carrito, private modalService: NgbModal,public productoService:ProductosService) {
    this.listarMisDirecciones(0);
  }

  public seleccionarDireccion(item) {
    this.itemDireccion = item;
  }

  public cambiarTipoPago(idtipo) {
    this.nuevoTipoPago = idtipo;
  }

  public abrirModal(content) {
    this.modalReference = this.modalService.open(content);
  }
  public cerrarModal(event) {
    console.log("Evento cerrar",event);
    this.modalReference.close();
  }

  public actualizarLista(idDireccion){
    console.log("Evento",event);
if(idDireccion){
    this.listarMisDirecciones(idDireccion);
}
  }
  async registrarPedido() {
    this.detallePedido = [];
    if (this.itemDireccion.id > 0) {

      this.checkOutItems.forEach(item => {
        let itemPedido = {
          id: item.producto.id,
          idTalla: item.talla.idTalla,
          idColor: item.color.idColor,
          cantidad: item.cantidad
        }
        this.detallePedido.push(itemPedido);
      });
      let json = {
        idDireccionUsuario: this.itemDireccion.id,
        costoEnvio: this.costoEnvio,
        idTipoPago: this.tipoPagoSeleccionado,
        observaciones: this.observaciones,
        detallePedido: this.detallePedido,
      }
      await this.conectorApi.Post("pedido/registro", json).subscribe(
        (data) => {
          let dat = data as ApiRest;
          if (dat.codigo == 0) {
            const idPedido  = dat.data;
            Swal.fire({
              title: 'Informacion?',
              text: "Pedido generado exitosamente",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              this.carrito.limpiarCarrito();
              this.router.navigate(['/comercio/detallepedido/' + idPedido]);
            });
          } else {
            this.toastrService.error(dat.error, 'Alerta!');
          }
        },
        (dataErrror) => {
          this.toastrService.error(dataErrror.error, 'Alerta!');
        }
      )
    } else {
      this.toastrService.error("Debe de seleccionar una dirección para poder realizar la entrega", "Alerta!");
    }
  }

  public getTotal(): Observable<number> {
    return this.carrito.getCantidadTotal();
  }
  ngOnInit() {
    this.cartItems = this.carrito.getTodos();
    this.cartItems.subscribe(products => this.checkOutItems = products);
    this.carrito.getCantidadTotal().subscribe(amount => this.totalPedido = amount);
    if (this.totalPedido > 500) {
      this.costoEnvio = 0;
    } else {
      this.costoEnvio = 30;
    }
    this.totalPedido += this.costoEnvio;
    this.listarTipoPago();
  }

  async listarTipoPago() {
    try {
      this.tiposPago = [];
      this.conectorApi.Get('tipopago/listar').subscribe(
        (data) => {
          let dat = data as ApiRest;
          if (dat.codigo == 0) {
            this.tiposPago = dat.data;
            if (this.tiposPago.length == 1) {
              this.tipoPagoSeleccionado = 1;
            }
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.error, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex, 'Alerta!');
    }
  }

  listarMisDirecciones(idDireccion) {
    try {
      this.conectorApi.Get('usuario/misdirecciones').subscribe(
        (data) => {
          let dat = data as ApiRest;
          this.direcciones = dat.data;
          if(idDireccion>0){
            this.itemDireccion=this.direcciones.find(item=>item.id===idDireccion);
          }else if(idDireccion==0){
            if(this.direcciones.length>0){
              this.itemDireccion = this.direcciones[0];
            }
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.error.error.message, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex.message, 'Alerta!');
    }

  }
  regresar(){
    this.router.navigate([`/comercio/productos/${this.productoService.catalogo}/${this.productoService.categoria}`]);
  }
}
