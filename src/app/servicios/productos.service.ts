import { ConectorApi } from "./conectorApi.service";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Producto } from "../modelos/producto.model";
import { ApiRest } from "../modelos/apiResponse.model";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class ProductosService{
    public productos: any[] = [];
    public itemsProductos: BehaviorSubject<any[]> = new BehaviorSubject([]);
    constructor(private conectorApi: ConectorApi, private toastrService: ToastrService,private router: Router) {
        this.itemsProductos.subscribe(productos => productos = productos);
     }
    


    // buscarInformacion(filtro){
    //     console.log("Filtro ingresado",filtro);
    //     this.listarProductos(0,0);
    //   }

    //   getTodos(): Observable<any[]> {
    //     const itemsList = new Observable(observer => {
    //       observer.next(productos);
    //       observer.complete();
    //     });
    //     return <Observable<any[]>>itemsList;
    //   }

    async buscarInformacion(filtro:String) {
        if(filtro.trim().length>0){
        this.conectorApi.Post(`productos/comercio/listar/filtro`,{filtro}).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.productos = await dat.data;
              this.router.navigate(['/comercio/productos/-1/1']);
            //   console.log("Datos de productos con filtro",this.productos);
            }
          },
          (dataError) => {
            this.toastrService.error("Ocurrió un error al intentar cargar los productos", 'Alerta!');
          }
        )
        }
      }
      async listarProductos(idCatalogo,idCategoria) {
        this.conectorApi.Get(`productos/comercio/listar/${idCatalogo}/${idCategoria}`).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.productos = await dat.data;
            //   console.log("Datos de productos",this.productos);
            }
          },
          (dataError) => {
            this.toastrService.error("Ocurrió un error al intentar cargar los productos", 'Alerta!');
          }
        )
      }
}