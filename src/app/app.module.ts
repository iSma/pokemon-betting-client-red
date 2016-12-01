import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MakeBetPage } from '../pages/makeBet/makeBet';
import { BattlePage } from '../pages/battle/battle';
import { LoginPage } from '../pages/login/login';
import { Signin } from '../pages/signin/signin';
import { MasterService } from '../providers/master-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MakeBetPage,
    BattlePage,
    LoginPage,
    Signin

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
    Signin
  ],
  providers: [
    MasterService,
    Storage
  ]
})
export class AppModule {}
