/*global FB*/
const FACEBOOK_API_VERSION = 'v2.11';
const FACEBOOK_APP_ID = '1946151882268761';

export const init = () => new Promise((resolve) => {
  if (this.initialized) {
    resolve(FB);
    return;
  }

  window.fbAsyncInit = () => {
    FB.init({
      appId: FACEBOOK_APP_ID,
      cookie: true,
      version: FACEBOOK_API_VERSION
    });

    this.initialized = true;
    resolve(FB);
  };

  (function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});