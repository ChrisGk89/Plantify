import { Component, OnInit } from '@angular/core';

import {Events, ModalController, NavController, ViewController} from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { Storage } from "@ionic/storage";
import {LoginPage} from "../login/login";
//import { LocalNotifications } from '@ionic-native/local-notifications';
//import { PlacesService } from "../../services/post";
import { Posts } from "../../services/post-service";
import { ShowPage } from "../show/show";

@Component({
    selector: 'page-all-activity',
    templateUrl: 'all-activity.html',
})
export class AllActivityPage implements OnInit {
    addPlacePage = AddPlacePage;
    places: Place[] = [];
    posts: Posts[] = [];
    isLoggedIn: boolean = false;
    isNotLoggedIn: boolean = true;


    constructor(private modalCtrl: ModalController,
                private navCtrl: NavController,
                private postService: Posts,
                private storage: Storage,
                private viewCtrl: ViewController,
                public events: Events,


    ) {
        events.subscribe('reloadPage1',() => {
            //this.navCtrl.setRoot(HomePage);
            window.location.reload();
            //this.updateContent();
            console.log('functional called');
        });

        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isNotLoggedIn = false;
                this.isLoggedIn = true;
            }
        });

    }

    ngOnInit() {
        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isLoggedIn = true;
            }
            if(!this.isLoggedIn){
                this.navCtrl.setRoot(LoginPage);
            }
        });

        this.postService.getposts().then((data) => {
            this.posts = data;
            console.log(data);
        });
    }
    onOpenPost(id: number) {
        this.navCtrl.push(ShowPage, {id:id});
    }

    updateContent(){
        this.postService.getposts().then((data) => {
            this.posts = data;
            console.log(data);
        });
        console.log('no data');
    }


}
