import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ElementoLista } from 'src/app/modelos/elementoLista.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-edit-direccion',
  templateUrl: './modal-edit-direccion.component.html',
  styleUrls: ['./modal-edit-direccion.component.scss']
})
export class ModalEditDireccionComponent implements OnInit {
  @Input() itemDireccion: any;
  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  departamentos: ElementoLista[] = [];
  municipios: ElementoLista[] = [];
  public checkoutForm: FormGroup;
  constructor(private fb: FormBuilder, private conectorApi: ConectorApi, private toastrService: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.createForm();
    this.listarDepartamentos();
    this.listarMunicipios(null, this.itemDireccion.idDepartamento);
  }
  createForm() {
    this.checkoutForm = this.fb.group({
      idDepartamento: ['', Validators.required],
      idMunicipio: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      puntoReferencia: ['', [Validators.required, Validators.minLength(20)]],
      telefono: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.checkoutForm.setValue({
      idDepartamento:this.itemDireccion.idDepartamento,
      idMunicipio:this.itemDireccion.idMunicipio,
      direccion:this.itemDireccion.direccion,
      puntoReferencia:this.itemDireccion.puntoReferencia,
      telefono:''
    });
  }
  public cancelar() {
    this.accionModal.emit('close');
  }

  async onSubmit() {
    await this.conectorApi.Patch(`usuario/direcciones/actualizar/${this.itemDireccion.id}`, this.checkoutForm.value).subscribe(
      (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
          this.toastrService.success(dat.respuesta, 'Información!');
          this.accionModal.emit('close');
        } else {
          this.toastrService.error(dat.error, 'Alerta!');
        }
      },
      (dataError) => {
        console.log("Data error", dataError);
        this.toastrService.error(dataError.error.error.message, 'Alerta!');
      }
    )
  }

  async listarDepartamentos() {
    try {
      this.departamentos.push(new ElementoLista('', 'Seleccione un departamento'))
      this.conectorApi.Get('departamentos/listar').subscribe(
        async (data) => {
          let dat = data as ApiRest;
          await dat.data.forEach(departamento => {
            this.departamentos.push(new ElementoLista(departamento.id, departamento.descripcion))
          });
        },
        (dataError) => {
          this.toastrService.error(dataError.error.respuesta, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex.message, 'Alerta!');
    }
  }

  async listarMunicipios(event, idDepartamento) {
    try {
      let idDepto = 0;
      this.municipios = [];
      if (event) {
        idDepto = event.target.value;
      } else {
        idDepto = idDepartamento;
      }
      if (idDepto > 0) {
        this.municipios.push(new ElementoLista('', 'Seleccione un municipio'))
        this.conectorApi.Get('municipios/listar/departamento/' + idDepto).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            await dat.data.forEach(muni => {
              this.municipios.push(new ElementoLista(muni.id, muni.descripcion))
            });
          },
          (dataError) => {
            this.toastrService.error(dataError.error.respuesta, 'Alerta!');
          }
        )
      }
    } catch (ex) {
      this.toastrService.error(ex.message, 'Alerta!');
    }

  }
}
