import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.component.html',
  styleUrls: ['./modal-detalle-pedido.component.scss']
})
export class ModalDetallePedidoComponent implements OnInit {
  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  public cancelar() {
    this.accionModal.emit('close');
  }
}
