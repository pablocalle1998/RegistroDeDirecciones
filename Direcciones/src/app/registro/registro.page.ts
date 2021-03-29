import { Component, OnInit } from '@angular/core';
import { Direccion } from '../models/direccion';
import { DireccionesService } from '../services/direcciones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  title = 'Registro';
  lat = -2.383980;
  long = -77.503930;
  zoom=7;
  direccion: Direccion = new Direccion();
  direcciones: Direccion[];
  dire: any;
  selectedFile: any;

  currentLocation: any = {
    latitude: null,
    longitude: null,
    street: "",
    active: true
  };

  centerLocation: any = {
    latitude: null,
    longitude: null,
    address: "",
  };

  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
    shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
    center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
    pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png"
  };

  constructor(
    private direccionService: DireccionesService
  ) { }

  ngOnInit() {
    this.listarLugares();
  }

  newSitio(event){
    if (event) {
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.direccionService.getAddressOfLocation(this.centerLocation);
      this.direccion.longitud = event.lng;
      this.direccion.latitud = event.lat;
      this.direccion.direccion = this.centerLocation.address;

    } 
  }

  async registrarLugar(){
    this.direccionService.guardarLugar(this.direccion);
    console.log("uid recien creado: ", this.direccion.uid)

    const imageURL = await this.direccionService.uploadFile(this.direccion.uid, this.selectedFile)
    this.direccionService.updateData(imageURL, this.direccion.uid);

    this.direccion = new Direccion();
    alert("Lugar registrado");
  }

  listarLugares(){
    this.direccionService.getDirecciones()
    .subscribe(data => {
      this.direcciones = data;
    })
  }

  chooseFile(event){
    this.selectedFile = event.target.files;
  }
}
