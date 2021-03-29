import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../models/direccion';
import { DireccionesService } from '../services/direcciones.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  styleUrls: ['./lugares.page.scss'],
})
export class LugaresPage implements OnInit {
  
  direcciones: Direccion[];
  nombre: string = "";
  direccion: any;
  dire: any;
  constructor(
    public direccionService: DireccionesService
  ) { }

  ngOnInit() {
    this.listarLugares();
  }

  async buscarLugar(){
    console.log("nombre busqueda ", this.nombre);
    const doc: any = await this.direccionService.consultarLugarTuristico(this.nombre);
    this.dire = JSON.stringify(doc);
    console.log("lugar obtenido: ", this.dire);
  }

  listarLugares(){
    this.direccionService.getDirecciones()
    .subscribe(data=>{
      this.direcciones = data;
    })
  }

  buscar(){
    this.direccionService.consultarLugar(this.nombre)
    .subscribe(data =>{
      this.direccion = Object.keys(data).map(function(key, index){
        return data[key]
      });
    });
    console.log("lugar ", this.direccion);
    this.nombre = "";
  }




}
