import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MakeBetPage } from '../pages/makeBet/makeBet';
import { BattlePage } from '../pages/battle/battle';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { BetPage } from '../pages/bet/bet';
import { MasterService } from '../providers/master-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MakeBetPage,
    BattlePage,
    LoginPage,
    UserPage,
    BetPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MakeBetPage,
    BattlePage,
    LoginPage,
    UserPage,
    BetPage
  ],
  providers: [
    MasterService,
    Storage
  ]
})
export class AppModule {}
