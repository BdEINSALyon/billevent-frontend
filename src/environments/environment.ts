// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiServer: "https://0ee2b214.ngrok.io",
    apiServer: "http://localhost:8000",
    //jwtDomains: ['0ee2b214.ngrok.io'],
    jwtDomains: ['localhost:8000'],
    cgvUrl: "https://cgv.billetterie.bde-insa-lyon.fr"
};
