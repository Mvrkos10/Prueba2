import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, AuthResponse } from '../modelos/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_AUTH = 'https://dummyjson.com/auth/login';
  private cargando: boolean = false;
  private datosUsuario!: AuthResponse | null | Observable<null>;
  private token: string | undefined = '';
  private usuarioCargado: boolean = false;


  constructor(private http: HttpClient,
    private router: Router,
    private alert: AlertController) { }

    public auth({ username, password}: Auth){
      this.cargando = true;
      this.http.post<AuthResponse>(this.URL_AUTH,{
        username,
        password
      },{
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
        catchError(async(error: HttpErrorResponse) => {
          this.cargando = false;
          if(error.status === 400){
            const alerta = await this.alert.create({
              header: 'Usuario y contraseña incorrectos',
              buttons: [{
                text: 'OK',
                role: 'confirm'
              }]
            });
            await alerta.present();
          };
          return null;
        })
      ).subscribe(async (datos) => {
        this.datosUsuario = datos;
        this.token = this.datosUsuario?.token;
        if(datos){
          const alerta = await this.alert.create({
            header: 'Autenticado',
            buttons: [{
              text: 'OK!',
              role: 'confirm'
            }]
          });
          await alerta.present();
          this.usuarioCargado = true;
          this.router.navigate(['/perfil'],{
            queryParams: {
              username: this.datosUsuario?.username,
              email: this.datosUsuario?.email,
              firstName: this.datosUsuario?.firstName,
              lastName: this.datosUsuario?.lastName,
              gender: this.datosUsuario?.gender,
              image: this.datosUsuario?.image
            }
          });
        }
      });
    }

    public obtenerDatosUsuario(){
      return this.datosUsuario;
    }

    public obtenerCargando(){
      return this.cargando;
    }

    public obtenerEstadoUsuario(){
      return this.usuarioCargado;
    }

    public obtenerToken(){
      return this.token;
    }

}
