import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementoLista } from 'src/app/modelos/elementoLista.model';
import { ToastrService } from 'ngx-toastr';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Carrito } from 'src/app/servicios/carrito.service';
import { Router } from '@angular/router';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.scss']
})
export class FinalizarPedidoComponent implements OnInit {
  tipoPagoSeleccionado=0;
  nuevoTipoPago=0;
  departamentos: ElementoLista[] = [];
  municipios: ElementoLista[] = [];
  tiposPago:any[]=[];
  detallePedido:any[]=[];
  public cartItems: Observable<any[]> = of([]);
  public checkOutItems: any;
  public checkoutForm: FormGroup;
  public amount: number;
  public submitted = false;
  public userInfo: string;
  constructor(private router: Router,private fb: FormBuilder,private conectorApi: ConectorApi, private toastrService: ToastrService,private carrito:Carrito) {
    this.createForm();
  }

  createForm() {
    this.checkoutForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
      telefonos: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      puntoReferencia: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  public cambiarTipoPago(idtipo){
    this.nuevoTipoPago=idtipo;
  }
  
  async onSubmit() {
    this.detallePedido=[];
    let dataPedido;
    this.submitted = true;
    // if (this.checkoutForm.invalid) {
    //   return;
    // }
    this.userInfo = this.checkoutForm.value;
    //console.log("Info formulario",this.userInfo);
    //console.log("info",this.checkOutItems);
    this.checkOutItems.forEach(item=>{
     let itemPedido={
        id:item.producto.id,
        idTalla:item.talla.idTalla,
        idColor:item.color.idColor,
        cantidad:item.cantidad
      }
      this.detallePedido.push(itemPedido);
    })

let json={
  data:this.userInfo,
  detallePedido:this.detallePedido,
  idTipoPago:this.tipoPagoSeleccionado
}



  await  this.conectorApi.Post("pedido/recibe/registro", json).subscribe(
      (data)=>{
        let dat = data as ApiRest;
        if(dat.codigo==0){
          const {idPedido}=dat.data;
          Swal.fire({
            title: 'Informacion?',
            text: "Pedido generado exitosamente",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            this.router.navigate(['/comercio/detallepedido/'+idPedido]);  
          });
        }else{
          this.toastrService.error(dat.error, 'Alerta!');
        }
      },
      (dataErrror)=>{
        this.toastrService.error(dataErrror.error, 'Alerta!');
      }
    )
  }
  public getTotal(): Observable<number> {
    return this.carrito.getCantidadTotal();
  }
  ngOnInit() {
    this.cartItems = this.carrito.getTodos();
    this.cartItems.subscribe(products => this.checkOutItems = products);
    this.carrito.getCantidadTotal().subscribe(amount => this.amount = amount);
    this.listarDepartamentos();
    this.listarTipoPago();
  }
  async listarDepartamentos() {
    try {
      this.departamentos.push(new ElementoLista('', 'Seleccione un departamento'))
      this.conectorApi.Get('departamentos/listar').subscribe(
        async (data) => {
          let dat = data as ApiRest;
          // //console.log("Todos los departamentos", dat.data);
          await dat.data.forEach(departamento => {
            this.departamentos.push(new ElementoLista(departamento.id, departamento.descripcion))
          });
        },
        (dataError) => {
          this.toastrService.error(dataError.error, 'Alerta!');
        }
      )
    } catch (ex) {
      this.toastrService.error(ex, 'Alerta!');
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
            this.toastrService.error(dataError.error, 'Alerta!');
          }
        )
      }
    } catch (ex) {
      this.toastrService.error(ex, 'Alerta!');
    }

  }
  async listarTipoPago() {
    try {
      this.tiposPago=[];
      this.conectorApi.Get('tipopago/listar').subscribe(
        (data) => {
          let dat = data as ApiRest;
          if(dat.codigo==0){
            this.tiposPago=dat.data;
            if(this.tiposPago.length==1){
              this.tipoPagoSeleccionado=1;
            }
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



}
