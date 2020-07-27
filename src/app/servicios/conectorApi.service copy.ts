import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ApiRest } from '../modelos/apiResponse.model';
import { Observable } from 'rxjs/Observable';


import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
            sessionStorage.setItem("token", tokenGmail);
            this.router.navigate(['/dashboard/principal']);
          } else {
            this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          //console.log("Error", error);
          this.toastrService.error("No fue posible ingresar por favor intente nuevamente", "Alerta!");
        });

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

  Post(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenAcces}`
      })
    };
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptions);

  }

  Get(ruta): Observable<any> {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenAcces}`
      })
    };
    return this.resultado = this.http.get(urlBase + ruta, httpOptions);
  }

  Patch(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenAcces}`
      })
    };
    return this.http.patch(urlBase + ruta, jsonSolicitud, httpOptions);
  }
  PostImagenes(ruta, jsonSolicitud) {
    let tokenAcces = sessionStorage.getItem("token") || null;
    let httpOptionsImagenes = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAcces}`
      })
    };
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptionsImagenes);
  }

}