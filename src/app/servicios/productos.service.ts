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
    public catalogo=0;
    public categoria=0;
    public itemsProductos: BehaviorSubject<any[]> = new BehaviorSubject([]);
    constructor(private conectorApi: ConectorApi, private toastrService: ToastrService,private router: Router) {
        this.itemsProductos.subscribe(productos => productos = productos);
     }
    async buscarInformacion(filtro:String) {
        if(filtro.trim().length>0){
        this.conectorApi.Post(`productos/comercio/listar/filtro`,{filtro}).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.productos = await dat.data;
              this.router.navigate(['/comercio/productos/LTE=/MQ==']);
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
        idCatalogo=atob(idCatalogo);
        idCategoria=atob(idCategoria);
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