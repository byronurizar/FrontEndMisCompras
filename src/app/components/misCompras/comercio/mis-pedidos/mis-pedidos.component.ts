import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.scss']
})
export class MisPedidosComponent implements OnInit {
  modalReference: NgbModalRef;
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  public abrirModal(content) {
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
  }
  public cerrarModalTalla(event) {
    this.modalReference.close();
  }
}
