import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-modal-colores',
  templateUrl: './modal-colores.component.html',
  styleUrls: ['./modal-colores.component.scss']
})
export class ModalColoresComponent implements OnInit {
  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  @Input() itemProducto: any;
  @Input() indexArreglo: number;
  coloresDisponibles: any;
  colorSeleccionado = 0;
  nuevoColor=0;
  constructor(private toastrService: ToastrService,private carrito:Carrito) { }

  ngOnInit() {
    this.coloresDisponibles = this.itemProducto.colores;
    this.colorSeleccionado = this.itemProducto.color.idColor;
  }
  public continuar(){
    let itemColor=this.coloresDisponibles.find(item=>item.id==this.nuevoColor);
    let descripcion=itemColor.idColor;
    let color={idColor:this.nuevoColor,descripcion}
    this.carrito.actualizarColor(this.indexArreglo,color);
    this.accionModal.emit('close');
  }
  public cancelar(){
    this.accionModal.emit('close');
  }
  public cambiarColor(idColor){
    this.nuevoColor=idColor;
  }
}