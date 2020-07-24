import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-gs-categoria',
  templateUrl: './gs-categoria.component.html',
  styleUrls: ['./gs-categoria.component.scss']
})
export class GsCategoriaComponent implements OnInit {
  
  constructor(private conectorApi: ConectorApi,private toastrService: ToastrService) { }
  info:any[];

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
      delete: true,
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
      },      idEstado: {
        title: 'Estado',
        required:true,
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
      }
    },
    noDataMessage: 'No existen registros',
  };

  cargarInformacion() {
    try{
    this.conectorApi.Get('categorias/listar').subscribe(
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

  onRegistrar(event):void {
    try {
      if (event.newData) {
        if (event.newData["descripcion"].trim().length > 5) {
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }
          this.conectorApi.Post('categorias/registro', event.newData).subscribe(
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
              this.toastrService.error(dataError.error.error.message, 'Alerta!');
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
          if(event.newData["idEstado"].trim().toUpperCase()=="INACTIVO"){
            event.newData["idEstado"]=2;
          }else{
            event.newData["idEstado"]=1;
          }
          this.conectorApi.Patch(`categorias/actualizar/${event.data["id"]}`, event.newData).subscribe(
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
              this.toastrService.error(dataError.error.error.message, 'Alerta!');
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
            event.data["idEstado"] = '3';
            this.conectorApi.Patch(`categorias/actualizar/${event.data["id"]}`, event.data).subscribe(
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
                this.toastrService.error(dataError.error.error.message, 'Alerta!');
                event.confirm.reject();
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
