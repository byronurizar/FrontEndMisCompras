import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { Carrito } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-modal-tallas',
  templateUrl: './modal-tallas.component.html',
  styleUrls: ['./modal-tallas.component.scss']
})
export class ModalTallasComponent implements OnInit {
  @Input() itemProducto: any;
  @Input() indexArreglo: number;
  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  tallasDisponibles: any;
  tallaSeleccionada = 0;
  nuevatalla=0;

  constructor(private toastrService: ToastrService,private carrito:Carrito) { }

  ngOnInit() {
    this.tallasDisponibles = this.itemProducto.tallas;
    this.tallaSeleccionada = this.itemProducto.talla.idTalla;
  }
  public continuar(){
    let itemTalla=this.tallasDisponibles.find(item=>item.id==this.nuevatalla);
    let descripcion=itemTalla.idTalla;
    let talla={idTalla:this.nuevatalla,descripcion}
    this.carrito.actualizarTalla(this.indexArreglo,talla);
    this.accionModal.emit('close');
  }
  public cancelar(){
    this.accionModal.emit('close');
  }
  public cambiarTalla(idTalla){
    this.nuevatalla=idTalla;
  }
}
