import { Component, OnInit } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.component.html',
  styleUrls: ['./misdirecciones.component.scss']
})
export class MisdireccionesComponent implements OnInit {
  info:any[];
  modalReference: NgbModalRef;
  constructor(private conectorApi: ConectorApi,private toastrService: ToastrService,private modalService: NgbModal) { }

  ngOnInit() {
    this.cargarInformacion();
  }
  cargarInformacion() {
    try{
    this.conectorApi.Get('usuario/misdirecciones').subscribe(
      (data) => {
        let dat = data as ApiRest;
        this.info = dat.data;
      },
      (dataError) => {
        this.toastrService.error(dataError.error.error.message, 'Alerta!');
      }
    )
    }catch(ex){
      this.toastrService.error(ex.message, 'Alerta!');
    }
    
  }
  public abrirModal(content){
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
  }
  public cerrarModalTalla(event){
    this.modalReference.close();
    this.cargarInformacion();
  }
}
