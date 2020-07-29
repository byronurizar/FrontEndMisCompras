import { Component, OnInit, Output } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';

@Component({
  selector: 'app-pedidos-sistema',
  templateUrl: './pedidos-sistema.component.html',
  styleUrls: ['./pedidos-sistema.component.scss']
})
export class PedidosSistemaComponent implements OnInit {
  @Output() infoPedido: any;
  modalReference: NgbModalRef;
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService, private modalService: NgbModal) { }
  info: any[];
  ngOnInit() {
    this.cargarInformacion();
  }
  public abrirModal(content,item) {
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
    this.infoPedido=item;
  }
  public cerrarModalTalla(event) {
    this.modalReference.close();
  }
  cargarInformacion() {
    try {
      this.conectorApi.Get('pedido/pedidosusuario').subscribe(
        (data) => {
          let dat = data as ApiRest;
          this.info = dat.data;
        },
        (dataError) => {
          this.toastrService.error(dataError.error.error.message, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex.message, 'Alerta!');
    }

  }
}
