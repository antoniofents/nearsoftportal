var drawWords = function (jsonResponse) {

    document.getElementById("wordsDiv").innerHTML = "";
    var emojis = JSON.parse('{"person": "👤", "man": "👨", "woman":"👩","hand": "✋", "happy":"😃" }');
    
   var tags = JSON.parse(jsonResponse).description.tags;
  console.log(tags.length);
  console.warn(tags);
   var newWord = document.createElement("h2");
   var emojisDisplay="";

  for (var i = 0; i < tags.length; i++) {

    if(emojis[tags[i]]== null){
          emojisDisplay+= tags[i] +"  ";   
     }else{
       emojisDisplay+= emojis[tags[i]] +"  "; 
     }
    
  
  }


    newWord.textContent=emojisDisplay;

  document.getElementById("wordsDiv").appendChild(newWord);

}

