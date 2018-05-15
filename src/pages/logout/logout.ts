import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import {NavController, App, LoadingController, ToastController, AlertController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Storage } from "@ionic/storage";

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html'
})
export class LogoutPage {

    loading: any;
    isLoggedIn: boolean = false;

    constructor(private storage: Storage, public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController,private alertCtrl: AlertController,private toastCtrl: ToastController) {
        this.storage.remove('token');
        this.storage.remove('username');
        this.isLoggedIn = false;
        this.navCtrl.setRoot(LoginPage);

        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isLoggedIn = true;
            }
        });
    }

    logout() {
        this.storage.remove('token');
        this.storage.remove('username');
        //this.storage.remove('psactivity');
        this.isLoggedIn = false;
        console.log(this.storage.get('token'));
      this.authService.logout().then((result) => {
            this.loading.dismiss();
            let nav = this.app.getRootNav();
            nav.setRoot(LoginPage);
        }, (err) => {
            this.loading.dismiss();
            //this.presentToast(err);
        });
    }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'You are logged out',
      subTitle: 'Redirecting in the home page.',
      buttons: ['OK']
    });
    alert.present();
  }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

    /*presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }*/

}
