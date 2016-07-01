// ==UserScript==
// @name        PoEPleasingTradeInteraction
// @namespace   https://github.com/concacid
// @include     http://poe.trade/search/*
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js
// ==/UserScript==

$('.whisper-btn').parent().after('<li><a href="#" onclick="return false" class="pwhisper-btn" title="Pleasing Trade Interaction">PTA</a></li>');


var pleasingWhisperClipboard = new Clipboard(".pwhisper-btn", {
    text: function(trigger) {
        return pleasingWhisperMessage(trigger);
    }
});

pleasingWhisperClipboard.on("success", function(e) {
    $(e.trigger).text("Copied to clipboard");
});
pleasingWhisperClipboard.on("error", function(e) {
    pleasingSendWhisper(e.trigger);
});

function pleasingWhisperMessage(o) {
  var item = $(o).parents('.item');

  var bo = item.data('buyout') ? ' You have listed the aforementioned item for ' + item.data('buyout') + '; A fine price, if I say so myself. As you have expressed interest in selling for this price,' : '';

  var prefix = '';
  if (item.data('level') != undefined)
  prefix += 'level ' + item.data('level') + ' ';
  if (item.data('quality') != undefined)
  prefix += item.data('quality') + '% ';

  var tab = item.data('tab');
  var tabMsg = tab? ' and deposited in stash tab "' + tab + '"' : '';

  //var message = '@' + item.data('ign') + ' Hi, I would like to buy your ' + prefix + item.data('name') + bo + ' in ' + item.data('league');
  var message = '@' + item.data('ign') +
    ' Hello, sir. You appear to be selling an item using the PoE Trade selling' +
    ' item listing feature, and I would love to purchase it from you, good sir.' +
    ' It is a ' + prefix + item.data('name') +
    ' located in ' + item.data('league') + ' league' + tabMsg + '.' +
    bo +
    ' I would love to buy it from you, as you expressed.' +
    ' Thank you for your time. I look forward to a pleasing social' +
    ' interaction and trade experience with you.';

  return message;
}

function pleasingSendWhisper(o) {
  window.prompt('Copy message to clipboard by pressing Ctrl+C', pleasingWhisperMessage(o));
}