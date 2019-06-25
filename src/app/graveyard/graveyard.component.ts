import { Component, OnInit } from '@angular/core';
import { Piece } from '../models/piece';

@Component({
  selector: 'app-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss']
})
export class GraveyardComponent implements OnInit {

  constructor(public red: Piece[] = [], public blue: Piece[] = []) { }

  ngOnInit() {
  }


}
