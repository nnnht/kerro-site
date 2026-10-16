// After a mailbox's sign-in, Microsoft or Google sends the browser here with its answer. The answer says, in
// "state", which firm's Kerro asked for it; the browser is sent on there with the answer unchanged. Only to a
// Kerro address, and only to the one place that takes such an answer.
(function () {
  'use strict';
  var KERRO = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.kerro\.(?:co\.uk|io)$/;
  var answer = window.location.search;
  var state = new URLSearchParams(answer).get('state') || '';
  // <the sign-in's own secret>.<microsoft or google>.<the firm's Kerro address>
  var first = state.indexOf('.');
  var second = first < 0 ? -1 : state.indexOf('.', first + 1);
  var provider = second < 0 ? '' : state.slice(first + 1, second);
  var host = second < 0 ? '' : state.slice(second + 1);
  if (first < 1 || (provider !== 'microsoft' && provider !== 'google') || !KERRO.test(host)) {
    document.getElementById('going').hidden = true;
    document.getElementById('not-ours').hidden = false;
    return;
  }
  window.location.replace('https://' + host + '/up-api/api/mail/oauth/' + provider + '/callback' + answer);
})();
