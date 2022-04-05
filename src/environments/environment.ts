// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // 'Category': 'http://'+window.location.hostname+':3000/category',// category
  // // 'Mobileapp': 'http://'+window.location.hostname+':3000/mobileapp',// mobileapp
  // 'Mobileapp': 'http://'+window.location.hostname+':3000/api',// mobileapp
  // 'Droptable': 'http://'+window.location.hostname+':3000/create_table',// create_table 
  // 'File': 'http://'+window.location.hostname+':3000/category/file',// file 
  'Category': 'https://dalelna.co/v1/category',// category
  // 'Mobileapp': 'http://sulaimankc.live/mobileapp',// mobileapp
  'Mobileapp': 'https://dalelna.co/v1/api',// mobileapp
  'Droptable': 'https://dalelna.co/v1/create_table',// create_table 
  'File': 'https://dalelna.co/category/v1/file',// file 
  firebaseConfig : {
    apiKey: "AIzaSyDrIJrfYmg88ZF0Tnm6vwXOKdiTyU3mTLM",
    authDomain: "dalelna-abb4e.firebaseapp.com",
    projectId: "dalelna-abb4e",
    storageBucket: "dalelna-abb4e.appspot.com",
    messagingSenderId: "350888085584",
    appId: "1:350888085584:web:dd894d784a141f922c2955",
    measurementId: "G-9RFY939CBL"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
