Zepto(function($){
  
  $("a[href^='#']").sweetScroll();


  /* █ ██ ██ █ █████ █ █ █████████████ █████████ ███ */
  // get markup and rid of extra whitespace, linebreaks etc.
  var markup = $('.blackout17').html().replace(/\s\s+/g, ' ').trim();
    // init
  gapify(markup);
  // on hover out
  $('.blackout17').on('mouseout',function(){
    gapify(markup);
  });
  consoleFun(markup.split(' '),(markup.split(' ').length-1) * 0.5);

});

function gapify(markup,density) {

  var d = density || 0.6 ;
  var tokens = markup.split(' ');
  var gapCount = (tokens.length-1) * d;

  var gapmarkup = addRandomSpans(tokens,gapCount);
  if(markup) {
    $('.blackout17').html(gapmarkup);
  }
}

function addRandomSpans(tokens,amount){

  if(tokens.length > amount) {
    for (var i = amount - 1; i >= 0; i--) {

      // check if current or previous position is already a span    
      function checkForSiblings(tokens,r){
        var needle = '</span> <span>';
        if(!tokens[r-1].localeCompare(needle) || !tokens[r].localeCompare(needle) ){
          return true;
        } else {
          return false;
        }
      };
      
      // find new random gap
      var r = getRandomInt(1,tokens.length);
      while(checkForSiblings(tokens,r)){
        r = getRandomInt(1,tokens.length);
      }
      tokens.splice(r,0,'</span> <span>');
    }

    // glue everything back together 
    var reduced = tokens.reduce(function(acc,val){
      if(!"</span> <span>".localeCompare(val)){
        return acc + val;
      } else {
        return  acc + ' ' + val ;
      }
    });
   
    return '<span>' + reduced + '</span>';

  } else {
    console.log('Err... ' + tokens.length + ' tokens with ' + amount + ' gaps is not going to work!');
    return false;
  }

}


function consoleFun(tokens,gapcount) {
  var blockstring = Array(tokens.length).fill('█').join('');
  setInterval(function(){
    // console.clear();
    console.log("%c" + addRandomSpace(blockstring,gapcount),"font-size:48px;color:black;");
  },1000);
}

function addRandomSpace(string,count){
  var s_a = string.split('');
  for (var i = count - 1; i >= 0; i--) {      
    var r = getRandomInt(0,string.length);
    s_a.splice(r,0,' ');
  }
  return s_a.join('');
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

