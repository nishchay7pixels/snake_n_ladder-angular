import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.css']
})
export class ControlMenuComponent {
  title = 'app';
  grid : string[][];
  turn = {id: 1, title: 'Player 1'};
  number1 = 0;
  number2 = 0;
  position1 = {xvalue:0, yvalue: 0};
  position2 = {xvalue:0, yvalue: 0};
  onDice = 0;
  winner = -1;
  lock1=true;
  lock2=true;
  constructor(){
    this.plot_Knights();
    console.log(this.position1);

  }
  plot_Knights(): void{
    this.reset_Plot();
    if(this.position1.xvalue==this.position2.xvalue && this.position2.yvalue==this.position1.yvalue)
      this.grid[this.position1.xvalue][this.position1.yvalue] = 'P12';
    else {
      this.grid[this.position1.xvalue][this.position1.yvalue] = 'P1';
      this.grid[this.position2.xvalue][this.position2.yvalue] = 'P2';
    }
  }
  reset_Plot():void{
    this.grid = [['1','2','3','4','5','6','7','8','9','10'],
      ['11','12','13','14','15','16','17','18','19','20'],
      ['21','22','23','24','25','26','27','28','29','30'],
      ['31','32','33','34','35','36','37','38','39','40'],
      ['41','42','43','44','45','46','47','48','49','50'],
      ['51','52','53','54','55','56','57','58','59','60'],
      ['61','62','63','64','65','66','67','68','69','70'],
      ['71','72','73','74','75','76','77','78','79','80'],
      ['81','82','83','84','85','86','87','88','89','90'],
      ['91','92','93','94','95','96','97','98','99','100']
    ];
  }
  reset_game():void{
    this.reset_Plot();
    this.number1 = 0;
    this.number2 = 0;
    this.position1 = {xvalue:0, yvalue: 0};
    this.position2 = {xvalue:0, yvalue: 0};
    this.onDice = 0;
    this.winner = -1;
    this.lock1=true;
    this.lock2=true;
    this.plot_Knights();
  }
  roll_Dice(): void{
    let x = Math.floor(Math.random()*6+1);
    this.onDice = x;
    console.log(this.onDice+"for Player "+this.turn.id);
    if(this.turn.id==1)
      this.turn.id=2;
    else
      this.turn.id=1;

    if(this.lock1==true && this.turn.id== 1){
      if(this.onDice==1){
        this.lock1=false;
      }
    }
    else if(this.lock2==true && this.turn.id== 2){
      if(this.onDice==1){
        this.lock2=false;
      }
    }
    else{
      this.move_Knight(this.turn.id, x);
    }
  }
  move_Knight(player: number, steps: number): void{
    if(player==1){

      if(this.number1+steps==99){
        console.log("Player 1 Won!");
        this.winner=0;
      }
      else if(this.number1+steps>99){}
      else{
        this.number1=this.check_For_Climb_Or_Drop(this.number1+steps);
        this.position1.yvalue=(this.number1%10);
        this.position1.xvalue=Math.floor(this.number1/10);
        this.plot_Knights();
      }

    }
    else{
      if(this.number2+steps==99){
        console.log("Player 2 Won!");
        this.winner=1;
        this.position2.yvalue=(9);
        this.position2.xvalue=9;
        this.plot_Knights();
      }
      else if(this.number2+steps>99){}
      else{
        this.number2=this.check_For_Climb_Or_Drop(this.number2+steps);
        this.position2.yvalue=(this.number2%10);
        this.position2.xvalue=Math.floor(this.number2/10);
        this.plot_Knights();
      }
    }
  }
  check_For_Climb_Or_Drop(ontile: number): number {
    switch (ontile){
      case 20:
        return 2;
      case 28:
        return 8;
      case 98:
        return 57;
      case 70:
        return 50;
      case 91:
        return 24;
      case 37:
        return 55;
      case 3:
        return 15;
      case 12:
        return 26;
      case 52:
        return 67;
      case 76:
        return 94;

    }
    return ontile;
  }

}

