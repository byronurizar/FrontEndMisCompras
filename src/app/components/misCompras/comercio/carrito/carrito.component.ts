import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Carrito } from 'src/app/servicios/carrito.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

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
  constructor(private route: ActivatedRoute, private cartService: Carrito,private modalService: NgbModal) {
  }

  remove(item) {
    console.log("Data item",item);
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
}
