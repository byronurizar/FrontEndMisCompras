import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Router } from '@angular/router';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-gs-estado',
  templateUrl: './gs-estado.component.html',
  styleUrls: ['./gs-estado.component.scss']
})
export class GsEstadoComponent implements OnInit {
  info: any[];
  constructor(private conectorApi: ConectorApi, private toastrService: ToastrService,private router:Router) { }
  ngOnInit() {
    this.cargarInformacion();
  }

  settings = {
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Acciones',
      add: true,
      edit: true,
      delete: false,
      custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }],
      position: 'left'
    },
    pager:{
      display:true,
      perPage:10
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
      descripcion: {
        title: 'Descripción'
      }
    },
    noDataMessage: 'No existen registros',
  };


  cargarInformacion() {
    this.conectorApi.Get('estados/listar').subscribe(
      (data) => {
        let dat = data as ApiRest;
        this.info = dat.data;
      },
      (dataError) => {
        this.toastrService.error(dataError.error, 'Alerta!');
      }
    )
    
  }

  onRegistrar(event):void {
    try {
      if (event.newData) {
        if (event.newData["descripcion"].trim().length > 5) {
          this.conectorApi.Post('estados/registro', event.newData).subscribe(
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
          this.toastrService.error("La descripción debe de contener por lo menos 5 caracteres", 'Alerta!');
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
        if (event.newData["descripcion"].trim().length > 5) {
          this.conectorApi.Patch(`estados/actualizar/${event.data["id"]}`, event.newData).subscribe(
            (data) => {
              let apiResult = data as ApiRest;
              if (apiResult.codigo == 0) {
                this.toastrService.success(apiResult.respuesta, 'Información!');
                event.confirm.resolve(event.newData);
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
          this.toastrService.error("La descripción debe de contener por lo menos 5 caracteres", 'Alerta!');
        }
      } else {
        this.toastrService.error("No existe información", 'Alerta!');
      }
    } catch (error) {
      this.toastrService.error(error, 'Alerta!');
    }
  }

//   onElimnar2(event): void {
//     if (window.confirm('Esta seguro de eliminar el estado?')) {
//     try {
//       if (event.data) {
//         event.data["activo"] = '0';
//         this.conectorApi.Patch(`estados/actualizar/${event.data["id"]}`, event.data).subscribe(
//           (data) => {
//             let apiResult = data as ApiRest;
//             if (apiResult.codigo == 0) {
//               this.toastrService.success("Fila eliminada exitosamente", 'Información!');
//               this.cargarInformacion();
//             } else {
//               this.toastrService.success(apiResult.respuesta, 'Alerta!');
//             }
//           },
//           (dataError) => {
//             let apiResult = dataError.error as ApiRest;
//             this.toastrService.error(apiResult.respuesta, 'Alerta!');
//           }
//         );
//       } else {
//         this.toastrService.error("No existe información", 'Alerta!');
//       }
//     } catch (error) {
//       this.toastrService.error(error, 'Alerta!');
//     }
//   }
// }

onElimnar(event) {
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
          event.data["activo"] = '0';
          this.conectorApi.Patch(`estados/actualizar/${event.data["id"]}`, event.data).subscribe(
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

      // Swal.fire(
      //   'Eliminado!',
      //   'Estado eliminado exitosamente',
      //   'success'
      // )

    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
      // Swal.fire(
      //   'Cancelado',
      //   'El estado no se eliminará',
      //   'error'
      // )
    }
  });
}

}
