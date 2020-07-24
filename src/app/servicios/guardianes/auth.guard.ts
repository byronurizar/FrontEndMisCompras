import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ConectorApi } from "../conectorApi.service";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private conectorApi: ConectorApi) { }

    canActivate() {
        let codigoRol = this.conectorApi.usuario.codigoRol;
        console.log("Guardian",codigoRol);
        if (codigoRol === 1) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}