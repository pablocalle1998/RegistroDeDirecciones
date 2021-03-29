import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Direccion } from '../models/direccion';
import { first, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  async getCurrentLocation(withAddress: boolean = true): Promise<any> {
    let location: any = {};

    return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      var options = {
        frequency: 1000,
        timeout: 15000,
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          location.latitude = position.coords.latitude;
          location.longitude = position.coords.longitude;
          if (withAddress) {
            let geocoder = new google.maps.Geocoder();
            let latlng = { lat: location.latitude, lng: location.longitude };
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (results != null && results != undefined) {
                location.address = results[0].formatted_address;
              } //end if
              resolve(location);
            });
          } else {
            resolve(location);
          } //end if
        },
        error => {
          resolve(null);
        },
        options
      );
    } //end if
  });
  } 

  async getAddressOfLocation(location: any) {
    let geocoder = new google.maps.Geocoder();
    let latlng = { lat: location.latitude, lng: location.longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (results != null) {
        location.address = results[0].formatted_address;
        return location.address;
      } 
    });
  } 

  getDirecciones(): Observable<any[]>{
    const datos = this.afs.collection("lugares").valueChanges();
    return datos;
  }

  guardarLugar(direccion: Direccion){
    const refDir = this.afs.collection("lugares");
    if(direccion.uid == null ){
      direccion.uid = this.afs.createId();
    }
    refDir.doc(direccion.uid).set(Object.assign({}, direccion), {merge: true});
  }

  consultarLugarTuristico(nombre: string){
    //`${nombre}`
    return this.afs.collection("lugares", ref => ref.where("nombre", "==", nombre.toString()))
    .valueChanges()
    .pipe(first())
    .toPromise();
  }

  consultarLugar(nombre: string){
    //`${nombre}`
    return this.afs.collection("lugares", ref => ref.where("nombre", "==", nombre.toString()))
    .valueChanges();
  }

  async uploadFile(id, file): Promise<any>{
    if(file && file.length){
      try{
        const task = await this.storage.ref('images').child(id).put(file[0]);
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      }catch(err){
        console.error(err);
      }
    }
  }

  updateData(url: string, uid: string){
    var db = firebase.default.firestore();
    db.collection("lugares").doc(uid).update({url: `${url}`});
  }
}
