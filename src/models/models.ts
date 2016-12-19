export class Battle {
  id: string;
  startTime: string;
  hasStarted:boolean;
  teams: {
    1:{
    trainer: number;
    pokemons: number;
    };
    2:{
    trainer: number;
    pokemons: number;
    };
  };
}

export class Trainer{
  id: string;
  name: string;
  gender: string;
  country: string;
}

export class TrainerStat{
  battles:{
    total:number;
    won:number;
    lost:number;
  }
}

export class UserStat{
 all:{
    total:number;
    won:number;
    lost:number;
  }
}

export class Bet {
  id: number;
  user: number;
  username:string;
  choice:number;
  result:number;
  battle:number;
  parent:number;
  won:string;
  childs:Bet[];
}

export class Login {
  name: string;
  pass: string;
  id: number;
}

export class Account {
  name: string;
  mail: string;
  pass: string;
}

export class Pokemon {
  name: string;
  id: number;
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  speed: number;
}

export class Transaction {
  amount:string;
  type:string;
  bet:number;
}
