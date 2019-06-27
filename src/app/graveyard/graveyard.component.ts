import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Piece } from '../models/piece';
import { Player } from '../models/player';

@Component({
  selector: 'app-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent implements OnInit {

  // constructor(public red: Piece[] = [], public blue: Piece[] = []) { }

  @Output() onGraveyardPieceClicked = new EventEmitter();
  @Input() color: string;
  @Input() thisGraveyard: Object[];
  @Input() players: Player[];

  ngOnInit() {
  }

  graveyardPieceClicked(id: string) {
    
    this.onGraveyardPieceClicked.emit(id);
    console.log("graveyard.comp emitting onGraveyardPieceClicked: " + id)
  }

}
