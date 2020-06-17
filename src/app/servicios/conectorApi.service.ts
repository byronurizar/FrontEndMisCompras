import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ApiRest } from '../modelos/apiResponse.model';
import { Observable } from 'rxjs/Observable';


import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
const urlBase = environment.urlBase;


@Injectable()
export class ConectorApi {
  resultado: Observable<any>;
  public usuario: any = {};
  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);

      if (!user) {
        return;
      }

      this.usuario.name = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.email = user.email;
      this.usuario.urlfoto = user.photoURL;
      this.usuario.proveedor = "Google";

      this.Post('usuario/registronuevo', this.usuario).subscribe(
        (data) => {
          console.log("data", data);
        },
        (error) => {
          console.log("Error", error);
        });

    });
  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
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