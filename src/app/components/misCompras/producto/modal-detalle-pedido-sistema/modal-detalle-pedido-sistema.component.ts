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
  @Output() actualizarListado: EventEmitter<boolean> = new EventEmitter();
  
  public detalleProd:any[]=[];
  public estadosPedido:any[]=[];
      
  public idEstadoPedido=0;
  public textoBoton='Cambiar';
  public editEstado:boolean=true;
  public itemDetallePedido={};
  constructor(private conectorApi:ConectorApi,private toastrService: ToastrService) { }
  public isCollapsed = true;
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
  beforeChange(e) {
  	// code
  }
  public selecionarItemDetalle(item){
    this.itemDetallePedido=item;
    this.isCollapsed = !this.isCollapsed
  }
   async actualizarDetallePedido(existeConProveedor:boolean){
    let json={};
    if(!existeConProveedor){
      json["cantidad"]=0;
      json["idEstado"]=3;
    }else{
      json["cantidad"]=this.itemDetallePedido["cantidad"];
    }
    console.log("Envio de datos",json);
    try{
      console.log("Datos de item detalle",this.itemDetallePedido);
      this.conectorApi.Patch(`pedido/detalle/actualizar/${this.itemDetallePedido["id"]}`,json).subscribe(
        (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.toastrService.success(apiResult.respuesta, 'Información!');
            this.infoPedido.idEstadoPedido=this.idEstadoPedido;
            this.detallePedido(this.infoPedido.idPedido);
            this.isCollapsed = !this.isCollapsed
            this.actualizarListado.emit(true);
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error("Ocurrió un error al intentar realizar la acción solicitada", 'Alerta!');
        }
      );
    }catch(error){
      this.toastrService.error("Ocurrió un error al intentar realizar la acción solicitada", 'Alerta!');
    }
  }

  async actualizarEstado(){
    this.editEstado=!this.editEstado;
    if(this.editEstado){
      if(this.idEstadoPedido!==this.infoPedido.idEstadoPedido){
      let jsonEStado={
        idEstadoPedido:this.idEstadoPedido
      }
      this.conectorApi.Patch(`pedido/actualizar/${this.infoPedido.idPedido}`,jsonEStado).subscribe(
        (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.toastrService.success(apiResult.respuesta, 'Información!');
            this.infoPedido.idEstadoPedido=this.idEstadoPedido;
            this.actualizarListado.emit(true);
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error("Ocurrió une error al intentar realizar la actualización del estado", 'Alerta!');
        }
      );

      }else{
        this.toastrService.error("El estado actual y el nuevo estado son identicos, por favor verifique", 'Alerta!');
      }
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
