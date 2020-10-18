import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  id: string = '';
  password: string = '';

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};

  constructor(
    private router: Router,
    private alertController: AlertController,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  signup = () => {
    this.postObj['id'] = this.id;
    this.postObj['password'] = this.password;

    const body = this.postObj;
    this.gs.http(this.url + 'signup.php', body).subscribe(
      res => {
        if(res['status'] == 200){
          this.alertSuccessed();
          this.router.navigate(['/login']);
        }
        else if(res['status'] == 406){
          this.alertFailure();
        }
      }
    )
  }

  async alertSuccessed() {
    const alert = await this.alertController.create({
      message: '新規登録に成功しました.\nログインをお願いします.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertFailure() {
    const alert = await this.alertController.create({
      message: 'IDが重複しています.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
