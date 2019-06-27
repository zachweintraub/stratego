
![image](./src/assets/img/cover.png)

# Stratego

This project recreates the classic board game of Stratego.  Stratego is a game in which you need to capture the flag of your opponent while defending your own flag. To capture the flag you use your army of 40 pieces. Pieces have a rank and represent individual officers and soldiers in an army. In addition to those ranked pieces you can use bombs to protect your flag.

# The Game


## Rules
The general game rules are as follows.
- Flags and bombs can't be moved once the game begins.
- Moveable pieces may only vertically and horizontally.
- If attacker is equal to defender, both pieces become demoralized and desert the battlefield.
- First player to capture the opponents flag wins.
- Soldiers may not enter the water.
- Player loses if they run out of moveable pieces.
- A piece may not move back and forth between the same two squares in three consecutive moves.

For the complete list of rules in the official game please visit
https://en.wikipedia.org/wiki/Stratego

## Pieces
| Piece Name |Icon | Rank | Amount | Description |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <center>**Flag**</center>| ![image](./src/assets/img/r0.jpg)| None | 1 | Must be defended at all costs.  The game ends when yours is captured |
| <center>**Bomb**</center>| ![image](./src/assets/img/r11.jpg) | [0] | 6 | Able to defeat all pieces except Miners but unable to move. |
| <center>**Spy**</center>| ![image](./src/assets/img/r1.jpg) | [1] | 1 | Defeated by all pieces but able to defeat the Marshal(10) if attacking first. |
| <center>**Scout**</center>| ![image](./src/assets/img/r2.jpg) | [2] | 8 | Able to move as many squares empty squares as it chooses to. |
| <center>**Miner**</center>| ![image](./src/assets/img/r3.jpg) | [3] | 5 | Able to diffuse bombs without taking damage. |
| <center>**Sergeant**</center>| ![image](./src/assets/img/r4.jpg) | [4] | 5 | None. |
| <center>**Lieutenant**</center>| ![image](./src/assets/img/r5.jpg) | [5] | 4 | None. |
| <center>**Captain**</center>| ![image](./src/assets/img/r6.jpg) | [6] | 4 | None. |
| <center>**Major**</center>| ![image](./src/assets/img/r7.jpg) | [7] | 3 | None. |
| <center>**Colonel**</center>| ![image](./src/assets/img/r8.jpg) | [8] | 2 | None. |
| <center>**General**</center>| ![image](./src/assets/img/r9.jpg) | [9] | 1 | None. |
| <center>**Marshal**</center>| ![image](./src/assets/img/r10.jpg) | [10] | 1 | None. |



#To DO
```
Placement
    - select pc > highlight/enlarge √
    - select tile to drop pc into √
    - select placed pcs and replace them on another tile
    - cant drop multiple pcs on one tile √
    + captured (GY) pcs not selectable after game starts
Initialize:
    - both players click ready button
    - host player clicks start game
    - local data from both players sent to DB
Movement:
    - one square for all but Scout
    - can't move to space occupied by your own
    - if landing on square occupied by enemy initiate combat()
    +
    + no diagonal
    + no lake
    + highlight available movements ??
Combat:
    - show enemy tile
    + results text ??
```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
