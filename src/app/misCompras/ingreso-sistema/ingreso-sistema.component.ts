import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-sistema',
  templateUrl: './ingreso-sistema.component.html',
  styleUrls: ['./ingreso-sistema.component.scss']
})
export class IngresoSistemaComponent implements OnInit {
  public validationForm: FormGroup;
  constructor(private fb: FormBuilder, private conectorApi: ConectorApi, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.validationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordarme: [''],
    })
  }


  ingresar(proveedor) {
    this.conectorApi.login(proveedor);
  }

  salir(proveedor) {
    this.conectorApi.logout();
  }
  login(form: any) {
    if (!form.valid) {
      return false;
    }
    this.conectorApi.iniciosession(form.value,form.value.recordarme);
  }
}
