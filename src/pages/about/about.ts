import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Challenge1Page} from "../challenge1/challenge1";
import { Challenge2Page} from "../challenge2/challenge2";
import { Challenge3Page} from "../challenge3/challenge3";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage{

  Challenge1Page: Challenge1Page;
  Challenge2Page: Challenge2Page;
  Challenge3Page: Challenge3Page;

  constructor(public navCtrl: NavController) {

  }

}
