import { Component, Input } from '@angular/core';
import { Player } from './models/player';
import { Game } from './models/game'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  localPlayer: Player;
  localGameKey: string;
  title: string = 'Stratego';
  setLocalVariables(vars: Object) {
    this.localPlayer = vars["player"];
    this.localGameKey = vars["key"];
    console.log(this.localPlayer.name + " " + this.localGameKey);
  }
}
