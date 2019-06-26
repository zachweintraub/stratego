# Stratego

Placement
    - select pc > highlight/enlarge
    - select tile to drop pc into
    - select placed pcs and replace them on another tile
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
