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
import {PasubmissionPage} from "../pasubmission/pasubmission";
import {ChallengesPage} from "../challenges/challenges";

@Component({
    selector: 'page-challenge',
    templateUrl: 'challenge.html',
})
export class ChallengePage implements OnInit {
    addPlacePage = AddPlacePage;
    places: Place[] = [];
    posts: Posts[] = [];
    isLoggedIn: boolean = false;
    isNotLoggedIn: boolean = true;
    isNotSubmittedToday: boolean = true;
    advices = '';


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

        this.storage.get('psactivity').then((val) => {
            if(val!="" && val!= null){
                let todayDate = new Date().getDate();
                let todayMonth = new Date().getMonth();

                if(val.day == todayDate && val.month == todayMonth){
                   this.isNotSubmittedToday = false;
                }
                else {
                    this.isNotSubmittedToday = true;
                }
            }
        });

        this.storage.get('recycleadv').then((val) => {

            if(val!="" && val!= null){
                let advNumber = 'a'+ Math.floor(Math.random() * Math.floor(7));
                this.advices = val[advNumber];
                console.log(val);
            }
        });

    }

    onGoToSubmit(){
     this.navCtrl.push(PasubmissionPage);
    }

    onGoToChallenge(){
        this.navCtrl.push(ChallengesPage);
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

