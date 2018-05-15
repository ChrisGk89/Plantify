import { Component, OnInit } from '@angular/core';

import {Events, ModalController, NavController, ViewController} from 'ionic-angular';

import { Storage } from "@ionic/storage";
import {LoginPage} from "../login/login";

import { StatsPage } from '../stats/stats';
import { ChallengePage } from '../challenge/challenge';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
    isLoggedIn: boolean = false;
    isNotLoggedIn: boolean = true;
    tab1Root = HomePage;
    tab2Root = ChallengePage;
    tab3Root = StatsPage;

    constructor(private modalCtrl: ModalController,
                private navCtrl: NavController,
                private storage: Storage,
                private viewCtrl: ViewController,
                public events: Events,) {

        this.storage.get('token').then((val) => {
            if (val != "" && val != null) {
                this.isNotLoggedIn = false;
                this.isLoggedIn = true;
            }
        });


    }

    ngOnInit() {
        this.storage.get('token').then((val) => {
            if (val != "" && val != null) {
                this.isLoggedIn = true;
            }
            if (!this.isLoggedIn) {
                this.navCtrl.setRoot(LoginPage);
            }
        });
    }
}