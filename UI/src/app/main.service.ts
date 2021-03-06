import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment";
import {Observable} from "rxjs";
import {IGame} from "./Models/IGame";
import {IPlayer} from "./Models/IPlayer";
import {Router} from "@angular/router";
import {IText} from "./Models/IText";
import {IGameText} from "./Models/IGameText";
import * as moment from "moment";
import {IPlayerText} from "./Models/IPlayerText";
import {IKickPlayer} from "./Models/IKickPlayer";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly API = environment;

  constructor(private http: HttpClient, private router: Router) { }

  // game
  getGameList(): Observable<IGame[]> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IGame[]>(this.API.game);
  }
  getGame(id:string|number): Observable<IGame> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IGame>(`${this.API.game}/${id}`);
  }

  addGame(data: IGame) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.post(this.API.game, data);
  }

  deleteGame(id:number|string){
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.delete(`${this.API.game}/${id}`);
  }

  redirectToGame(gameId: number, gameName: string){
    this.router.navigateByUrl(`${gameName}#${gameId}`);
  }

  redirectToHome() {
    this.router.navigateByUrl('');
  }

  // player
  getPlayerList(gameId: number): Observable<IPlayer[]> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IPlayer[]>(`${this.API.player}/gameId=${gameId}`);
  }

  checkPlayer(gameId: number, playerName: string): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(`${this.API.player}/gameId=${gameId}/${playerName}`);
  }

  getPlayer(id:string|number): Observable<IPlayer> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IPlayer>(`${this.API.player}/${id}`);
  }

  addPlayer(data: IPlayer) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.post(this.API.player, data);
  }

  updatePlayer(id:number|string, data: IPlayer) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.put(`${this.API.player}/${id}`, data);
  }

  deletePlayer(id:number|string){
    return this.http.delete(`${this.API.player}/${id}`);
  }

  // Texts
  getTextList(): Observable<IText[]> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IText[]>(this.API.text);
  }
  getText(id: number) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IText>(`${this.API.text}/${id}`);
  }
  addTexts(texts: IText[]) {
    localStorage.setItem('lastRequest', moment.now().toString());
    let textsAPI = [];
    for(let el of texts) {
      textsAPI.push({value: el['value']});
    }
    return this.http.post(this.API.text, textsAPI);
  }
  deleteText(id: number) {
    return this.http.delete(`${this.API.text}/${id}`);
  }

  // Game Texts
  assignText2game(gameId: number, texts: IText[]) {
    localStorage.setItem('lastRequest', moment.now().toString());
    let gameTexts: IGameText[] = [];
    for(let text of texts)
    {
      gameTexts.push({textId: text.id, gameId: gameId});
    }
    return this.http.post(this.API.gameText, gameTexts);
  }

  getTexts4Game(gameId: number) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get(`${this.API.gameText}/${gameId}`);
  }

  // Player Texts
  getPlayerTexts(id: number) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get(`${this.API.playerTexts}/${id}`)
  }
  updatePlayerText(playerId: number, textId: number, checked: boolean) {
    console.log("Serwis");
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.put(`${this.API.playerTexts}/${playerId}`, {playerId: playerId, textId: textId, checked: checked});
  }
  addPlayerTexts(texts: IPlayerText[]) {
    localStorage.setItem('lastRequest', moment.now().toString());
    let textsAPI = [];
    for(let el of texts) {
      textsAPI.push(el);
    }
    return this.http.post(this.API.playerTexts, textsAPI);
  }

  // KickPlayers
  getKickPlayers(id: number): Observable<IKickPlayer[]> {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.get<IKickPlayer[]>(`${this.API.kickPlayers}/game/${id}`);
  }
  addKickPlayer(playerId: number, gameId: number) {
    localStorage.setItem('lastRequest', moment.now().toString());
    return this.http.post(this.API.kickPlayers, {playerId: playerId, gameId: gameId, f1: 1, f2: 0});
  }
  udpateKickPlayer(player: IKickPlayer, kick: boolean) {
    localStorage.setItem('lastRequest', moment.now().toString());
    if(kick){
      return this.http.put(`${this.API.kickPlayers}/f1/${player.playerId}`, {playerId: player.playerId, gameId: player.gameId, f1: 1, f2: 0});
    }
    return this.http.put(`${this.API.kickPlayers}/f2/${player.playerId}`, {playerId: player.playerId, gameId: player.gameId, f1: 0, f2: 1});
  }
  deleteKickPLayer(id: number) {
    return this.http.delete(`${this.API.kickPlayers}/${id}`);
  }
}
