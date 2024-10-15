//angular y modulos app
import { AppComponent } from './app.component';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

//ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

//angularfire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const config = {
  "projectId":"redux-admin-app",
  "appId":"1:81639189056:web:759871783c5aec36388da5",
  "storageBucket":"redux-admin-app.appspot.com",
  "apiKey":"AIzaSyBMkYJVrsCmpF9ed7GhlYzSSHZSLSx_bxc",
  "authDomain":"redux-admin-app.firebaseapp.com",
  "messagingSenderId":"81639189056",
  "measurementId":"G-BDYRECMV34"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,

    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode,
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(config)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
