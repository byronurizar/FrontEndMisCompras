import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscriber, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import 'rxjs/add/operator/map';
let productos = JSON.parse(localStorage.getItem("carritoItems")) || [];
@Injectable({
  providedIn: 'root'
})
export class Carrito {
  public itemsCarrito: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(private toastrService: ToastrService) {
    this.itemsCarrito.subscribe(productos => productos = productos);
  }

  getTodos(): Observable<any[]> {
    const itemsList = new Observable(observer => {
      observer.next(productos);
      observer.complete();
    });
    return <Observable<any[]>>itemsList;
  }


  public agregarProducto(producto: any, cantidad: number, colores: any[], color: any, tallas: any[], talla: any) {
    let nuevoProducto: any;
    let productoExistente = productos.find((items, index) => {
      if (items.producto.id == producto.id) {
        let idTallaActual = productos[index].talla.idTalla;
        let idColorActual = productos[index].color.idColor;
        if (idTallaActual == talla.idTalla) {
          if (idColorActual == color.idColor) {
            let cantidadTotal = parseInt((productos[index].cantidad)) + parseInt('' + cantidad);
            productos[index]["cantidad"] = cantidadTotal;
            this.toastrService.success('Producto agregado al carrito exitosamente');
            localStorage.setItem('carritoItems', JSON.stringify(productos));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    });

    if (!productoExistente) {
      nuevoProducto = { producto, cantidad, colores, color, tallas, talla };
      productos.push(nuevoProducto);
      this.toastrService.success('Producto agregado al carrito exitosamente');
    }
    localStorage.setItem('carritoItems', JSON.stringify(productos));
    return true;

  }

  public getCantidadTotal() {
    return this.itemsCarrito.map((producto: any[]) => {
      return productos.reduce((prev, curr: any) => {
        return prev + curr.producto.precio * curr.cantidad;
      }, 0);
    });
  }

  public eliminarItem(item: any) {
    if (item === undefined) {
      return false;
    } else {
      const index = productos.indexOf(item);
      productos.splice(index, 1);
      localStorage.setItem('carritoItems', JSON.stringify(productos));
    }
  }

  public actualizarCantidad(item: any, index: number, cantidad: number) {
    let cantidadTotal = parseInt(productos[index].cantidad) + cantidad;
    productos[index]["cantidad"] = cantidadTotal;
    localStorage.setItem('carritoItems', JSON.stringify(productos));
    if (cantidadTotal <= 0) {
      productos.splice(index, 1);
      localStorage.setItem('carritoItems', JSON.stringify(productos));
    }
    return true;
  }
  public actualizarColor(index: number, color: any) {
    productos[index].color = color;
    localStorage.setItem('carritoItems', JSON.stringify(productos));
    return true;
  }

  public actualizarTalla(index: number, talla: any) {
    productos[index].talla = talla;
    localStorage.setItem('carritoItems', JSON.stringify(productos));
    return true;
  }
}
