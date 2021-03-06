import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {
    ModalController, NavParams, LoadingController, ToastController, ViewController, NavController,
    Events
} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { PlacesService } from "../../services/places";
import { Posts } from "../../services/post-service";
import { Storage } from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
//import {HomePage} from "../home/home";
//import {normalizeURL} from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';
  baseImagePath = '';
  imageName = '';
  post: Posts[] = [];
  isLoggedIn: boolean = false;
  categoris:any;
    catId: number = null;
    catName = '';
    advices = '';
    advName = '';
    username = '';
    score = 0;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private storage: Storage,
              private postService: Posts,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              public events: Events,
              private navParams: NavParams
              ) {

      this.storage.get('token').then((val) => {
          if(val!="" && val!= null){
              this.isLoggedIn = true;
          }
      });
      this.postService.getCategories().then((data) => {
          this.categoris = data;
          console.log(data);
      });

      this.storage.get('username').then((val) => {
          if(val!="" && val!= null){
              this.username = val;
              //console.log('username= '+ this.username);
          }
      });

      this.catId = this.navParams.get('catId');
      this.catName = this.navParams.get('catName');

      if(this.catId == 1){
          this.advName = 'recycleadv';
          this.score =10;
      }
      if(this.catId == 2){
          this.advName = 'bicyclingadv';
          this.score =20;
      }
      if(this.catId == 3){
          this.advName = 'tpadv';
          this.score =40;
      }
      if(this.catId == 4){
          this.advName = 'ptadv';
          this.score =10;
      }
      if(this.catId == 5){
          this.advName = 'oaadv';
          this.score =10;
      }

          this.storage.get(this.advName).then((val) => {

              if(val!="" && val!= null){
                  let advNumber = 'a'+ Math.floor(Math.random() * Math.floor(7));
                  this.advices = val[advNumber];
                  console.log(val);
              }
          });

  }

  onSubmit(form: NgForm) {
    let newPost = {
      title: form.value.title,
      body: form.value.body,
      category: this.catId,
      author: this.username,
        score: this.score
    };
    console.log('post data: '+newPost);

      this.postService
          .addPost(newPost);

    this.postService
      .uploadImage(this.imageUrl, newPost).then(res => {
        this.viewCtrl.dismiss({reload: true});
        this.goToHomePage();
    }, err => {
        this.dismiss();
    });

    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;

    const toast = this.toastCtrl.create({
            message: 'We have received your images regarding your'+ this.catName + '. Your score will be updated shortly. ',
            duration: 3500
          });
          toast.present();
          //this.navCtrl.popToRoot();
      this.navCtrl.setRoot(TabsPage);

  }
goToHomePage()
{
    this.events.publish('reloadPage1');
    //this.navCtrl.pop();
    //this.navCtrl.setRoot(HomePage);
}
  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {
    this.camera.getPicture({
        quality: 30,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: false,
        correctOrientation: true
    })
      .then(
        imageData => {

          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.png';
          this.baseImagePath = path + currentName;
          this.imageName = newFileName;

         /* console.log(imageData);
            this.postService.uploadImage(imageData, 'image').then(res => {
                //var str = JSON.stringify(res.response, null, 2);
                let imageFile = JSON.parse(res.response);
                this.imageName = imageFile.image;
                console.log(this.imageName);
                console.log(res.response);
            }, err => {
                var str = JSON.stringify(err, null, 2);
                console.log('err'+ str);
            });
*/
        /*  this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                .then(
              (data: Entry) => {
                //this.imageUrl = normalizeURL(data.nativeURL);

                  this.imageUrl = data.nativeURL;
                  console.log('data:'+ data);
                this.camera.cleanup();
                // File.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'Could not save the image. Please try again',
                  duration: 2500
                });
                toast.present();
                this.camera.cleanup();
              }
            );*/
          //this.imageUrl = normalizeURL(this.imageUrl);
            this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
            console.log(err);
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      );
  }

    dismiss() {
        this.viewCtrl.dismiss();

    }
}
