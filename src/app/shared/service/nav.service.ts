import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ApiRest } from 'src/app/modelos/apiResponse.model';

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
  constructor(public conectorApi: ConectorApi) {
    this.onResize();
    if (this.screenWidth < 1199) {
      this.openToggle = true;
    }
  }

  async listarMenuBd() {
    try {
      this.conectorApi.Get('menu/mimenu').subscribe(
        async (data) => {
          let dat = data as ApiRest;
          if (dat.codigo == 0) {
            this.menuBd = await dat.data;
            console.log("Mi menu desde bd", this.menuBd);
          }

        },
        (dataError) => {
          console.log("Error", dataError);
        }
      )
    } catch (ex) {
      console.log("ex", ex);
    }
  }

  items2(): Observable<Menu[]> {
    return Observable.create((behaviorSubject: BehaviorSubject<Menu[]>) => {
      try {
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
              console.log({ MenuPerfil: miMenuPerfil });
              behaviorSubject.next(miMenuPerfil);
            }

          },
          (dataError) => {
            console.log("Error", dataError);
          }
        )
      } catch (ex) {
        console.log("ex", ex);
      }

    });
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
}
