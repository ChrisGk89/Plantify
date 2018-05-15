import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {LogoutPage} from "../pages/logout/logout";
//import {CategoryPage} from "../pages/category/category";
import {ContactPage} from "../pages/contact/contact";
import {ChallengePage} from "../pages/challenge/challenge";
import {AllActivityPage} from "../pages/all-activity/all-activity";
import {StatsPage} from "../pages/stats/stats";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Challenge', component: ChallengePage },
            { title: 'All Activities', component: AllActivityPage },
            { title: 'Stats', component: StatsPage },
            { title: 'Login', component: LoginPage },
            { title: 'Logout', component: LogoutPage },
            { title: 'Contact Us', component: ContactPage },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
