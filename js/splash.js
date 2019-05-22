class Splash extends Component {
    constructor(data) {
      super(data);
      this.maxWidth = 2400;
      this.maxHeight = 1200;
      this.boxSize = 100;
    }
    fill() {
      var text = '';
      text += '<section class="row" id="splash">\r';
      text += '</section>\r';
      return text;
    }
    performJavascriptFunctions() {
      function rand(min, max) {
        return Math.floor(Math.random() * (max - min) - min);
      }
      class Theme {
        constructor(name, colors) {
          this.name = name;
          this.colors = colors;
        }
        getColor() {
          return this.colors[rand(0, this.colors.length)];
        }
      }
      var variants = [
        'square',
        'square',
        'square',
        'square',
        'none',
        'none',
        'frame',
        'frame',
        'frame',
        'none',
      ];
      var self = this;
      var current_theme = getNewTheme();

      function getNewTheme() {
        var themes = [
          new Theme('red',
            [
              '#cc0000', //red
              '#ff6600', //orange 
              '#800000', //brick-red
              '#b32d00', //sienna
              '#009900', //green
              '#ff5050', //sunset-red
            ]),
          new Theme('blue',
            [
              '#0066ff', //blue
              '#4dffff', //cyan
              '#00ccff', //turquois
              '#3366ff', //summer-blue
              '#ccccff', //lavender
              '#0000cc', //indigo  
            ]),
          new Theme('green',
            [
              '#009900', //green  
              '#006600', //dark-green 
              '#ffcc66', //sand
              '#b32d00', //sienna
              '#ffff00', //yellow
            ]),
          new Theme('purple',
            [
              '#ccccff', //lavender 
              '#3366ff', //summer-blue 
              '#6600ff', //purple
              '#ff5050', //sunset-red
              '#ffccff', //pink 
              '#cc0000', //red
            ]),
          new Theme('yellow',
            [
              '#ff6600', //orange
              '#ffff00', //yellow
              '#ffcc66', //sand
              '#ff5050', //sunset-red 
            ]),
          new Theme('rainbow',
            [
              '#cc0000', //red
              '#ff6600', //orange
              '#ffff00', //yellow
              '#009900', //green  
              '#006600', //dark-green 
              '#ffccff', //pink 
              '#ff5050', //sunset-red
              '#800000', //brick-red
              '#b32d00', //sienna 
              '#ffcc66', //sand
              '#6600ff', //purple
              '#0066ff', //blue
              '#4dffff', //cyan
              '#00ccff', //turquois
              '#3366ff', //summer-blue
              '#ccccff', //lavender  
              '#0000cc', //indigo 
            ]),
        ];
        return themes[rand(0, themes.length)];
      }

      function makeBoxes(obj) {
        var number_of_boxes = (obj.maxHeight * obj.maxWidth) / (obj.boxSize * obj.boxSize);
        number_of_boxes.forEvery(function(number) {
          $('#splash').append('<div class="box"></div>');
        });
        $('#splash').css('max-width', obj.maxWidth + 'px');
        $('#splash').css('max-height', obj.maxHeight + 'px');
        $('.box').css('width', obj.boxSize + 'px');
        $('.box').css('height', obj.boxSize + 'px');
      }

      function generateArtifacts(theme) {
        theme = theme ? theme : current_theme;
        var splash = $('#splash');
        var boxes = $('.box').toArray();
        boxes.forEach(function(box) {
          $(box).html('');
          var artifact = document.createElement('div');
          $(artifact).addClass('artifact');
          var className = variants[rand(0, variants.length)];
          var color = theme.getColor();
          $(artifact).addClass(className);
          switch (className) {
            case 'square':
              $(artifact).css('background-color', color);
              break;
            case 'frame':
              $(artifact).css('background-color', color);
              $(artifact).css('align-items', 'center');
              $(artifact).html('<div class="inner-frame"></div>');
              break;
          }
          box.appendChild(artifact);
        });
      }

      function rotateArtifact() {
        var artifacts = $('#splash .box .frame').toArray();
        var artifact = artifacts[rand(0, artifacts.length)];

      }

      function addArtifact(type) {
        var artifacts = $('#splash .box .none').toArray();
        var index = rand(0, artifacts.length);
        var artifact = artifacts[index];
        artifact.className = 'artifact';

        var color = current_theme.getColor();
        $(artifact).addClass(type);
        switch (type) {
          case 'square':
            $(artifact).css('background-color', color);
            break;
          case 'frame':
            $(artifact).css('background-color', color);
            $(artifact).css('align-items', 'center');
            $(artifact).html('<div class="inner-frame"></div>');
            $(artifact.firstChild).css('display', 'none');
            $(artifact.firstChild).fadeIn(800, 'swing');
            break;
        }
        $(artifact).css('display', 'none');
        $(artifact).fadeIn(800, 'swing');
      }

      function removeArtifact(type) {
        var artifacts = $('#splash .box .' + type).toArray();
        var artifact = artifacts[rand(0, artifacts.length)];
        $(artifact).fadeOut(800, 'swing');
        setTimeout(function() {
          artifact.className = 'artifact';
          $(artifact).css('background-color', 'white');
          $(artifact).addClass('none');
        }, 800);
      }

      function changeColor(type) {
        var artifacts = $('#splash .box .' + type).toArray();
        var artifact = artifacts[rand(0, artifacts.length)];
        var color = current_theme.getColor();
        $(artifact).css('background-color', color);
      }

      (function() {
        makeBoxes(self);
        generateArtifacts();
        setInterval(function() {
          generateArtifacts(getNewTheme());
        }, 3000);
        // setTimeout(function(){
        //   setInterval(function(){
        //     removeArtifact('square');
        //     removeArtifact('square');
        //     removeArtifact('frame');
        //     removeArtifact('frame'); 
        //   }, 1000);
        // }, 500);
        // setInterval(function(){
        //   addArtifact('square');
        //   addArtifact('square');
        //   addArtifact('frame');
        //   addArtifact('frame');
        // }, 1000);
        // setInterval(function(){
        //   changeColor('frame');
        //   changeColor('square');
        // }, 500);

      })();
    }
  }