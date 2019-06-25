import { Piece } from './piece';
import { Player } from './player';

export class Game {
    
    constructor(
        public players: Player[],
        public board: any[][]
    ){}
}
