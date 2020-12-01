import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: string;
  hash: string;
  maps: number;

  map_name: string;
  map_number: any;

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};

  // マップ変数
  mapNum: number[] = [...new Array(16).keys()];  // HTML*ngFor（描画）用リスト
  mapAtt: number[] = new Array(256);  // 描画内容メモ
  mapSrc: string[] = new Array(256);  // 描画ソースリスト

  // signal button バインド
  signalFill: string = 'solid';
  signalMessage: string = 'アイテムからは信号が出ているぞ！'

  // 画像保存用
  image0: any;  // プレゼント
  image1: any;
  image2: any;
  image3: any;

  // 宝箱管理
  itemFlag1: Boolean = false;
  itemFlag2: Boolean = false;
  itemFlag3: Boolean = false;
  giftFlag: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private ble: BLE,
    public gs: GlobalService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    // ID, HASH取得
    this.nativeStorage.getItem('login').then(
      data => {
        this.id = data['id'];
        this.hash = data['hash'];
        this.maps = data['maps'];
        this.route.params.subscribe(
          params => {
            this.map_name = params['name'];
            this.map_number = params['number'];

            // 更新のため, 既存データを持ってくる
            this.postObj['id'] = this.id;
            this.postObj['hash'] = this.hash;
            this.postObj['map_number'] = this.map_number;
            const body = this.postObj;
            this.gs.http(this.url + 'getMap.php', body).subscribe(
              res => {
                // getMapの後の処理
                for(let i = 0; i < 256; i++){
                  this.mapAtt[i] = 0;
                  this.mapSrc[i] = '../../assets/game/0.png';
                  if(res['map_list'][i] == 0){
                    this.mapAtt[i] = 0;
                    this.mapSrc[i] = '../../assets/game/0.png';
                  }else if(res['map_list'][i] == -1){
                    this.mapAtt[i] = -1;
                    this.mapSrc[i] = '../../assets/game/かべ.png';
                  }else if(res['map_list'][i] == -2){
                    this.mapAtt[i] = -2;
                    this.mapSrc[i] = '../../assets/game/ゆか.png';
                  }else if(res['map_list'][i] == -3){
                    this.mapAtt[i] = -3;
                    this.mapSrc[i] = '../../assets/game/だい.png';
                  }else if(res['map_list'][i] == -4){
                    this.mapAtt[i] = -4;
                    this.mapSrc[i] = '../../assets/game/いす.png';
                  }else if(res['map_list'][i] == 1){
                    this.mapAtt[i] = 1;
                    this.mapSrc[i] = '../../assets/game/1.png';
                  }else if(res['map_list'][i] == 2){
                    this.mapAtt[i] = 2;
                    this.mapSrc[i] = '../../assets/game/2.png';
                  }else if(res['map_list'][i] == 3){
                    this.mapAtt[i] = 3;
                    this.mapSrc[i] = '../../assets/game/3.png';
                  }
                }

                this.image0 = res['image_list']['0'];
                this.image1 = res['image_list']['1'];
                this.image2 = res['image_list']['2'];
                this.image3 = res['image_list']['3'];
              },
              error => {
                this.router.navigate(['/tabs']);
              }
            );
          }
        );
      }
    );
  }  // ngOnInit終わり

  onBle = () => {
    this.signalMessage = '探索中...';
    this.ble.scan([], 3).subscribe(
      device => {
        // 1号機
        if(device['id'] == "180A0B3E-FC28-C7F3-EFC5-60A4E95125A8" && this.itemFlag1 != true){
          if(Number(device['rssi']) > -40){
            for(let i = 0; i < 256; i++){
              if(this.mapAtt[i] == 1){
                this.mapSrc[i] = '../../assets/game/_1.png';
                this.signalMessage = '発見!';
                this.itemFlag1 = true;
                this.alertItem1();
              }
            }
          }
          else if(Number(device['rssi']) > -100){
            this.signalMessage = "お宝の匂いがするぞ！";
          }
        }
        // 2号機
        else if(device['id'] == "C5CD47FD-3C74-35BB-551B-C8995C88BC0A" && this.itemFlag2 != true){
          if(Number(device['rssi']) > -40){
            for(let i = 0; i < 256; i++){
              if(this.mapAtt[i] == 2){
                this.mapSrc[i] = '../../assets/game/_2.png';
                this.signalMessage = '発見!';
                this.itemFlag2 = true;
                this.alertItem2();
              }
            }
          }
          else if(Number(device['rssi']) > -100){
            this.signalMessage = "お宝の匂いがするぞ！";
          }
        }
        // 3号機
        else if(device['id'] == "3866D0DC-04FC-3DD1-FB3B-F600E88ABC57" && this.itemFlag3 != true){
          if(Number(device['rssi']) > -40){
            for(let i = 0; i < 256; i++){
              if(this.mapAtt[i] == 3){
                this.mapSrc[i] = '../../assets/game/_3.png';
                this.signalMessage = '発見!';
                this.itemFlag3 = true;
                this.alertItem3();
              }
            }
          }
          else if(Number(device['rssi']) > -100){
            this.signalMessage = "お宝の匂いがするぞ！";
          }
        }
        // スルー
        else{
          this.signalMessage = "信号探索停止中";
        }
        if(this.itemFlag1 == true && this.itemFlag2 == true && this.itemFlag3 == true){
          if(this.giftFlag != true){
            this.presentModal0();
            this.giftFlag = true;
          }
        }
      }
    );
  }

  async presentModal0() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'image': this.image0,
        'num': '0'
      }
    });
    return await modal.present();
  }
  async presentModal1() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'image': this.image1,
        'num': '1'
      }
    });
    return await modal.present();
  }
  async presentModal2() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'image': this.image2,
        'num': '2'
      }
    });
    return await modal.present();
  }
  async presentModal3() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'image': this.image3,
        'num': 3
      }
    });
    return await modal.present();
  }
  async alertItem1() {
    const alert = await this.alertController.create({
      message: '赤のアイテムを見つけました！',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertItem2() {
    const alert = await this.alertController.create({
      message: '緑のアイテムを見つけました！',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertItem3() {
    const alert = await this.alertController.create({
      message: '青のアイテムを見つけました！',
      buttons: ['OK']
    });

    await alert.present();
  }
}
