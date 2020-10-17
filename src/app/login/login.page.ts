import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  login = () => {
    
  }

}
