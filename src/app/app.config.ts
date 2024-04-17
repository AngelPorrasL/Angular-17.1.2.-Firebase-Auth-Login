import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getAuth, provideAuth  } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD8TKEuHC2wNUZEnDFdQKGGbvdrHADbg3s",
  authDomain: "loginauth-d06bc.firebaseapp.com",
  projectId: "loginauth-d06bc",
  storageBucket: "loginauth-d06bc.appspot.com",
  messagingSenderId: "94453480360",
  appId: "1:94453480360:web:481c68695380a3e750bb9d",
  measurementId: "G-LE403CPMXS"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
