import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/servicios/carrito.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  public cartItems: Observable<any[]> = of([]);
  public selectCartItems: any[] = [];
  modalReference: NgbModalRef;
  public urlImagenes = environment.urlImagnes;
  constructor(private route: ActivatedRoute, 
    private cartService: Carrito,
    private modalService: NgbModal,private conectorApi:ConectorApi,private router: Router, private toastrService: ToastrService) {
  }

  remove(item) {
    //console.log("Data item",item);
    this.cartService.eliminarItem(item);
  }
  
  public getTotal():Observable<number> {
    return this.cartService.getCantidadTotal();
  }

  public disminuir(item: any,indexArrelgo:number, cantidad: number = -1) {
    this.cartService.actualizarCantidad(item,indexArrelgo, cantidad)

  }

  public incrementar(item: any, indexArrelgo:number,cantidad: number = +1) {
    this.cartService.actualizarCantidad(item,indexArrelgo, cantidad)
  }

  ngOnInit() {
    this.cartItems = this.cartService.getTodos();
    this.cartItems.subscribe(selectCartItems => this.selectCartItems = selectCartItems)
  }

  public abrirModal(content){
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
  }
  public cerrarModalTalla(event){
    this.modalReference.close();
  }
  continuarPedido(){
    if(this.conectorApi.usuario.email){
      this.router.navigate(['/comercio/finalizarpedido']);
    }else{
      this.toastrService.warning("Para poder continuar con el pedido debe de iniciar sesión",'Alerta!');
    }
  }
}
