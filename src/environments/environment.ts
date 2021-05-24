// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'https://yourfarm-api.herokuapp.com/',
  twilioURL: 'https://api.twilio.com/2010-04-01/Accounts/AC5a78a45821f32805b243368526b6a795',
  firebaseConfig: {
    apiKey: "AIzaSyDXj_NkG58JzJA9IjXUjTmWG0STibUWRcU",
    authDomain: "your-farm-9ca68.firebaseapp.com",
    projectId: "your-farm-9ca68",
    storageBucket: "your-farm-9ca68.appspot.com",
    messagingSenderId: "56855549327",
    appId: "1:56855549327:web:ec6f279f391f466fec27fa",
    measurementId: "G-QGWDTBSYLC"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
