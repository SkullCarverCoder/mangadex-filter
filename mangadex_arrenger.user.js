// ==UserScript==
// @name         MangaDex Sorter
// @version      0.1
// @description  A userscript to sort mangadex manga by language scanlation
// @author       SkullCarverCoder
// @homepage     https://github.com/SkullCarverCoder
// @updateURL    https://raw.githubusercontent.com/xicelord/mangadex-scripts/master/mangadex-downloader.user.js
// @downloadURL  https://raw.githubusercontent.com/xicelord/mangadex-scripts/master/mangadex-downloader.user.js
// @match        https://mangadex.org/settings
// @match        https://www.mangadex.org/settings
// @match        https://mangadex.org/title/*
// @match        https://www.mangadex.org/title/*
// @icon         https://mangadex.org/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(function () {
    'use strict';
    let languages_iso= {
        'Arabic': 'ara',
        'Bengali': 'ben',
        'Bulgarian': 'bul',
        'Catalan': 'cat',
        'Chinese': 'chi',
        'Czech': 'cze',
        'Danish': 'dan',
        'Dutch': 'dut',
        'English': 'eng',
        'Filipino': 'fil',
        'Finnish': 'fin',
        'French': 'fre',
        'German': 'ger',
        'Greek': 'gre',
        'Hungarian': 'hun',
        'Indonesian': 'ind',
        'Italian': 'ita',
        'Japanese': 'jpn',
        'Korean': 'kor',
        'Malaysian': 'may',
        'Mongolian': 'mon',
        'Persian': 'per',
        'Polish': 'pol',
        'Portuguese (Brazil)': 'por',
        'Portuguese (Portugal)': 'por',
        'Romanian': 'rum',
        'Russian': 'rus',
        'Serbo-Croatian': 'hrv',
        'Spanish (LATAM)': 'spa',
        'Spanish (Spain)': 'spa',
        'Swedish': 'swe',
        'Thai': 'tha',
        'Turkish': 'tur',
        'Vietnamese': 'vie'
      };

      let scanlations_groups = [...GetPageScanlations().values()];

      //inject dropdowns
      $('div.col-auto span.fas.fa-globe').before('<div class="btn-group"><button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button><div>');
      $('div.col-auto button.btn.dropdown-toggle').append($('div.col-auto span.fas.fa-globe'));
      $('div.col-auto button.btn.dropdown-toggle span.fas.fa-globe').after('<div  id="sortbylang" class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position:absolute;will-change: transform; top:0px;left:0px;transform: translate3d(-51px, 34px, 0px); max-height:60vh;overflow:auto"></div>');
      var langdropdown = $('#sortbylang')
      $.each(languages_iso, function(val,text){
        var element= '<a id="{lang}" stuff="{minilang}" class="dropdown-item" href="#"></a>'
        langdropdown.append(
            $(element.replace(/{lang}/g, val).replace(/{minilang}/g, text)).html(val)
        );
        $('a[stuff="{minilang}"]'.replace(/{minilang}/g, text)).click(function(){
            SortByLanguage($(this).attr('id'));
        })
      });


      function GetPageScanlations(){
          let dirty = [];
          let catcher = $('div.chapter-list-group a');
          for (let index = 0; index < catcher.length; index++){
              dirty.push(catcher[index].innerText);
          }
          return new Set(dirty);
      }
      function SortByScanlation(Group){
        let selector = 'div.chapter-list-group a'
        let catcher = $(selector);
        for (let index = 0; index < catcher.length; index++) {
            const element = catcher[index]
            if (element.innerText != Group){
                element.parentNode.parentElement.parentNode.style.display = 'none';
            }
        }
      }

      function reverse(){
          $('div.col').filter(function(){
              return $(this).css('display') === 'none';
          }).css('display', '');
      }
      function SortByLanguage(lang){
        let selector = 'div.chapter-list-flag span[title="{language}"]';
        let languages = Object.keys(languages_iso);
        for (let index = 0; index < languages.length; index++) {
            let newselector = selector.replace('{language}', languages[index]);
            let element = $(newselector);
            if(element.attr('title') != lang && element.length > 0){
                    element.parent().parent().parent().css('display','none');
            }
      }
    }
})();