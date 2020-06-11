// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "ENTER_YOUR_API_KEY",
    authDomain: "ENTER_YOUR_AUTH_DOMAIN",
    databaseURL: "ENTER_YOUR_DATABASE_URL",
    projectId: "ENTER_YOUR_PROJECT_ID",
    storageBucket: "ENTER_YOUR_STORAGE_BUCKET",
    messagingSenderId: "ENTER_YOUR_ID",
    appId: "ENTER_YOUR_API_ID"
  },
  urlBase:'http://127.0.0.1:3333/apiStore/v1/',
  urlImagnes:'http://127.0.0.1:3333/'
};


/*
urlBase:'http://35.226.44.211/apiStore/v1/'
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
