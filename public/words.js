var drawWords = function (jsonResponse) {
  // var canvas = document.getElementById('wordsCanvas');
  // var wordsFalling = [];
  // var ctx = canvas.getContext('2d');
  // var gradient = ctx.createLinearGradient(0, 0, 475, 0);
  // gradient.addColorStop(1, "white");
  // ctx.fillStyle = gradient;
  // console.warn(jsonResponse);
  // var count = 100;
   var tags = JSON.parse(jsonResponse).tags;
   console.log(JSON.stringify(jsonResponse).tags); //array
  //console.log(randomPosition);
  console.warn(tags);

  for (var i = 0; i < tags.length; i++) {

    var newWord = document.createElement("h2");
    newWord.textContent=tags[i].name;

    var element = document.getElementById("wordsDiv");
    element.appendChild(newWord);
    
    //var a = {};
    // randomly pick one tag
    //var randomPosition = Math.round(Math.random() * (tags.length -1));
    
    //a.tags = tags[randomPosition].name;
    //a.x = Math.random() * 500; // random X
    //a.y = Math.random() * 500 - 500; // random Y that is above the screen
    //a.speed = Math.random() * tags[randomPosition].confidence * 10;
    //wordsFalling.push(a);
  }

  // setInterval(function() {
  //   ctx.clearRect(0, 0, 500, 500);
  //   for (var i = 0; i < count; i = i + 1) {
  //     var a = wordsFalling[i];
  //     ctx.fillText(a.tags, a.x, a.y, 16);
  //     a.y += a.speed; // fall downwards by the speed amount
  //     if (a.y > 600) a.y = -50; // if off the screen at bottom put back to top
  //   }
  // }, 100);  
}