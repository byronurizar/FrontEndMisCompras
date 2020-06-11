import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscriber, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

let productos = JSON.parse(localStorage.getItem("listaDeseosItems")) || [];
@Injectable({
    providedIn: 'root'
})
export class ListaDeseos {
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


    public agregarProducto(producto: any) {
        console.log("Agregar", producto);
        let productoExistente = productos.find((items, index) => {
            if (items.id == producto.id) {
                this.toastrService.success('El producto ya se encuentra en la lista de deseos');
                return true;
            }
        });

        if (!productoExistente) {
            productos.push(producto);
            this.toastrService.success('Producto agregado a lista de deseos exitosamente');
}
        localStorage.setItem('listaDeseosItems', JSON.stringify(productos));
        return true;

    }

    public eliminarItem(item: any) {
        if (item === undefined) {
            return false;
        } else {
            const index = productos.indexOf(item);
            productos.splice(index, 1);
            localStorage.setItem('listaDeseosItems', JSON.stringify(productos));
        }
    }
}
