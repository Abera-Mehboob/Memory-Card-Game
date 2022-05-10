import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WinPage } from '../win/win.page';
@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.page.html',
  styleUrls: ['./memory-game.page.scss'],
})
export class MemoryGamePage implements OnInit {
  public cardsTotal = 12;
  public cardsArray = [];
  public imageDir = '../../assets/img/gameImgs/';
  public images = [
    'ant',
    'bird',
    'dog',
    'flag',
    'football',
    'lion',
    'penguin',
    'snake',
  ];
  public selectCard1pos = -1;
  public selectCard1val = -1;
  public selectCard2pos = -1;
  public selectCard2val = -1;
  public selectOldPositon = -1;
  public move = 0;
  public flip = 0;
  public flipped = [];
  public flipped2 = [];
  public historyArray = [];
  private lockMove = false;
  constructor(private mdlCtrl: ModalController) {}
  ngOnInit() {
    this.populateCards();
    this.shuffle(this.cardsArray);
    this.shuffle(this.images);
  }
  ionViewWillLeave() {
    window.location.reload();
  }

  //Generate card value with two cards having the same value.
  populateCards() {
    this.cardsArray = [];
    let y = 0;
    for (let i = 0; i < this.cardsTotal; i+=2) {
      this.cardsArray.push({ pos: i, flagValue: y, cardValue: y });
      this.cardsArray.push({ pos: i+1, flagValue: y, cardValue: y });
      y++;
    }
  }


  //Opens Popup screen when user wins
  openModal = async () => {
    const modal = await this.mdlCtrl
      .create({
        component: WinPage,
        componentProps: {
          moves: this.move,
        },
        cssClass: 'winScreen',
        canDismiss: false,
      })
      .then((modalElement) => {
        modalElement.present();
      });
  };

  //Shuffle cards for every new game
  shuffle(a: any) {
    let j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  //check if the cards are matching or not, if cards matche they remain face up else they flips back
  selectCard(pos, flagValue, i) {
    if(this.lockMove){
      return false;
    }
    this.move++;
    if (this.selectCard1pos === -1) {
      this.selectCard1pos = pos;
      this.selectCard1val = flagValue;
      this.selectOldPositon = i;
      return true;
    } else if (this.selectCard2pos === -1) {
      this.selectCard2pos = pos;
      this.selectCard2val = flagValue;
      this.lockMove =true;
    }

    if (this.selectCard1pos > -1 && this.selectCard2pos > -1) {
      setTimeout(() => {
        if (this.selectCard1val === this.selectCard2val) {
          this.flip++;
          this.flipped = this.cardsArray.splice(this.selectOldPositon, 1, {
            pos: this.selectOldPositon,
            flagValue: -1,
            cardValue: flagValue,
          });
          this.flipped2 = this.cardsArray.splice(i, 1, {
            pos: i,
            flagValue: -1,
            cardValue: flagValue,
          });
          this.historyArray.push(this.flipped[0].cardValue);
          this.resetSelects();
          if (this.flip === this.cardsTotal/2) {
            this.openModal();
          }
        } else {
          this.resetSelects();
        }
        this.lockMove =false;
      }, 1000);
    }
  }

  //Reset ALl the card values to default -1
  resetSelects() {
    this.selectCard1pos = -1;
    this.selectCard1val = -1;
    this.selectCard2pos = -1;
    this.selectCard2val = -1;
  }
}