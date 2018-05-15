import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { RegisterPage } from '../register/register';
import { Storage } from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loading: any;
    loginData = { username:'', password:'' };
    data: any;
    isNotLoggedIn: boolean = true;
    isLoggedIn: boolean = false;

    constructor(private storage: Storage, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController)
    {
        this.storage.get('token').then((val) => {
            if(val!="" && val!= null){
                this.isNotLoggedIn = false;
                this.isLoggedIn = true;
            }
        });
        console.log(this.storage.get('username'));
    }

   /* doLogin() {

        //this.showLoader();
        if (this.loginData.username == 'admin' && this.loginData.password == '12345') {
          //  this.data.access_token = '123445555666666';
            //localStorage.setItem('token', this.data.access_token);
            this.storage.set('token', '123445555666666');
            this.navCtrl.setRoot(HomePage);
            /!* this.authService.login(this.loginData).then((result) => {
                 this.loading.dismiss();
                 this.data = result;
                 localStorage.setItem('token', this.data.access_token);
                 this.navCtrl.setRoot(HomePage);
             }, (err) => {
                 this.loading.dismiss();
                 this.presentToast(err);
             });*!/
        }
        else{
            this.presentToast('Login Details Invalid');
            this.loading.dismiss();
        }
    }*/

    doLogin() {

        this.showLoader();
        this.authService.login(this.loginData).then((result) => {
            this.loading.dismiss();
            this.data = result;
            console.log(this.data);
            this.storage.set('token', this.data.authToken);
            this.storage.set('username', this.data.username);
            //console.log(this.storage.get('username'));
            this.addAdvise();
            this.navCtrl.setRoot(TabsPage);
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });


    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });

        this.loading.present();
    }

    presentToast(msg) {
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
    }


    addAdvise(){
        let recycleadv = {
            a0: 'Buy rechargeable batteries rather than disposable, and then recycle them using the recycling banks',
            a1: 'Avoid goods with lots of packaging, which will reduce waste',
            a2: 'Buy durable goods rather than disposable alternatives',
            a3: 'buy products that have been made from recycled materials. That way, you are ensuring that there is still demand for your recycled materials',
            a4:'Recycling a single days worth of the New York Times could save 75,000 trees or more.',
            a5: 'Facts: The more paper you use, more you are contributing to deforestation and carbon emissions. Try switching to paperless billing as much as possible.',
            a6: 'Gifting items to charity is also an excellent form of recycling.'

        };
        let bicyclingadv = {
            a0: 'Cycling can help to protect you from serious diseases such as stroke, heart attack, some cancers, depression, diabetes, obesity and arthritis.',
            a1: 'Cycling is easy to fit into your daily routine by riding to the shops, park, school or work.',
            a2: 'Most of the vehicles that you see on the road use fuel to run. As most of us know that fuel is obtained from fossil fuels. Try to avoid them as mush as possible',
            a3: 'Most of the vehicles that you see on the road use fuel to run. As most of us know that fuel is obtained from fossil fuels.',
            a4:'Cycling is a good way to control or reduce weight, as it raises your metabolic rate, builds muscle and burns body fat.',
            a5: 'Regular cycling stimulates and improves your heart, lungs and circulation, reducing your risk of cardiovascular diseases.',
            a6: 'Mental health conditions such as depression, stress and anxiety can be reduced by regular bike riding.'

        };
        let tpadv = {
            a0: 'An average size tree produces enough oxygen in one year to keep a family of four breathing.',
            a1: 'Three trees planted in the right place around buildings can cut air-conditioning costs up to 50 percent.',
            a2: 'Trees increase the value of property. Houses surrounded by trees sell for 18-25 percent higher than houses with no trees.',
            a3: 'By planting 20 million trees, the earth and its people will be provided with 260 million more tons of oxygen. Those same 20 million trees will remove 10 million tons of CO2.',
            a4:'Trees in the landscape relax us, lower heart rates, and reduce stress.',
            a5: 'Facts: The more paper you use, more you are contributing to deforestation and carbon emissions. Try switching to paperless billing as much as possible.',
            a6: 'Trees trap CO2 from the atmosphere and make carbohydrates that are used for plant growth. They give us oxygen in return. '

        };
        let ptadv = {
            a0: 'Along with reducing air pollution, public transportation is also more fuel efficient per passenger mile, which contributes to an overall decrease in the amount of energy necessary for transportation. ',
            a1: 'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.',
            a2: 'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.',
            a3: 'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.',
            a4:'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.',
            a5: 'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.',
            a6: 'By moving people more efficiently, public transit produces significantly less air pollution per passenger mile than a standard car carrying a single driver.'

        };
        let oaadv = {
            a0: 'Buy rechargeable batteries rather than disposable, and then recycle them using the recycling banks',
            a1: 'Avoid goods with lots of packaging, which will reduce waste',
            a2: 'Buy durable goods rather than disposable alternatives',
            a3: 'buy products that have been made from recycled materials. That way, you are ensuring that there is still demand for your recycled materials',
            a4:'Recycling a single days worth of the New York Times could save 75,000 trees or more.',
            a5: 'Facts: The more paper you use, more you are contributing to deforestation and carbon emissions. Try switching to paperless billing as much as possible.',
            a6: 'Gifting items to charity is also an excellent form of recycling.'

        };

        //console.log('post data: '+ JSON.stringify(newData));
        this.storage.set('recycleadv', recycleadv);
        this.storage.set('bicyclingadv', bicyclingadv);
        this.storage.set('tpadv', tpadv);
        this.storage.set('ptadv', ptadv);
        this.storage.set('oaadv', oaadv);
    }



}