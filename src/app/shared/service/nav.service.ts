import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { ToastrService } from 'ngx-toastr';

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  children?: Menu[];
}

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class NavService {
  public screenWidth: any;
  public openToggle: boolean = false;

  public menuBd;
  constructor(public conectorApi: ConectorApi,private toastrService: ToastrService) {
    this.onResize();
    if (this.screenWidth < 1199) {
      this.openToggle = true;
    }
  }

  items2(): Observable<Menu[]> {
    return Observable.create((behaviorSubject: BehaviorSubject<Menu[]>) => {
      try {
        let tokenAcces = sessionStorage.getItem("token") || null;

        this.conectorApi.Get('menu/mimenu').subscribe(
          (data) => {
            let dat = data as ApiRest;
            if (dat.codigo == 0) {
              this.menuBd = dat.data;
              const padres = this.menuBd.filter(item => item.idpadre == 0);
              let miMenuPerfil = new Array();
              padres.map(filaPadre => {
                let itemPadre: Menu;
                let itemsHijos = new Array();
                let idPadre = filaPadre.id;
                let hijosItemActual = this.menuBd.filter(i => i.idpadre === idPadre);

                hijosItemActual.map(itemHijo => {
                  let itemHijoActual: Menu;
                  itemHijoActual = {
                    path: itemHijo.href, title: itemHijo.descripcion, type: 'link'
                  }
                  itemsHijos.push(itemHijoActual);
                });

                itemPadre = {
                  title: filaPadre.descripcion, icon: filaPadre.icono, type: 'sub', active: false, children: itemsHijos
                }
                miMenuPerfil.push(itemPadre);

              });
              behaviorSubject.next(miMenuPerfil);
            } else if (dat.codigo == 2) {
              this.menuBd = dat.data;
              let miMenuPerfil = new Array();
              const titulos = this.menuBd.filter(item => item.id.includes('prov'));
              titulos.map(filaTitulo => {
                let itemTitulo = {
                  headTitle: filaTitulo.descripcion
                }
                miMenuPerfil.push(itemTitulo);
                const padres = this.menuBd.filter(item => item.idpadre == filaTitulo.id);
                if (padres.length > 0) {
                  
                  padres.map(filaPadre => {
                    let itemPadre: Menu;
                    let itemsHijos = new Array();
                    let idPadre = filaPadre.id;
                    let hijosItemActual = this.menuBd.filter(i => i.idpadre === idPadre);

                    if (hijosItemActual.length > 0) {
                      //Validar que tenga hijos si no eliminar
                      hijosItemActual.map(itemHijo => {
                        let itemHijoActual: Menu;
                        itemHijoActual = {
                          path: itemHijo.href, title: itemHijo.descripcion, type: 'link'
                        }
                        itemsHijos.push(itemHijoActual);
                      });

                      itemPadre = {
                        title: filaPadre.descripcion, icon: filaPadre.icono, type: 'sub', active: false, children: itemsHijos
                      }
                      miMenuPerfil.push(itemPadre);
                    }
                  });
                }
              });
              behaviorSubject.next(miMenuPerfil);
            }
          },
          (dataError) => {
            this.toastrService.error('Ocurrió un error al cargar el menu por favor intenta nuevamente', 'Alerta!');
          }
        )

      } catch (ex) {
        this.toastrService.error('Ocurrió un error al cargar el menu por favor intenta nuevamente', 'Alerta!');
      }

    });
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
}
