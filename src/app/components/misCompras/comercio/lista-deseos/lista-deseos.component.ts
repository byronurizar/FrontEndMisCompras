import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/shared/model/e-commerce/cart.model';
import { Observable, of } from 'rxjs';
import { ListaDeseos } from 'src/app/servicios/listadeseos.service';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.scss']
})
export class ListaDeseosComponent implements OnInit {

  public cartItems: Observable<any[]> = of([]);
  public selectCartItems: any[] = [];

  constructor(private listaDeseso:ListaDeseos) {
  }

  remove(item) {
    this.listaDeseso.eliminarItem(item);
  }

  ngOnInit() {
    this.cartItems = this.listaDeseso.getTodos();
    this.cartItems.subscribe(selectCartItems => this.selectCartItems = selectCartItems)
  }
}
