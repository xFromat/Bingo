import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './game-screen/main/container/main-screen/main-screen.component';
import { BoardComponent } from './game-screen/main/container/board/board.component';
import { BoardFieldComponent } from './game-screen/main/components/board-field/board-field.component';
// import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    BoardComponent,
    BoardFieldComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        // MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
