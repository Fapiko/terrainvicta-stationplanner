import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import {Provider} from 'react-redux';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-RHHDWSYL5Q'; // OUR_TRACKING_ID

ReactGA.initialize(TRACKING_ID);
ReactGA.send('pageview');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}><App/></Provider>
    </React.StrictMode>,
);

function sendToAnalytics({id, name, value, label}) {
    ReactGA.event(
        {
            eventCategory: 'Web Vitals',
            eventAction:   name,
            eventValue:    Math.round(name === 'CLS' ? value * 1000 : value), // values must be
                                                                              // integers
            eventLabel:     id, // id unique to current page load
            nonInteraction: true, // avoids affecting bounce rate
        });
}

reportWebVitals(sendToAnalytics);
