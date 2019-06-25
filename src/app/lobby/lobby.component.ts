import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [GameService]
})
export class LobbyComponent implements OnInit {

  @Output() setLocalPlayerEvent = new EventEmitter();

  constructor(
    private gameService: GameService,
    private router: Router) { }

  ngOnInit() {

  }

  createGame(username: string) {
    if(!username) return;
    // TODO? Randomize red or blue team?
    let newPlayer = new Player(username, 'r');
    this.setLocalPlayerEvent.emit(newPlayer);
    let newGame = new Game([newPlayer, null]);

    let key = this.gameService.createGame(newGame);

    this.router.navigate(['games', key]);    
  }
  
  joinGame(username: string, gameKey: string) {
    if(!username || !gameKey) return;
    
    // this.setLocalUser.emit(username);
    let newPlayer = new Player(username, 'b');
    this.gameService.getGame(gameKey);

    //FIND PLAYER[] AND ADD PLAYER 2 TO GAME HERE
    
    this.router.navigate(['games', gameKey]);
  }

}
