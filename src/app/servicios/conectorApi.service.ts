import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ApiRest } from '../modelos/apiResponse.model';
import { Observable } from 'rxjs/Observable';

const urlBase = environment.urlBase;
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4MTcyNDA5OH0.DN5iQAocmqKRXH_UszsypoebpfVFiGmWeuzgM-zT6rI';


// if(sessionStorage.getItem("token")){
//   token=sessionStorage.getItem("token");
//   console.log("Mi token",token);
// }else{
//   token=localStorage.getItem("token");
//}
console.log("Mi token",token);
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })
};

let httpOptionsImagenes = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
};

@Injectable()
export class ConectorApi {
  resultado: Observable<any>;

  constructor(private http: HttpClient) { }


  obtenerToken() {
    var json = '{"email":"prueba3@gmail.com","password":"123456"}';
    var a = this.http.post(urlBase + "usuario/login", json, httpOptions);
    return a;
  }

  Post(ruta, jsonSolicitud) {
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptions);
  }

  Get(ruta): Observable<any> {
    return this.resultado = this.http.get(urlBase + ruta, httpOptions);
  }

 Patch(ruta, jsonSolicitud) {
    return this.http.patch(urlBase + ruta, jsonSolicitud, httpOptions);
  }
  PostImagenes(ruta, jsonSolicitud) {
    return this.http.post(urlBase + ruta, jsonSolicitud, httpOptionsImagenes);
  }

}