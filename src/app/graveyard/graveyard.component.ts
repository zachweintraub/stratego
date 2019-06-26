import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Piece } from '../models/piece';

@Component({
  selector: 'app-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent implements OnInit {

  // constructor(public red: Piece[] = [], public blue: Piece[] = []) { }

  @Output() onGraveyardPieceClicked = new EventEmitter();
  @Input() color: string;

  ngOnInit() {
  }

  graveyardPieceClicked(id: string) {

    let pieceNum = parseInt(id);
    this.onGraveyardPieceClicked.emit(pieceNum);

    console.log("graveyard.comp emitting onGraveyardPieceClicked: " + pieceNum)
  }

}
