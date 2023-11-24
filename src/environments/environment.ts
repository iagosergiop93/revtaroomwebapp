// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/revtaroom',
  // API_URL: 'RevatureHousingAppEb-env.cp2r98h44c.us-east-1.elasticbeanstalk.com/revtaroom',
  GEO_CODE: 'https://api.opencagedata.com/geocode/v1/json?q=',
  GEO_CODE_KEY: '&key=54a4611db0364ab6bfa0dad926150ca1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
