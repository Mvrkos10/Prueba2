import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

formulario!: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private auth: AuthService) { }

  ionViewWillEnter(){
    this.formulario = this.formBuilder.group({
      username: ['kminchelle'],
      password:['0lelplR']
    })
  }

  public enviar(){
    this.auth.auth({
      username: this.formulario.value['username'],
      password: this.formulario.value['password']
    })
  }

}
