import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../models/player';
import { Game } from '../models/game';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @Input() color: string;
  @Input() localPlayer: Player;
  @Input() localGame: Game;
  
  @Output() onReadyClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  piecesPlaced(): boolean {
    if(this.localPlayer.color == 'r') {
      for(let piece of this.localGame.redGraveyard) {
        if(piece["quantity"] > 0) {
          return false;
        }
      }
      return true;
    }
    if(this.localPlayer.color == 'b') {
      for(let piece of this.localGame.blueGraveyard) {
        if(piece["quantity"] > 0) {
          return false;
        }
      }
      return true;
    }
  }

  readyClicked() {
    this.onReadyClicked.emit(this.localPlayer);
  }

}
