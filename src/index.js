import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
sw_register();

function sw_register() {
  if (!('serviceWorker' in navigator)) return;
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
  if (publicUrl.origin !== window.location.origin) return;
  window.addEventListener('load', () => {
    const swRel = (process.env.NODE_ENV === 'production') ?
      'service-worker.js' : 'sw.js';
    const swUrl = `${process.env.PUBLIC_URL}/${swRel}`;
    navigator.serviceWorker.register(swUrl).then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller)
              console.log('New content is available; please refresh.');
            else
              console.log('Content is cached for offline use.');
          }
        };
      };
    }).catch(error => {
      console.error('Error during service worker registration:', error);
    });
  });
}

function sw_unregister() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
