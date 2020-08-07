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
  public estadosPedido:any[]=[];
      
  public idEstadoPedido=0;
  public textoBoton='Cambiar';
  public editEstado:boolean=true;
  constructor(private conectorApi:ConectorApi,private toastrService: ToastrService) { }

  ngOnInit() {
    this.detallePedido(this.infoPedido.idPedido);
    this.idEstadoPedido=this.infoPedido.idEstadoPedido
    this.getEstadosPedido();
  }
  public cancelar() {
    this.accionModal.emit('close');
  }
  async getEstadosPedido(){
    try{
      this.conectorApi.Get('estadopedido/listar').subscribe(
        (data) => {
          let dat = data as ApiRest;
          this.estadosPedido = dat.data.filter(i=>i.idEstado==="Activo");
        },
        (dataError) => {
          this.toastrService.error(dataError.error.error.message, 'Alerta!');
        }
      )
      }catch(ex){
        this.toastrService.error('Ocurrió un error al intentar obtener los estados de los pedidos', 'Alerta!');
      }
  }
  public cambiarEstado(event){
this.idEstadoPedido= event.target.value;
  }
  async actualizarEstado(){
    this.editEstado=!this.editEstado;
    console.log("Estado seleccionado",this.idEstadoPedido);
    if(this.textoBoton==="Cambiar"){
      this.textoBoton="Actualizar";
      let jsonEStado={
        idEstadoPedido:this.idEstadoPedido
      }
      this.conectorApi.Patch(`pedido/actualizar/${this.infoPedido.idPedido}`,jsonEStado).subscribe(
        (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.toastrService.success(apiResult.respuesta, 'Información!');
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error("Ocurrió une error al intentar realizar la actualización del estado", 'Alerta!');
        }
      );

    }else{
      this.textoBoton='Cambiar';
    }
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
