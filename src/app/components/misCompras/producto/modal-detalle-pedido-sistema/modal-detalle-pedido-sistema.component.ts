import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';

@Component({
  selector: 'app-modal-detalle-pedido-sistema',
  templateUrl: './modal-detalle-pedido-sistema.component.html',
  styleUrls: ['./modal-detalle-pedido-sistema.component.scss']
})
export class ModalDetallePedidoSistemaComponent implements OnInit {

  public total=0;
  @Input() infoPedido: any;
  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  public detalleProd:any[]=[];
  constructor(private conectorApi:ConectorApi,private toastrService: ToastrService) { }

  ngOnInit() {
    this.detallePedido(this.infoPedido.idPedido);
  }
  public cancelar() {
    this.accionModal.emit('close');
  }
  async detallePedido(idPedido) {
    try {
      if (idPedido) {
        this.conectorApi.Get(`pedido/detalle/${idPedido}`).subscribe(
         async (data) => {
            let dat =await data as ApiRest;
            if (dat.codigo == 0) {
              this.detalleProd=await dat.data;
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
}
