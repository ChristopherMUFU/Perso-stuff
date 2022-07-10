import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const patchPostMessageJsCode = `(${String(function() {
  var originalPostMessage = window.postMessage
  var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer)
  }
  patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
  }
  window.postMessage = patchedPostMessage
})})();`

const getWebviewContent = (siteKey) => {
  const originalForm = '<!DOCTYPE html><html><head>' +
    '<style> .text-xs-center { text-align: center;} .g-recaptcha { display: inline-block; transform:scale(1.5); transform-origin:0 0; height: 700px;} </style>' +
    '<script src="https://www.google.com/recaptcha/api.js?hl=fr"></script>' +
    '<script type="text/javascript"> var onloadCallback = function() { }; ' +
    'var onDataCallback = function(response) { window.postMessage(response);  }; ' +
    'var onDataExpiredCallback = function(error) {  window.postMessage("expired"); }; ' +
    'var onDataErrorCallback = function(error) {  window.postMessage("error"); } </script>' +
    '</head><body>' +
    '<div class="text-xs-center"><div class="g-recaptcha" ' +
    'data-sitekey="' + siteKey + '" data-callback="onDataCallback" ' +
    'data-theme = "dark"'+
    'data-expired-callback="onDataExpiredCallback" ' +
    'data-error-callback="onDataErrorCallback"></div></div></body></html>';
  return originalForm;
}

const ReCaptchaView = ({
  onMessage,
  containStyle,
  title,
  description,
}) => (
    <WebView
      ref={(ref) => { this.webview = ref; }}
      mixedContentMode={'always'}
      onMessage={onMessage}
      javaScriptEnabled
      injectedJavaScript={patchPostMessageJsCode}
      automaticallyAdjustContentInsets={true}
      scrollEnabled={false}
      style={[{flex:1, backgroundColor: 'transparent', width: Dimensions.get('window').width+100, height: 5000 }]}
      source={{
        html: getWebviewContent("6LdrycsUAAAAAFmkTvyLrHHwnAozXsqIpYkbr1Nv"),
        baseUrl: 'http://google.com'
      }}
    />
  );

ReCaptchaView.propTypes = {
  onMessage: PropTypes.func,
  containStyle: PropTypes.any,
};

ReCaptchaView.defaultProps = {
  autoHeight: true,
  onMessage: (event) => null,
  title: '',
  description: '',
};

export default ReCaptchaView;
