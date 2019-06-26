import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Game } from '../models/game';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';
import { Player } from '../models/player';

@Injectable()

export class GameService implements OnInit{

  games: FirebaseListObservable<Game[]>

  constructor(private database: AngularFireDatabase) {}
  
  ngOnInit() {
    this.games = this.database.list('games');
  }

  getGame(key: string) {
    return this.database.object('games/' + key);
  };

  createGame(game: Game) {    
    return this.database.list('games').push(game);
  }

  updateGame(localGame, localGameKey) {
    let databaseGame = this.getGame(localGameKey);
    databaseGame.update({
      players: localGame.players,
      board: localGame.board,
      redGraveyard: localGame.redGraveyard,
      blueGraveyard: localGame.blueGraveyard
    });
  }
}