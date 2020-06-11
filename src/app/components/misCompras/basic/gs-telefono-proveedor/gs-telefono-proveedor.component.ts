import { Component, OnInit } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ElementoLista } from 'src/app/modelos/elementoLista.model';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-gs-telefono-proveedor',
  templateUrl: './gs-telefono-proveedor.component.html',
  styleUrls: ['./gs-telefono-proveedor.component.scss']
})
export class GsTelefonoProveedorComponent implements OnInit {
  info: any[];
  public configuracion: Object;
  proveedores: ElementoLista[] = [];
  proveedoresFiltro: ElementoLista[] = [];
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService) {
    this.listarProveedores();
  }

  ngOnInit() {
    this.cargarInformacion();
  }
  async listarProveedores() {
    try {
      this.conectorApi.Get('proveedores/listar').subscribe(
        async (data) => {
          let dat = data as ApiRest;
          console.log("Todos los departamentos",dat.data);
        await  dat.data.forEach(departamento => {
            //this.departamentos.push(new ElementoLista(departamento.id, departamento.descripcion));
            this.proveedores.push(new ElementoLista(departamento.id, departamento.nombre))
            this.proveedoresFiltro.push(new ElementoLista(departamento.nombre, departamento.nombre))

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
              idProveedor: {
                title: 'Proveedor',
                filter: {
                  type: 'list',
                  config: {
                    selectText: 'Todos',
                    list: this.proveedoresFiltro
                  }
                },
                editor: {
                  type: 'list',
                  config: {
                    selectText: 'Select',
                    list: this.proveedoresFiltro
                  }
                },
                type: 'number',
              },
              telefono: {
                title: 'Telefono'
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
      this.conectorApi.Get('proveedores/telefonos/listar').subscribe(
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
        if (event.newData["telefono"].trim().length > 7) {
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }

          let itemProveedor=this.proveedores.find(item=>item.title==event.newData["idProveedor"]);
          event.newData["idProveedor"]=itemProveedor.value;

          this.conectorApi.Post('proveedores/telefonos/registro', event.newData).subscribe(
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
          this.toastrService.error("El telefono debe de contener por lo menos 8 caracteres", 'Alerta!');
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
        if (event.newData["telefono"].trim().length > 7) {
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }

          let itemProveedor=this.proveedores.find(item=>item.title==event.newData["idProveedor"]);
          event.newData["idProveedor"]=itemProveedor.value;
          
          this.conectorApi.Patch(`proveedores/telefonos/actualizar/${event.data["id"]}`, event.newData).subscribe(
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
          this.toastrService.error("El teléfono debe de contener por lo menos 8 caracteres", 'Alerta!');
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
            this.conectorApi.Patch(`proveedores/telefonos/actualizar/${event.data["id"]}`, json).subscribe(
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
