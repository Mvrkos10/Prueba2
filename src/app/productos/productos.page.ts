import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Productos } from '../modelos/producto';
import { ProductoService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage  {
  private token : string | undefined = '';
  public datosProductos! : Productos;
  constructor(
    private producto : ProductoService,
    private auth : AuthService,
  ) { }
  ionViewWillEnter(){
    this.token = this.auth.obtenerToken();
    this.producto.obtenerProductos(this.token);
  }
  ionViewDidEnter(){
    this.datosProductos = this.producto.obtenerDatosProductos()
  }

}
