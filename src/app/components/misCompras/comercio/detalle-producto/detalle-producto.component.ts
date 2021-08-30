import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentDetail } from 'src/app/shared/model/e-commerce/content';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Producto } from 'src/app/modelos/producto.model';
import { Carrito } from 'src/app/servicios/carrito.service';
import { environment } from 'src/environments/environment';
import { async } from '@angular/core/testing';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  @ViewChild("modalInformacion",{static:true}) modal: ElementRef;
  public imagenesProducto: any[] = [];
  public producto: any = {};
  public tallasDisponibles: any;
  public coloresDisponibles: any;
  public dataProducto: any = {};
  tallaSeleccionada = 0;
  colorSeleccionado = 0;
  public productosRelacionados: Producto[] = [];
  public detailCnt = [];
  public slidesPerPage = 4;
  public syncedSecondary = true;
  public allContent = [];
  public contents = [];
  public active: boolean = false;
  public type: string = "0"
  public nav: any;
  public infoAdicional:any=[];
  public InfoAdicionalActiva=[];


  public tabBeneficios:boolean=false;
  public tabInstruccionesUso:boolean=false;
  public tabAdvertencia:boolean=false;
  public tabConsultas:boolean=false;
public codigoProducto=0;
  colorValido = true;
  tallaValido = true;

  sliderOption = {
    rtl: true,
    items: 1,
    slideSpeed: 2000,
    nav: false,
    autoplay: false,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200
  }

  sliderNavOptions = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slick',
    arrows: false,
    dots: false,
    focusOnSelect: true
  }

  public urlImagenes = environment.urlImagnes;

  constructor(private conectorApi: ConectorApi, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, config: NgbRatingConfig, private cartService: Carrito,public productoService:ProductosService, private modalService: NgbModal) {
    this.allContent = ContentDetail.ContentDetails;

    //for rating 
    this.allContent.filter(opt => {
      if (this.type == opt.type) {
        this.contents.push(opt);
      }
    });

    config.max = 5;
    config.readonly = false;

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.infoProducto(id);
      this.listarProductosCruzados(id);
      this.listarTallasDisponibles(id);
      this.listarColoresDisponibles(id);
      this.codigoProducto=id;
      this.listarInformacionAdicional(id);
    });


  }
  ngOnInit() {
    this.abrirModal(this.modal);
  }

  abrirModal(modal){
    let seAlerto=sessionStorage.getItem("notificacion") ||false;
    if(!seAlerto){
      this.modalService.open(modal,{ size: 'lg'});
      sessionStorage.setItem("notificacion",'true');
    }
}

  infoProducto(idProducto) {
    try {
      if (idProducto) {
        this.conectorApi.Get(`productos/comercio/infoproducto/${idProducto}`).subscribe(
          (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.dataProducto = dat.data;
              this.producto = this.dataProducto[0];
              //console.log("Producto", this.producto);
              this.listarImagenes(idProducto);
            } else {
              this.toastrService.error(dat.error, 'Alerta!');
            }
          },
          (dataError) => {
            this.toastrService.error(dataError.message, 'Alerta!');
          }
        );
      }
    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }

  listarImagenes(idProducto) {
    try {
      if (idProducto) {
        this.conectorApi.Get(`productos/imagenes/listar/${idProducto}`).subscribe(
          (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.imagenesProducto = dat.data;
              //console.log("DAta",this.imagenesProducto);
            } else {
              this.toastrService.error(dat.error, 'Alerta!');
            }
          },
          (dataError) => {
            this.toastrService.error(dataError.message, 'Alerta!');
          }
        );
      }
    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }
  async listarTallasDisponibles(idProducto) {
    try {
      this.conectorApi.Get(`productos/asigtalla/listar/${idProducto}`).subscribe(
        async (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.tallasDisponibles = await apiResult.data;
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.message, 'Alerta!');
        }
      )

    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }

  async listarColoresDisponibles(idProducto) {
    try {
      this.conectorApi.Get(`productos/asigcolor/listar/${idProducto}`).subscribe(
        async (data) => {
          let apiResult = data as ApiRest;
          if (apiResult.codigo == 0) {
            this.coloresDisponibles = await apiResult.data;
          } else {
            this.toastrService.success(apiResult.respuesta, 'Alerta!');
          }
        },
        (dataError) => {
          this.toastrService.error(dataError.message, 'Alerta!');
        }
      )

    } catch (error) {
      this.toastrService.error(error.message, 'Alerta!');
    }
  }

  async listarProductosCruzados(idProducto) {
    this.conectorApi.Get(`productoscruzados/listar/producto/${idProducto}`).subscribe(
      async (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
          this.productosRelacionados = await dat.data;
          //console.log("Productos", this.productosRelacionados);
        }

      },
      (dataError) => {
        //console.log("Data Error", dataError);
      }
    )
  }

  getOption(type) {
    console.log("infoAdicional",this.infoAdicional);
    this.InfoAdicionalActiva = [];
    return this.infoAdicional.filter(data => {
      if (type == data.idTipoInfoAdicional) {
        this.active = true;
        let itemDividir=data.valor.split('- ');
        let dividirPreguntas=data.valor.split('P: ');
        itemDividir.map(valor=>{
          this.InfoAdicionalActiva.push("- "+valor);
        });
        if(this.InfoAdicionalActiva.length>1){
          this.InfoAdicionalActiva.splice(0,1);
        }
        if(dividirPreguntas.length>1){
          this.InfoAdicionalActiva=[];
          dividirPreguntas.map(valor=>{
            this.InfoAdicionalActiva.push("- P: "+valor);
          });
          this.InfoAdicionalActiva.splice(0,1);
        }
        return this.InfoAdicionalActiva;
      } else {
        return false
      }
    })
  }

  public agregarProducto(producto: any) {
    
    let talla = { idTalla: 0, descripcion: 'N/A' }
    if (this.coloresDisponibles.length > 0) {
      if (this.tallaSeleccionada > 0) {
        let itemTalla = this.tallasDisponibles.find(item => item.id == this.tallaSeleccionada);
        let descTalla = itemTalla.idTalla;
        talla = { idTalla: this.tallaSeleccionada, descripcion: descTalla }
        this.tallaValido = true;
      } else {
        this.tallaValido = false;
        this.toastrService.error("Debe de seleccionar una talla", 'Alerta!');
      }
    }
    let color = { idColor: 0, descripcion: 'N/A' }
    if (this.coloresDisponibles.length > 0) {
      if (this.colorSeleccionado > 0) {
        let itemColor = this.coloresDisponibles.find(item => item.id == this.colorSeleccionado);
        let descColor = itemColor.idColor;
        color = { idColor: this.colorSeleccionado, descripcion: descColor }
        this.colorValido = true;
      } else {
        this.colorValido = false;
        this.toastrService.error("Debe de selecciónar un color", 'Alerta!');
      }
    }
    if (this.tallaValido && this.colorValido) {
      if (producto.oferta > 0) {
        producto.precio = producto.oferta;
      }
      this.cartService.agregarProducto(producto, 1, this.coloresDisponibles, color, this.tallasDisponibles, talla);
    }
    
  }
  comprarAhora(producto: any){
    this.agregarProducto(producto);
    console.log("Datos usuario",this.conectorApi.usuario);
    if(this.conectorApi.usuario.email){
      this.router.navigate(['/comercio/finalizarpedido']);
    }else{
      this.toastrService.warning("Para poder continuar con el pedido debe de iniciar sesión",'Alerta!');
    }
  }
  async listarInformacionAdicional(idProducto) {
    this.conectorApi.Get(`productos/infoadicional/${idProducto}`).subscribe(
      async (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
          this.infoAdicional = await dat.data;
          if(this.infoAdicional.length>0){
            this.type=this.infoAdicional[0].idTipoInfoAdicional;
            let itemDividir=this.infoAdicional[0].valor.split('- ');
            let dividirPreguntas=this.infoAdicional[0].valor.split('P: ');
            itemDividir.map(valor=>{
              this.InfoAdicionalActiva.push("- "+valor);
            });
            if(this.InfoAdicionalActiva.length>1){
              this.InfoAdicionalActiva.splice(0,1);
            }
            if(dividirPreguntas.length>1){
              this.InfoAdicionalActiva=[];
              dividirPreguntas.map(valor=>{
                this.InfoAdicionalActiva.push("- P: "+valor);
              });
              this.InfoAdicionalActiva.splice(0,1);
            }
          }
        }

      },
      (dataError) => {
        this.toastrService.warning("No fue posible obtener la información adicional del producto",'Alerta!');
      }
    )
  }
  regresar(){
    this.router.navigate([`/comercio/productos/${this.productoService.catalogo}/${this.productoService.categoria}`]);
  }
}
