// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import * as firebase from "nativescript-plugin-firebase";

// testing notifications permission
if (firebase.ServerValue !== undefined) {
  console.log("Firebase already there");
} else {
  firebase
    .init({
      persist: true,
      storageBucket: "gs://testproject-5f002.appspot.com",
      onAuthStateChanged: (data: any) => {
        console.log("LOGIN STATUS in main is " + JSON.stringify(data));
        if (data.loggedIn) {
          console.log(
            "FROM FIREBASE INIT user's email address: " +
              (data.user.email ? data.user.email : "N/A")
          );
        } else {
          console.log("not logged in");
        }
      }
    })
    .then(
      function(instance) {
        console.log("firebase.init done");
      },
      function(error) {
        console.log("firebase.init error: " + error);
      }
    );
}

// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
