import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() accionModal: EventEmitter<any> = new EventEmitter();
  departamentos: ElementoLista[] = [];
  municipios: ElementoLista[] = [];
  public validationForm: FormGroup;
  public checkoutForm: FormGroup;
  constructor(private fb: FormBuilder, private conectorApi: ConectorApi, private toastrService: ToastrService, private router: Router) {
    this.createForm();
   }

  ngOnInit() {
    this.listarDepartamentos();
  }
  createForm() {
    this.checkoutForm = this.fb.group({
      departamento: ['', Validators.required],
      idMunicipio: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      puntoReferencia: ['', [Validators.required, Validators.minLength(20)]],
    });
  }
  public cancelar(){
    this.accionModal.emit('close');
  }
  
  async onSubmit() {
    await  this.conectorApi.Post("usuario/direcciones/registro",this.checkoutForm.value).subscribe(
      (data)=>{
        let dat = data as ApiRest;
        if(dat.codigo==0){
          this.toastrService.success(dat.respuesta, 'Información!');
          this.accionModal.emit('close');
        }else{
          this.toastrService.error(dat.error, 'Alerta!');
        }
      },
      (dataError)=>{
        this.toastrService.error(dataError.error.respuesta, 'Alerta!');
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
  
  async listarMunicipios(event) {
    try {
      this.municipios = [];
      //console.log(event);
      let idDepto = event.target.value;
      if (idDepto > 0) {
        this.municipios.push(new ElementoLista('', 'Seleccione un municipio'))
        this.conectorApi.Get('municipios/listar/departamento/' + idDepto).subscribe(
          async (data) => {
            let dat = data as ApiRest;
            //console.log("Todos los municipios", dat.data);
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
