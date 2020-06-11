import { Component, OnInit } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ElementoLista } from 'src/app/modelos/elementoLista.model';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-gs-municipio',
  templateUrl: './gs-municipio.component.html',
  styleUrls: ['./gs-municipio.component.scss']
})
export class GsMunicipioComponent implements OnInit {
  info: any[];
  public configuracion: Object;
  departamentos: ElementoLista[] = [];
  departamentosDesc: ElementoLista[] = [];
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService) {
    this.listarDepartamentos();
  }

  ngOnInit() {
    this.cargarInformacion();
  }
  async listarDepartamentos() {
    try {
      this.conectorApi.Get('departamentos/listar').subscribe(
        async (data) => {
          let dat = data as ApiRest;
          console.log("Todos los departamentos",dat.data);
        await  dat.data.forEach(departamento => {
            //this.departamentos.push(new ElementoLista(departamento.id, departamento.descripcion));
            this.departamentos.push(new ElementoLista(departamento.id, departamento.descripcion))
            this.departamentosDesc.push(new ElementoLista(departamento.descripcion, departamento.descripcion))

          });
          this.configuracion = {
            mode: 'inline', // inline|external|click-to-edit
            selectMode: 'single', // single|multi
            hideHeader: false,
            hideSubHeader: false,
            actions: {
              columnTitle: 'Acciones',
              add: true,
              edit: true,
              delete: true,
              custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }],
              position: 'left'
            },
            pager: {
              display: true,
              perPage: 10
            },
            add: {
              confirmCreate: true
            },
            edit: {
              confirmSave: true
            },
            delete: {
              confirmDelete: true
            },
            columns: {
              idDepartamento: {
                title: 'Departamento',
                filter: {
                  type: 'list',
                  config: {
                    selectText: 'Todos',
                    list: this.departamentosDesc
                  }
                },
                editor: {
                  type: 'list',
                  config: {
                    selectText: 'Select',
                    list: this.departamentosDesc
                  }
                },
                type: 'number',
              },
              descripcion: {
                title: 'Descripción'
              },
              idEstado: {
                title: 'Estado',
                filter: {
                  type: 'list',
                  config: {
                    selectText: 'Todos',
                    list: [
                      { value: 'Activo', title: 'Activo' },
                      { value: 'Inactivo', title: 'Inactivo' }
                    ]
                  }
                },
                editor: {
                  type: 'list',
                  config: {
                    selectText: 'Select',
                    list: [
                      { value: 'Activo', title: 'Activo' },
                      { value: 'Inactivo', title: 'Inactivo' }
                    ]
                  }
                },
                type: 'number',
              },
            },
            noDataMessage: 'No existen registros',
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.error, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex, 'Alerta!');
    }
  }

  cargarInformacion() {
    try {
      this.conectorApi.Get('municipios/listar').subscribe(
        (data) => {
          let dat = data as ApiRest;
          this.info = dat.data;
        },
        (dataError) => {
          this.toastrService.error(dataError.error, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex, 'Alerta!');
    }

  }

  onRegistrar(event): void {
    try {
      if (event.newData) {
        if (event.newData["descripcion"].trim().length > 0) {
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }
          let itemDepto=this.departamentos.find(depto=>depto.title==event.newData["idDepartamento"]);
          event.newData["idDepartamento"]=itemDepto.value;
          
          this.conectorApi.Post('municipios/registro', event.newData).subscribe(
            (data) => {
              let apiResult = data as ApiRest;
              if (apiResult.codigo == 0) {
                this.toastrService.success(apiResult.respuesta, 'Información!');
                event.confirm.resolve(event.newData);
                this.cargarInformacion();
              } else {
                this.toastrService.success(apiResult.respuesta, 'Alerta!');
                event.confirm.reject();
              }
            },
            (dataError) => {
              let apiResult = dataError.error as ApiRest;
              this.toastrService.error(apiResult.respuesta, 'Alerta!');
              event.confirm.reject();
            }
          );
        } else {
          this.toastrService.error("La descripción debe de contener por lo menos 3 caracteres", 'Alerta!');
        }
      } else {
        this.toastrService.error("No existe información", 'Alerta!');
      }
    } catch (error) {
      this.toastrService.error(error, 'Alerta!');

    }
  }


  onActualizar(event): void {
    try {
      if (event.newData) {
        if (event.newData["descripcion"].trim().length > 0) {
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }

          let itemDepto=this.departamentos.find(depto=>depto.title==event.newData["idDepartamento"]);
          event.newData["idDepartamento"]=itemDepto.value;
          this.conectorApi.Patch(`municipios/actualizar/${event.data["id"]}`, event.newData).subscribe(
            (data) => {
              let apiResult = data as ApiRest;
              if (apiResult.codigo == 0) {
                this.toastrService.success(apiResult.respuesta, 'Información!');
                event.confirm.resolve(event.newData);
                this.cargarInformacion();
              } else {
                this.toastrService.success(apiResult.respuesta, 'Alerta!');
                event.confirm.reject();
              }
            },
            (dataError) => {
              let apiResult = dataError.error as ApiRest;
              this.toastrService.error(apiResult.respuesta, 'Alerta!');
            }
          );
        } else {
          this.toastrService.error("La descripción debe de contener por lo menos 3 caracteres", 'Alerta!');
        }
      } else {
        this.toastrService.error("No existe información", 'Alerta!');
      }
    } catch (error) {
      this.toastrService.error(error, 'Alerta!');
    }
  }

  onElimnar1(event) {
    Swal.fire({
      title: 'Alerta',
      text: "Esta seguro de eliminar la fila?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        try {
          if (event.data) {

            let json=JSON.stringify({id:event.data['id'],idEstado:3});
            this.conectorApi.Patch(`municipios/actualizar/${event.data["id"]}`, json).subscribe(
              (data) => {
                let apiResult = data as ApiRest;
                if (apiResult.codigo == 0) {
                  this.toastrService.success("Fila eliminada exitosamente", 'Información!');
                  //this.cargarInformacion();
                  event.confirm.resolve();
                } else {
                  this.toastrService.success(apiResult.respuesta, 'Alerta!');
                  event.confirm.reject();
                }
              },
              (dataError) => {
                let apiResult = dataError.error as ApiRest;
                this.toastrService.error(apiResult.respuesta, 'Alerta!');
              }
            );
          } else {
            this.toastrService.error("No existe información", 'Alerta!');
          }
        } catch (error) {
          this.toastrService.error(error, 'Alerta!');
        }
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    });
  }

}
