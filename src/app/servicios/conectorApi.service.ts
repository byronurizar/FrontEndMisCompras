import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ApiRest } from '../modelos/apiResponse.model';
import { Observable } from 'rxjs/Observable';


import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
const urlBase = environment.urlBase;


@Injectable()
export class ConectorApi {
  resultado: Observable<any>;
  public usuario: any = {};
  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private router: Router, private toastrService: ToastrService) {

    this.afAuth.authState.subscribe(user => {

      if (!user) {
        return;
      }

      this.usuario.name = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.email = user.email;
      this.usuario.urlfoto = user.photoURL;
      this.usuario.proveedor = "Google";

      this.Post('usuario/registronuevo', this.usuario).subscribe(
        (dataResponse) => {

          if (dataResponse["codigo"] === 0) {
            let tokenGmail = dataResponse["data"].token.token;
            // let codigoRol = dataResponse["data"].usuario.codigoRol;
            this.usuario.token = tokenGmail;
            // this.usuario.codigoRol = codigoRol;
            sessionStorage.setItem("token", tokenGmail);
            if (!this.usuario.codigoRol) {
              this.router.navigate(['/'])
            } else {
              this.router.navigate(['/producto'])
            }
          } else {
            this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
        });

    });
  }

  iniciosession(info, recordarme) {
    this.Post("usuario/login", info).subscribe(
      (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {

          this.usuario.name = dat.data.usuario.name;
          this.usuario.uid = "";
          this.usuario.email = dat.data.usuario.email;
          this.usuario.urlfoto = "";
          this.usuario.token = dat.data.token.token;;
          this.usuario.proveedor = "";
          this.usuario.codigoRol = dat.data.usuario.idRol;
         
          if (recordarme) {
            sessionStorage.setItem("token", this.usuario.token);
            localStorage.setItem("token", this.usuario.token);
          } else {
            sessionStorage.setItem("token", this.usuario.token);
          }
          if (!this.usuario.codigoRol) {
            this.router.navigate(['/'])
          } else {
            this.router.navigate(['/producto'])
          }
        } else {
          this.toastrService.error(dat.respuesta, "Alerta!")
        }
      },
      (dataError) => {
        //console.log({ dataError });
        this.toastrService.error(dataError.error.respuesta, 'Alerta!');
      }
    )
  }
  registronuevo(info){
    this.Post('usuario/registronuevo',info).subscribe(
      (dataResponse) => {

        if (dataResponse["codigo"] === 0) {
          console.log("Registro nuevo",dataResponse);
          let tokenGmail = dataResponse["data"].token.token;
          // let codigoRol = dataResponse["data"].usuario.codigoRol;
          this.usuario.token = tokenGmail;
          // this.usuario.codigoRol = codigoRol;
          this.usuario.name = dataResponse["data"].usuario.nombre;
          this.usuario.email =  dataResponse["data"].usuario.correo;
          sessionStorage.setItem("token", tokenGmail);
          if (!this.usuario.codigoRol) {
            this.router.navigate(['/'])
          } else {
            this.router.navigate(['/producto'])
          }
        } else {
          this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
      });
  }
  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  Post2(ruta, jsonSolicitud): Observable<any> {
    return Observable.create((behaviorSubject: BehaviorSubject<any>) => {
      try {
        let tokenAcces = sessionStorage.getItem("token") || null;
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAcces}`
          })
        };
        let request = this.http.post(urlBase + ruta, jsonSolicitud, httpOptions);
        request.subscribe((data) => {
          //console.log("Data", JSON.parse(atob(data["objBase64"].toString())));
          const nuevaDAta = JSON.parse(atob(data["objBase64"].toString()));
          //console.log({ nuevaDAta });
          behaviorSubject.next(nuevaDAta);
        })

      } catch (ex) {
        //console.log("ex", ex);
      }

    });
  }

  Post(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.usuario.token}`
      })
    };
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptions);

  }

  Get(ruta): Observable<any> {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.usuario.token}`
      })
    };
    return this.resultado = this.http.get(urlBase + ruta, httpOptions);
  }

  Patch(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.usuario.token}`
      })
    };
    return this.http.patch(urlBase + ruta, jsonSolicitud, httpOptions);
  }
  PostImagenes(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptionsImagenes = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.usuario.token}`
      })
    };
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptionsImagenes);
  }

}