import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-win',
  templateUrl: './win.page.html',
  styleUrls: ['./win.page.scss'],
})
export class WinPage implements OnInit {
  constructor(public mdlCtrl: ModalController) {}
  @Input() moves: string;
  ngOnInit() {}
//function to close the modal
  dismiss() {
    this.mdlCtrl.dismiss();
  }
}
