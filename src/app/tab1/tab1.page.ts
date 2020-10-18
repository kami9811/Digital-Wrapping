import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  id: string;
  hash: string;
  maps: number;

  interval: any;

  url: string = 'https://kn46itblog.com/hackathon/autumnvol3/php_apis/';
  postObj: any = {};
  returnObj: any = {};

  constructor(
    private router: Router,
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
