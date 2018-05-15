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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];
  posts: Posts[] = [];
  isLoggedIn: boolean = false;
    isNotLoggedIn: boolean = true;
    total_progress: number;
    branch = [];
    leaf : number;
    tree_height = '';
    Arr = Array;
    isNotSubmittedToday: boolean = true;
    advices = '';
    username = '';
    totalscore = 1;

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
      this.storage.get('username').then((val) => {
          if(val!="" && val!= null){
              this.username = val;
              this.postService.getScore(this.username).then((data) => {
                  if (typeof data !== 'undefined' && data.length > 0) {
                      this.totalscore = data[0]['total'];
                      this.leaf = Math.floor( data[0]['count']);
                  }
                  else{
                      this.leaf = 0;
                  }
                  this.total_progress =  this.totalscore;

                  this.branch = Array(this.leaf).fill(1).map((x,i)=>i);
                  this.tree_height = this.total_progress.toString()+'vh';

              });
          }
      });



      this.storage.get('psactivity').then((val) => {
          if(val!="" && val!= null){

              let todayDate = new Date().getDate();
              let todayMonth = new Date().getMonth();

              if(val.day == todayDate && val.month == todayMonth){
                  this.isNotSubmittedToday = false;
                  let advNumber = 'a'+ Math.floor(Math.random() * Math.floor(1));
                  this.advices = this.AppreciateExercise(advNumber);
              }
              else {
                  this.isNotSubmittedToday = true;
                  let advNumber = 'a'+ Math.floor(Math.random() * Math.floor(7));
                  this.advices = this.forceExercise(advNumber);
                  console.log(this.advices);


              }

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

    forceExercise(number){
        let state_of_tree = {
            a0: 'Plants need both water and nutrients (food) to survive. Your Tree is facing water deficiency. Do some exercise or take a carbon foot print challenges for watering your Tree. ',
            a1: 'Dirty air caused by smoke, gases, and other pollutants can be harmful to plants. A typical passenger vehicle emits about 4.6 metric tons of carbon dioxide per year. Try to avoid Private Car.',
            a2: 'The most important nutrients for plants growing needs are nitrogen (N), phosphorus (P), and potassium (K). In order to give nutrients to your tree, you can take a carbon footprint challenges.',
            a3: 'Healthy soil is extremely vital to plants. You can add some Organic Soil Fertilizers to your garden by taking a carbon footprint challenges',
            a4:'Too little or too much water or nutrients can also be harmful. So, do not exercise to little or too much in a day.',
            a5: 'Trees absorb carbon dioxide as they grow and the carbon that they store in their wood helps slow the rate of global warming. Be active to take carbon footprint challenges for growing your tree. ',
            a6: 'Your Tree needs sunlight. Go for a morning walk and help your tree to absorb some sunlight'

        };
        return (state_of_tree[number]);
    }

    AppreciateExercise(number){
        let state_of_tree = {
            a0: 'Your Tree looks good. You can take a carbon foot print challenges to save the environment'
        };
        return (state_of_tree[number]);
    }

    getLeafNumber(number){
      return  Math.floor( number);
    }

}
