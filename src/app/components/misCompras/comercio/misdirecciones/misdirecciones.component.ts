import { Component, OnInit, Output } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { async } from '@angular/core/testing';
declare var require
const Swal = require('sweetalert2');
@Component({
  selector: 'app-misdirecciones',
  templateUrl: './misdirecciones.component.html',
  styleUrls: ['./misdirecciones.component.scss']
})
export class MisdireccionesComponent implements OnInit {
  @Output() itemDireccion: any;
  info: any[];
  modalReference: NgbModalRef;
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.cargarInformacion();
  }
  cargarInformacion() {
    try {
      this.conectorApi.Get('usuario/misdirecciones').subscribe(
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
  public abrirModal(content, esEdit = false, item = []) {
    if (esEdit) {
      this.itemDireccion = item;
    }
    this.modalReference = this.modalService.open(content, { centered: true, size: 'lg' });
  }
  public cerrarModalTalla(event) {
    this.modalReference.close();
    this.cargarInformacion();
  }
  public eliminar(id) {
    Swal.fire({
      title: 'Informacion?',
      text: "Esta seguro que desea eliminar la dirección",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.value===true) {
        const dataEstado = {
          idEstado: 3
        };
        await this.conectorApi.Patch(`usuario/direcciones/actualizar/${id}`, dataEstado).subscribe(
          (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.toastrService.success("Dirección eliminada exitosamente", 'Información!');
              this.cargarInformacion();
            } else {
              this.toastrService.error(dat.error, 'Alerta!');
            }
          },
          (dataError) => {
            this.toastrService.error(dataError.error.error.message, 'Alerta!');
          }
        )
      }
    });

  }
}