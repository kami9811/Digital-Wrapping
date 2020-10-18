import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  id: string;
  hash: string;
  maps: number;
  newmaps: number;

  interval: any;

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};
  returnObj: any = {};

  constructor(
    private router: Router,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    public gs: GlobalService,
  ) {}

  ngOnInit() {
    this.nativeStorage.getItem('login').then(
      data => {
        this.id = data['id'];
        this.hash = data['hash'];
        this.maps = data['maps'];
        this.getMapList();
      }
    );
    this.interval = setInterval(() => {
      this.getMapList();
    }, 5000);
  }

  editNew = () => {
    console.log('New Wrapping!');
    this.alertName();
  }

  async alertName() {
    const alert = await this.alertController.create({
      message: '作成するストーリーの名前を入力してください.',
      inputs: [
        {
          name: 'name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: (alertData) => {
            console.log(alertData.name);
            // ここでnative storageをみないとバグる
            this.nativeStorage.getItem('login').then(
              data => {
                this.maps = data['maps'];
                this.newmaps = Number(this.maps) + 1;
                this.router.navigate(['/edit', 0, alertData.name, this.newmaps]);
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  getMapList = () => {
    // マップリスト取得
    this.postObj['id'] = this.id;
    this.postObj['hash'] = this.hash;
    const body = this.postObj;
    this.gs.http(this.url + 'getMapList.php', body).subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj);
      }
    );
  }
}
