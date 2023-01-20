import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{

  public username: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public gender: string = '';
  public image: string = '';



  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }


    ionViewWillEnter() {
      this.route.queryParams.subscribe(parametros => {
        this.username = parametros['username'] || '';
        this.email = parametros['email'] || '';
        this.firstName = parametros['firstName'] || '';
        this.lastName = parametros['lastName'] || '';
        this.gender = parametros['gender'] || '';
        this.image = parametros['image'] || '';

      })
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Sesión Cerrada Correctamente',
        buttons: ['OK!'],
      });

      await alert.present();
    }

}
