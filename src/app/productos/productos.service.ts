import { Injectable } from '@angular/core';
import { Productos } from './../modelos/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http : HttpClient,
  ){}
  private URL_PRODUCTO = 'https://dummyjson.com/auth/products';
  private datosProductos! : Productos;

  public obtenerProductos( token : string | undefined){
    this.http.get(this.URL_PRODUCTO,{
      headers:{
        'content-type': 'application/json',
        'authorization': 'Bearer ' + token
      }
    }).subscribe(datos=>{
      this.datosProductos = datos as Productos;
    })
    }

  public obtenerDatosProductos(){
    return this.datosProductos;
  }
  }
