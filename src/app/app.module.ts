import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { GameComponent } from './game/game.component';
import { firebaseConfig } from '../firebaseApi';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './chat/chat.component';


export const firebase = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket
}

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GraveyardComponent,
    InventoryComponent,
    GameComponent,
    LobbyComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
