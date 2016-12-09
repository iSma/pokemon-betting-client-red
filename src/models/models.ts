export class Battle {
  id: string;
  startTime: string;
  teams: {
    1:{
    trainer: number;
    Pokemons: number;
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

export class Bet {
  id: number;
  user: number;
  choice:number;
  result:number;
  battle:number;
  parent:number;
  won:string;
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
