
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {
    ModalController, LoadingController, ToastController, ViewController, NavController,
    Events
} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { PlacesService } from "../../services/places";
import { Posts } from "../../services/post-service";
import { Storage } from "@ionic/storage";
//import {HomePage} from "../home/home";
//import {normalizeURL} from 'ionic-angular';

declare var cordova: any;

@Component({
    selector: 'page-pasubmission',
    templateUrl: 'pasubmission.html'
})
export class PasubmissionPage {

    imageUrl = '';
    baseImagePath = '';
    imageName = '';
    post: Posts[] = [];
    isLoggedIn: boolean = false;

    username = '';


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
                public events: Events
    ) {

        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isLoggedIn = true;
            }
        });
        this.storage.get('username').then((val) => {
            if(val!="" && val!= null){
                this.username = val;
                //console.log('username= '+ this.username);
            }
        });

    }


    onSubmit(form: NgForm) {
        let newData = {
            activitytype: form.value.activityTypeGroup,
            distance: form.value.distance,
            duration: form.value.time,
            username:this.username,
            day: new Date().getDate(),
            month: new Date().getMonth()

        };

        let newScore = {
            category: '0',
            author: this.username,
            score: form.value.distance

        };


        this.postService
            .addPost(newScore);
        this.storage.set('psactivity', newData);
       this.postService
            .addPA(newData);

        form.reset();
        this.navCtrl.pop();


        const toast = this.toastCtrl.create({
            message: 'Your Physical activity data added!',
            duration: 1000
        });
        toast.present();

    }
    goToHomePage()
    {
        this.events.publish('reloadPage1');
        //this.navCtrl.pop();
        //this.navCtrl.setRoot(HomePage);
    }




    dismiss() {
        this.viewCtrl.dismiss();

    }
}
