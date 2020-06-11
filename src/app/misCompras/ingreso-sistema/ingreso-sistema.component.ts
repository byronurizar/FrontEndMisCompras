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
    this.validarToken();
    this.validationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recordarme: [''],
    })

  }
  login(form: any) {
    if (!form.valid) {
      return false;
    }

    this.conectorApi.Post("usuario/login", form.value).subscribe(
      (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
          if (form.value.recordarme) {
            localStorage.setItem("token", dat.data.token);
          } else {
            sessionStorage.setItem("token", dat.data.token);
          }
          this.router.navigate(['/dashboard/principal'])
        } else {
          this.toastrService.error(dat.error, "Alerta!")
        }
      },
      (dataError) => {
        let dat = dataError.error as ApiRest;
        this.toastrService.error(dat.error, "Alerta!")
      }
    )
  }

  validarToken() {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/dashboard/principal'])
    }

  }
}
