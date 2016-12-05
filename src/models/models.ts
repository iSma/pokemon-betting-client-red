export class Battle {
  id: string;
  startTime: string;
  Teams: [{
    TrainerId: number;
  }]
}

export class Trainer{
  id: string;
  name: string;
  gender: string;
  country: string;
}

export class Bet {
  id: string;
  UserId: string;
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
