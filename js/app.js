Number.prototype.forEvery = function(fn) {
    var l = this;
    for (var x = 0; x < l; x++) {
      if (fn) { fn(x); }
    }
  };
  Number.prototype.isOdd = function() { return this % 2; }

  function getData(path, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (fn) {
            fn(JSON.parse(xhr.responseText));
          }
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function(e) {
      console.error(xhr.statusText);
    };
    xhr.send();
  }

  function BuildApp(data) {
    var app = new App(data);
    var nav = document.getElementsByTagName('nav')[0];
    var main = document.getElementsByTagName('main')[0];
    // nav.innerHTML = app.nav;
    main.innerHTML = app.html;
    app.components.forEach(function(component) {
      component.performJavascriptFunctions();
    });
  }

  class Component {
    constructor(data, tagName) {
      this.data = data;
      this.tagName = tagName ? tagName : 'div';
      this.name = this.data.name;
      this.content = this.data.content;
      this.gallery = this.data.gallery;
      this.html = this.fill();
    }
    fill() {
      return '<' + this.tagName + '></' + this.tagName + '>\r';
    }
    performJavascriptFunctions() {

    }
  }

  class App extends Component {
    constructor(data) {
      super(data);
      this.nav = this.createNav();
    }
    fill() {
      var text = '';
      var self = this;
      this.components = [];
      text += '<div id="' + this.name + '">\r';
      this.gallery.forEach(function(item, index) {
        if (!item.display) { return; }
        var name = item.name;
        var component;
        switch (name) {
          case 'splash':
            self.splash = component = new Splash(item);
            break;
          case 'about':
            self.about = component = new About(item);
            break;
          case 'work':
            self.work = component = new Work(item);
            break;  
          case 'websites':
            self.websites = component = new Websites(item);
            break;
          case 'games':
            self.games = component = new Games(item);
            break;
          case 'artworks':
            self.artworks = component = new Artworks(item);
            break;
          case 'contact':
            self.contact = component = new Contact(item);
            break;
          default:
            component = new Component(item, 'section');
        }
        self.components.push(component);
        text += component.html;
      });
      text += '</div>\r';
      return text;
    }
    createNav() {
      var text = '';
      text += '<nav>\r';
      text += '<ul class="nav justify-content-end">\r';

      this.gallery.forEach(function(item, index) {
        if (!item.display) { return; }
        var name = item.name;
        text += '<li class="nav-item">\r';
        text += '<a class="nav-link active" href="#' + name + '">' + item.content.title + '</a>\r';
        text += '</li>\r';
      });

      text += '</ul>\r';
      text += '</nav>\r';
      return text;
    }
  }
 
  class About extends Component {
    constructor(data) {
      super(data);
    }
    fill() {
      var text = '';
      var content = this.content;
      text += '<section id="' + this.name + '">\r';
      text += '<div>\r';
      text += '<h2>' + content.name + '</h2>\r';
      text += '<a href="'+content.link+'" target="_blank">\r';
      text += '<img class="img-fluid" src="' + content.image + '">\r';
      text += '</a>\r';
      text += '<h3>' + content.jobTitle + '</h3>\r';
      text += '<p class="summary">' + content.summary + '</p>\r';

      text += '<section class="skills">\r';
      text += '<h3>Skills and Knowledge</h3>\r';
      text += '<ul>\r';
      content.skills = content.skills.sort();
      content.skills.forEach(function(skill) {
        text += '<li>' + skill + '</li>\r';
      });
      text += '</ul>\r';
      text += '</section>\r';
      text += '</div>\r';

      text += '</section>\r';
      return text;
    }
  }

  class Carousel extends Component {
    constructor(data, id) {
      super(data);
      this.id = id;
      this.html = this.fill();
    }
    fill() {
      var text = '';
      var self = this;
      text += '<div id="'+this.id+'" class="carousel slide" data-ride="carousel" data-interval="5000">\r';
      // text += '<ul class="carousel-indicators">\r';

      // this.gallery.forEach(function(item, index){
      //   text += '<li data-target="#'+self.id+'" data-slide-to="'+index+'"'+( index == 0 ? ' class="active"' : '') +'></li>\r';
      // });
       
      // text += '</ul>\r';
      text += '<div class="carousel-inner">\r';

      this.gallery.forEach(function(item, index){
        text += '<div class="carousel-item'+(index == 0 ? ' active' : '')+'">\r';
        text += '<div class="item">\r';   
        text += '<figure>\r'; 
        text += item.link ? '<a href="'+item.link+'" target="_blank">\r' : '';
        text += '<img class="img-fluid" src="'+item.image+'">\r';
        text += item.link ? '</a>\r' : '';
        text += '<figcaption>'+item.caption+'</figcaption>\r';
        text += '</figure>\r'; 
        text += '</div>\r'; 
        text += '</div>\r';
      });

      text += '<a class="carousel-control-prev" href="#'+this.id+'" data-slide="prev">\r';
      text += '<span class="carousel-control-prev-icon"></span>\r';
      text += '</a>\r';
      text += '<a class="carousel-control-next" href="#'+this.id+'" data-slide="next">\r';
      text += '<span class="carousel-control-next-icon"></span>\r';
      text += '</a>\r';
      text += '</div>\r';
      text += '</div>\r';
      return text;
    }
  }

  class Modal extends Component {
    constructor(data, id) {
      super(data); 
      this.id = id;
      this.html = this.fill();
    }
    fill() { 
      var text = '';
      text += '<div class="modal fade" id="'+this.id+'">\r';
      text += '<div class="modal-dialog modal-lg">\r';
      text += '<div class="modal-content">\r';
      text += '<div class="modal-header">\r';
      text += '<h4 class="modal-title">'+this.data.title+'</h4>\r';
      text += '<button type="button" class="close" data-dismiss="modal">&times;</button>\r';
      text += '</div>\r';
      text += '<div class="modal-body">\r';
      var carousel_id = this.id+'_carousel';
      var carousel = new Carousel(this.data, carousel_id);
      text += carousel.html;
      text += '</div>\r';
      text += '<div class="modal-footer">\r';
      text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\r';
      text += '</div>\r';
      text += '</div>\r';
      text += '</div>\r';
      text += '</div>\r';
      return text;
    }
  }

  

  class Work extends Component {
    constructor(data) {
      super(data);
    }
    fill() {
      var text = '';
      var self = this;
      text += '<section id="' + this.name + '">\r';
      text += '<div>\r';
      text += '<h2>' + this.content.title + '</h2>\r';
      text += '<p>' + this.content.summary + '</p>\r';
      text += '<div class="container-fluid gallery">\r';
      this.gallery.forEach(function(item, index) {
        text += '<section class="company">\r';
        text += '<h3>\r';
        text += '<img class="logo" src="'+item.image+'" width="80" height="80">\r';
        text += item.company; 
        text += '</h3>\r'; 
        text += '<p class="position"><i>'+item.position+'</i></p>\r';
        text += '<p class="dates">'+item.start_date+' - '+item.end_date+'</p>\r';

        text += '<ul>\r';
        item.bullets.forEach(function(bullet){
          text += '<li>'+bullet+'</li>\r';
        });
        text += '</ul>\r';

        if(item.projects.length > 0){
          text += '<section class="work_projects">\r';
          text += '<h3>Projects</h3>\r'; 

          text += '<div class="row">\r';
          text += '<div class="col-2">\r';
          text += '<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">\r';
          
          item.projects.forEach(function(project, p_index){
            text += '<a class="nav-link '+(p_index == 0 ? ' active' : '')+'" id="v-pills-tab'+p_index+'" data-toggle="pill" href="#v-pills-'+p_index+'" role="tab" aria-controls="v-pills-'+p_index+'" aria-selected="true">'+(p_index+1)+'</a>\r';

          });

          text += '</div>\r';
          text += '</div>\r';
          text += '<div class="col-10">\r';
          text += '<div class="tab-content" id="v-pills-tabContent">\r';
          
          item.projects.forEach(function(project, p_index){
            var modal_id = self.name+'_'+item.name+'_'+project.name;
            text += '<div class="tab-pane fade'+(p_index == 0 ? ' show active' : '')+'" id="v-pills-'+p_index+'" role="tabpanel" aria-labelledby="v-pills-tab'+p_index+'">\r';
            text += '<section>\r';
            text += '<div class="row">\r';
            text += '<div class="col-12">\r';
            text += '<h4>'+project.title+'<a href="#" data-toggle="modal" data-target="#'+modal_id+'">View</a></h4>\r'; 
            text += project.summary;
            text += '</div>\r';
            text += '<div class="col-12 col-sm-4 col-md-3">\r';
            text += '<figure class="thumbnail">\r';
            text += '<img class="img-fluid" src="'+project.image+'" data-toggle="modal" data-target="#'+modal_id+'">\r';
            text += '</figure>\r';
            text += '</div>\r';
            text += '<div class="col-12 col-sm-8 col-md-9">\r';
            text += '<ul>\r';
            project.bullets.forEach(function(bullet){
              text += '<li>'+bullet+'</li>\r';
            });
            text += '</ul>\r';
            
            text += '</div>\r';
            text += '</div>\r';
            text += '</section>\r';
            var modal = new Modal(project, modal_id);
            text += modal.html;
            text += '</div>\r';
          });
          
          text += '</div>\r';
          text += '</div>\r';
          text += '</div>\r';


          text += '</section>\r';
        } 
        text += '</section>\r';
      });
      text += '</div>\r';
      text += '</div>\r';
      text += '</section>\r';
      return text;
    }
  }

  class Websites extends Component {
    constructor(data) {
      super(data);
    }
    fill() {
      var text = '';
      text += '<section id="' + this.name + '">\r';
      text += '<div>\r';
      text += '<h2>' + this.content.title + '</h2>\r';
      text += '<p>' + this.content.summary + '</p>\r';
      text += '<div class="container-fluid gallery">\r';
      this.gallery.forEach(function(item, index) {
        text += '<div class="row gallery-item">\r';
        text += '<div class="col-12 col-sm-6">\r';
        text += '<h3>' + item.title + '</h3>\r';
        text += '<p>' + item.desc + '</p>\r';
        text += '</div>\r';
        text += '<div class="col-12 col-sm-6">\r';
        text += '<figure>\r';
        text += '<a href="' + item.link + '" target="_blank">\r';
        text += '<img class="img-fluid" src="' + item.image + '">\r';
        text += '</a>\r';
        text += '</figure>\r';
        text += '</div>\r';
        text += '</div>\r';
      });
      text += '</div>\r';
      text += '</div>\r';
      text += '</section>\r';
      return text;
    }
  }

  class Games extends Component {
    constructor(data) {
      super(data);
    }
    fill() {
      var text = '';
      text += '<section id="' + this.name + '">\r';
      text += '<div>\r';
      text += '<h2>' + this.content.title + '</h2>\r';
      text += '<p>' + this.content.summary + '</p>\r';
      text += '<div class="gallery">\r';
      this.gallery.forEach(function(item, index) {
        text += '<div class="gallery-item">\r';

        text += '<div class="flip-card">\r';
        text += '<div class="flip-card-inner">\r';

        text += '<div class="flip-card-front">\r';
        text += '<figure>\r';
        text += '<img class="img-fluid" src="' + item.image + '">\r';
        text += '</figure>\r';
        text += '</div>\r';

        text += '<div class="flip-card-back">\r';
        text += '<h3>' + item.title + '</h3>\r';
        text += '<p>' + item.desc + '</p>\r';
        text += '<a href="' + item.link + '" target="_blank"><span class="launch">Launch</span></a>\r';
        text += '<ul class="techs">\r';
        item.techs.forEach(function(tech) {
          text += '<li>' + tech + '</li>\r';
        });
        text += '</ul>\r';
        text += '</div>\r';
        text += '</div>\r';

        text += '</div>\r';
        text += '</div>\r';
      });
      text += '</div>\r';
      text += '</div>\r';
      text += '</section>\r';
      return text;
    }
    performJavascriptFunctions() {
      $('.flip-card-front').click(function() {
        $(this).parent().css('transform', 'rotateY(180deg)');
      });
      $('.flip-card-back').click(function() {
        $(this).parent().css('transform', 'rotateY(0deg)');
      });
    }
  }

  class Artworks extends Component {
    constructor(data) {
      super(data);
    }
    fill() { 
      var text = ''; 
      var carousel_id = this.name+'_carousel';
      text += '<section id="'+this.name+'">\r';
      text += '<div>\r';
      text += '<h2>'+this.content.title+'</h2>\r';
      text += '<p>'+this.content.summary+'</p>\r';

      text += '<div class="gallery">\r';
      text += '<div id="'+carousel_id+'" class="carousel slide" data-ride="carousel" data-interval="8000">\r';
      text += '<ul class="carousel-indicators">\r';

      this.gallery.forEach(function(item, index){
        text += '<li data-target="#'+carousel_id+'" data-slide-to="'+index+'"'+( index == 0 ? ' class="active"' : '') +'></li>\r';
      });
       
      text += '</ul>\r';
      text += '<div class="carousel-inner">\r';

      this.gallery.forEach(function(item, index){
        text += '<div class="carousel-item'+(index == 0 ? ' active' : '')+'">\r';
        text += '<div class="item">\r';   
        text += '<figure>\r';
        text += '<h3>'+item.title+'</h3>\r';
        text += item.link ? '<a href="'+item.link+'" target="_blank">\r' : '';
        text += '<img class="img-fluid" src="'+item.image+'">\r';
        text += item.link ? '</a>\r' : '';
        text += '<figcaption>\r';  
        text += '<p><b>Description: </b>'+item.desc+'</p>\r';
        text += '<p><b>Medium: </b>'+item.medium+'</p>\r';
        text += '</figcaption>\r';
        text += '</figure>\r'; 
        text += '</div>\r'; 
        text += '</div>\r';
      });

      text += '<a class="carousel-control-prev" href="#'+carousel_id+'" data-slide="prev">\r';
      text += '<span class="carousel-control-prev-icon"></span>\r';
      text += '</a>\r';
      text += '<a class="carousel-control-next" href="#'+carousel_id+'" data-slide="next">\r';
      text += '<span class="carousel-control-next-icon"></span>\r';
      text += '</a>\r';
      text += '</div>\r';

      text += '</div>\r';
      text += '</div>\r';
      text += '</div>\r';
      text += '</section>\r';
      return text;
    } 
    performJavascriptFunctions(){
      var images = $('#artworks img').toArray();
      var maxHeight = 500;
      setTimeout(function(){
        images.forEach(function(image){ 
          var height = image.naturalHeight;
          var width = image.naturalWidth;
          if(height > width){ 
            var finalWidth = (width/height)*maxHeight+'px'; 
            $(image).css('width', finalWidth);
          } 
        });
      }, 300); 
    }
  }

  class Contact extends Component{
    constructor(data){
      super(data);
    }
    fill(){
      var text = '';
      text += '<section id="'+this.name+'">\r';
      text += '<div>\r';
      text += '<h2>'+this.content.title+'</h2>\r';
      text += '<p><a href="mailto:'+this.content.email+'?" target="_top"> '+this.content.email+'</a> | '+this.content.phone+'</p>\r';
      text += '</div>\r';
      text += '</section>\r';
      return text;
    }
  }
  
  (function(){
    getData('json/data.json', BuildApp); 
  })();