import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string = '';
  password: string = '';

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};

  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  login = () => {
    this.postObj['id'] = this.id;
    this.postObj['password'] = this.password;

    const body = this.postObj;
    this.gs.http(this.url + 'login.php', body).subscribe(
      res => {
        if(res['status'] == 200){
          // native storageに格納
          this.nativeStorage.setItem('login', {
            id: this.id,
            hash: res['hash'],
            maps: res['maps']
          }).then(
            () => this.router.navigate(['/tabs'])
          );
        }
        else{
          this.alertFailure();
        }
      }
    )
  }
  navigateToSignup = () => {
    this.router.navigate(['/signup']);
  }

  async alertFailure() {
    const alert = await this.alertController.create({
      message: 'IDかパスワードが間違っています.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
