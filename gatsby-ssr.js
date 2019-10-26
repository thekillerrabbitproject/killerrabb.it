const React = require('react');
const { SplashScreen } = require('./src/components/splashscreen');

exports.onRenderBody = function({ setPreBodyComponents }) {
  if (process.env.NODE_ENV === 'production') {
    setPreBodyComponents([React.createElement(SplashScreen)]);
  }
};
