import {Component, DoCheck, OnChanges, ViewChild} from '@angular/core';
import {ControlMenuComponent} from './control-menu/control-menu.component';
import {DiceComponent} from "./dice/dice.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  player1 = {wins: 0, lose: 0};
  player2 = {wins: 0, lose: 0};
  child : ControlMenuComponent;
  chance = 0;
  constructor(){
  }
  @ViewChild(ControlMenuComponent)
  private control_menu: ControlMenuComponent;
  @ViewChild(DiceComponent)
  private dice: DiceComponent;
  ngDoCheck(){
    this.dice.onDice=this.control_menu.onDice;
    if(this.chance)
      this.chance = 0;
    else
      this.chance = 1;
    if(this.control_menu.winner==0){
      this.player1.wins++;
      this.player2.lose++;
      this.control_menu.reset_game();
    }
    else if(this.control_menu.winner==1){
      this.player1.lose++;
      this.player2.wins++;
      this.control_menu.reset_game();
    }
  }
}
