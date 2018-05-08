import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public person: {name: string, company: string, birthdate?: number};
  dob: any;
  age: any;
  showProfile: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.person = {name: undefined, company: undefined, birthdate: undefined};
    this.dob = undefined;

  }

  ionViewDidLoad() {
    let person = JSON.parse(localStorage.getItem('PERSON'));
    if (person){
      this.person = person;
      this.age = this.getAge(this.person.birthdate);
      this.dob = new Date(this.person.birthdate).toISOString();
    }
  }

  reset(){
    this.person = {name: null, company: null, birthdate: null};
    this.dob = null;
    this.showProfile = false;
  }

  save(){
    this.person.birthdate = new Date(this.dob).getTime();
    this.age = this.getAge(this.person.birthdate);
    this.showProfile = true;
    localStorage.setItem('PERSON', JSON.stringify(this.person));
  }

  getAge(birthdate){
    let currentTime = new Date().getTime();
    return ((currentTime - birthdate)/31556952000).toFixed(0);
  }



}
