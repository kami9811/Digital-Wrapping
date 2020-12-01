import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  hash: string;
  maps: number;
  newmaps: number;

  renew: number;
  map_name: string;

  map_number: any;

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};

  // マップ変数
  mapNum: number[] = [...new Array(16).keys()];  // HTML*ngFor（描画）用リスト
  mapAtt: number[] = new Array(256);  // 描画内容メモ
  mapSrc: string[] = new Array(256);  // 描画ソースリスト
  // ボタン状態検知
  del: Boolean = false;
  wall: Boolean = false;
  floor: Boolean = false;
  stand: Boolean = false;
  chair: Boolean = false;
  bea: Boolean[] = [false, false, false];
  // ボタンfillバインド
  delFill: string = 'solid';
  wallFill: string = 'solid';
  floorFill: string = 'solid';
  standFill: string = 'solid';
  chairFill: string = 'solid';
  beaFill: string[] = ['solid', 'solid', 'solid'];
  photoFill: string[] = ['solid', 'solid', 'solid'];
  // onClick時のid確認用
  row: any;
  col: any;
  editId: any;
  // onClickでbeacon重複確認
  beacon_check: Boolean = true;

  // 画像保存用
  image0: any;  // プレゼント
  image1: any;
  image2: any;
  image3: any;

  saveMessage: string = '保存';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private camera: Camera,
    public gs: GlobalService,
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
            this.renew = params['status'];
            this.map_name = params['name'];
            this.map_number = params['number'];
            if(this.renew == 1){
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
                },
                error => {
                  for(let i = 0; i < 256; i++){
                    this.mapAtt[i] = 0;
                    this.mapSrc[i] = '../../assets/game/0.png';
                  }
                }
              );
            }
            else{
              for(let i = 0; i < 256; i++){
                this.mapAtt[i] = 0;
                this.mapSrc[i] = '../../assets/game/0.png';
              }
            }
          }
        );
      }
    );
  }  // ngOnInit終わり

  // Boolean, fill書き換え
  onButton = (e: any) => {
    this.del = false;
    this.wall = false;
    this.floor = false;
    this.stand = false;
    this.chair = false;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
    this.delFill = 'solid';
    this.wallFill = 'solid';
    this.floorFill = 'solid';
    this.standFill = 'solid';
    this.chairFill = 'solid';
    this.beaFill[0] = 'solid';
    this.beaFill[1] = 'solid';
    this.beaFill[2] = 'solid';
    if(e.target.id == '0'){
      this.del = true;
      this.delFill = 'outline'
    }else if(e.target.id == 'm1'){
      this.wall = true;
      this.wallFill = 'outline';
    }else if(e.target.id == 'm2'){
      this.floor = true;
      this.floorFill = 'outline';
    }else if(e.target.id == 'm3'){
      this.stand = true;
      this.standFill = 'outline';
    }else if(e.target.id == 'm4'){
      this.chair = true;
      this.chairFill = 'outline';
    }else if(e.target.id == 'm10'){
      this.bea[0] = true;
      this.beaFill[0] = 'outline';
    }else if(e.target.id == 'm20'){
      this.bea[1] = true;
      this.beaFill[1] = 'outline';
    }else if(e.target.id == 'm30'){
      this.bea[2] = true;
      this.beaFill[2] = 'outline';
    }
  }

  onClick = (e: any) => {
    // 該当マスのAtt, Srcの書き換え
    this.row = Number(e.target.id.split(":")[1]);
    this.col = Number(e.target.id.split(":")[2]);
    this.editId = (this.row * 16) + this.col;

    if(this.del == true){
      this.mapAtt[String(this.editId)] = 0;
      this.mapSrc[String(this.editId)] = '../../assets/game/0.png';
    }else if(this.wall == true){
      this.mapAtt[String(this.editId)] = -1;
      this.mapSrc[String(this.editId)] = '../../assets/game/かべ.png';
    }else if(this.floor == true){
      this.mapAtt[String(this.editId)] = -2;
      this.mapSrc[String(this.editId)] = '../../assets/game/ゆか.png';
    }else if(this.stand == true){
      this.mapAtt[String(this.editId)] = -3;
      this.mapSrc[String(this.editId)] = '../../assets/game/だい.png';
    }else if(this.chair == true){
      this.mapAtt[String(this.editId)] = -4;
      this.mapSrc[String(this.editId)] = '../../assets/game/いす.png';
    }else if(this.bea[0] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 1){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        this.mapAtt[String(this.editId)] = 1;
        this.mapSrc[String(this.editId)] = '../../assets/game/1.png';
      }
      this.beacon_check = true;
    }else if(this.bea[1] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 2){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        this.mapAtt[String(this.editId)] = 2;
        this.mapSrc[String(this.editId)] = '../../assets/game/2.png';
      }
      this.beacon_check = true;
    }else if(this.bea[2] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 3){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        this.mapAtt[String(this.editId)] = 3;
        this.mapSrc[String(this.editId)] = '../../assets/game/3.png';
      }
      this.beacon_check = true;
    }
  }

  onPhoto = (e: any) => {
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      if(e.target.id == 1){
        this.image1 = 'data:image/jpeg;base64,' + imageData;

        this.postObj['beacon_id'] = 1;
        this.postObj['image'] = this.image1;
      }else if(e.target.id == 2){
        this.image2 = 'data:image/jpeg;base64,' + imageData;

        this.postObj['beacon_id'] = 2;
        this.postObj['image'] = this.image2;
      }else if(e.target.id == 3){
        this.image3 = 'data:image/jpeg;base64,' + imageData;

        this.postObj['beacon_id'] = 3;
        this.postObj['image'] = this.image3;
      }
      else if(e.target.id == '00'){
        this.image0 = 'data:image/jpeg;base64,' + imageData;

        this.postObj['beacon_id'] = 0;
        this.postObj['image'] = this.image0;
      }
      this.postObj['id'] = this.id;
      this.postObj['map_number'] = this.map_number;
      this.postObj['hash'] = this.hash;
      const body = this.postObj;
      this.gs.http(this.url + 'registerImage.php', body).subscribe(
        res => {
          console.log('photo has saved');
          this.alertPhoto0();
        },
        error => {
          this.postObj['image'] = '';
          const errorbody = this.postObj;
          this.gs.http(this.url + 'registerImage.php', errorbody);
          this.alertPhoto();
        }
      );
    });
  }

  onSave = () => {
    this.saveMessage = '保存中...';
    // マップ情報のオブジェクト化
    for(let i = 0; i < 256; i++){
      // console.log(i);
      let n = String(i);
      this.postObj[n] = this.mapAtt[i];
    }
    this.postObj['id'] = this.id;
    this.postObj['renew'] = this.renew;
    this.postObj['map_number'] = this.map_number;
    this.postObj['map_name'] = this.map_name;
    this.postObj['hash'] = this.hash;

    const body = this.postObj;
    console.log(body);
    this.gs.http(this.url + 'registerMap.php', body).subscribe(
      res => {
        console.log('map has saved');
        // native storageも書き換え / if new
        if(this.renew == 0){
          this.newmaps = this.maps + 1;
          this.nativeStorage.setItem('login', {
            id: this.id,
            hash: this.hash,
            maps: Number(this.newmaps)
          }).then(
            () => {
              this.saveMessage = '保存';
              this.alertSave();
              this.router.navigate(['/tabs/tab2']);
            }
          );
        }
      }
    );
  }

  async alertSave() {
    const alert = await this.alertController.create({
      message: 'ストーリーが保存されました.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertPhoto0() {
    const alert = await this.alertController.create({
      message: '画像の保存に成功しました.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertPhoto() {
    const alert = await this.alertController.create({
      message: '画像の保存に失敗しました.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
