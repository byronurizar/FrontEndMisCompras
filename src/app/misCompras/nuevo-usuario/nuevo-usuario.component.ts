import { Component, OnInit } from '@angular/core';
import { ApiRest } from 'src/app/modelos/apiResponse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConectorApi } from 'src/app/servicios/conectorApi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  public validationForm: FormGroup;
  constructor(private fb: FormBuilder, private conectorApi: ConectorApi, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.validationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  ingresar(proveedor) {
    this.conectorApi.login(proveedor);
  }
  registrarse(form: any) {
    if (!form.valid) {
      return false;
    }

    this.conectorApi.Post("usuario/registronuevo", form.value).subscribe(
      (data) => {
        let dat = data as ApiRest;
        if (dat.codigo == 0) {
            localStorage.setItem("token", dat.data.token);
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
}
