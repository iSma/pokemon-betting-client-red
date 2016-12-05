export class Battle {
  id: string;
  startTime: string;
  Teams: [{
    TrainerId: string
  }]
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
