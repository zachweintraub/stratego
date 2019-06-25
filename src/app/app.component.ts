import { Component, Input } from '@angular/core';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  localPlayer: Player;
  title: string = 'Stratego';
  setLocalPlayer(myLocalPlayer: Player) {
    this.localPlayer = myLocalPlayer;
    console.log(this.localPlayer.name);
  }
}
