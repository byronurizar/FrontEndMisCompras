import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  public datosPedido: any = {};
  public total=0;
  public detalleProd:any[]=[];
  public PedidoId=0;
  constructor(private conectorApi: ConectorApi, private route: ActivatedRoute, private toastrService: ToastrService) {

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.PedidoId=id;
      this.infoPedido(this.PedidoId);
    });

  }
  async infoPedido(idPedido) {
    try {
      if (idPedido) {
        this.conectorApi.Get(`pedido/infopedido/${idPedido}`).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              
              this.datosPedido =await dat.data[0];
              //console.log("Producto", this.datosPedido);
            } else {
              this.toastrService.error(dat.error, 'Alerta!');
            }
          },
          (dataError) => {
            this.toastrService.error(dataError.message, 'Alerta!');
          }
        );
      }
    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }
 async detallePedido(idPedido) {
    try {
      if (idPedido) {
        this.conectorApi.Get(`pedido/detalle/${idPedido}`).subscribe(
         async (data) => {
           //console.log("DAta",data);
            let dat =await data as ApiRest;
            if (dat.codigo == 0) {
              this.detalleProd=await dat.data;
              //console.log("detalleProd",dat.data);
              const sumarTotal = (acum, { Precio,cantidad }) => acum + (Precio*cantidad)
              this.total=this.detalleProd.reduce(sumarTotal,0)
            } else {
              this.toastrService.error(dat.error, 'Alerta!');
            }
          },
          (dataError) => {
            this.toastrService.error(dataError.message, 'Alerta!');
          }
        );
      }
    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }
  ngOnInit() {
    this.detallePedido(this.PedidoId);
    
  }
}
