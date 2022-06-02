// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPIURL = "http://localhost:3000";

export const environment = {
  production: false,
  GOOGLE_CLIENT_ID:"91100789841-pp089h12pkospkodnh824bfmv9fr1afc.apps.googleusercontent.com",
  user_api : `${baseAPIURL}/users`,
  student_api : `${baseAPIURL}/users`,
  subject_api : `${baseAPIURL}/subjects`,
  question_api : `${baseAPIURL}`,
  
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
