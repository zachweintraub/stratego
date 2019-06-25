import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Game } from '../models/game';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games: Observable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.games = this.database.list('games').snapshotChanges();
  }

  getGame(key: string){
    
    // let thisGame = this.games.subscribe((data) => {
      
    //   console.log(data);
    //   data = data.filter(game => game['key'] == key);
    //   console.log(data);

      return this.database.object('games/'+key).snapshotChanges();
    };

    // let game = this.database.object<Game>('games/' + key).valueChanges();
    // console.log(game);
    // return;
  // }

  createGame(game: Game) {    
    return this.database.list('games').push(game).key;
  }
}