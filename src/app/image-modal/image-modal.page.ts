import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  // Data passed in by componentProps
  @Input() image: string;
  @Input() num: number;

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    if(this.num == 0){
      this.alertClear();
    }
  }

  dismiss = () => {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async alertClear() {
    const alert = await this.alertController.create({
      message: 'アイテムを全て見つけました！\nこちらの場所に行ってみましょう...',
      buttons: ['OK']
    });

    await alert.present();
  }
}
