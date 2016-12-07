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
  id: string;
  user: string;
}

export class Login {
  name: string;
  pass: string;
}

export class Account {
  name: string;
  mail: string;
  pass: string;
}
