export class Piece {
    imageUrl: string;
    constructor(
        public value: number,
        public color: string,
        public movement: number) {
            
        this.imageUrl = "assests/img/" + color + value + ".jpeg";

    }
}


//1 : spy  x 1
//2 : scout  x 8
//3 : miner x 5
//4 : 4 x 4
//5 x 4
//6 x 4
//7 x 3
//8 x 2
//9 x 1 
//10 x 1
//11 : bomb x6
//12 : flag x 1