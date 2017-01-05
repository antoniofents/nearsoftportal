var drawWords = function (jsonResponse) {

    document.getElementById("wordsDiv").innerHTML = "";
    var emojis = JSON.parse('{"person": "👤", "man": "👨","woman":"👩","anger": "😡","contempt": "😒","disgust": "😷","fear": "😨","happiness": "😃","neutral": "😐","sadness": "😔","surprise": "😨","indoor": "🏠","looking": "👀","staring": "👀","glasses":"👓" }');
    
    var jsonMessage=JSON.parse(jsonResponse);
   var tags = jsonMessage.ComputerVision.tags;
  console.log(tags.length);
  console.warn(tags);
   var newWord = document.createElement("span");
   var emojisDisplay= "Faces Found: " +jsonMessage.ComputerVision.faces.length+"  ";
  for (var i = 0; i < tags.length; i++) {

    if(tags[i].confidence>.8){
      if(emojis[tags[i].name]== null){
            emojisDisplay+= tags[i].name +"  ";   
       }else{
         emojisDisplay+= emojis[tags[i].name] +"  "; 
       }
    }
          
  }

 

  for(var i = 0; i < jsonMessage.Emotion.length; i++){
    var emotionFound=jsonMessage.Emotion[i];
    var emotionProb="default";
      for(var key in Object.keys(emotionFound.scores)){
          if (typeof(emotionFound.scores[emotionProb]) == "undefined" ||  emotionFound.scores[Object.keys(emotionFound.scores)[key]]>emotionFound.scores[emotionProb]){
            emotionProb=Object.keys(emotionFound.scores)[key];
          }
      }        
       emojisDisplay+= emojis[emotionProb] +"  ";
  }


    newWord.textContent=emojisDisplay;

  document.getElementById("wordsDiv").appendChild(newWord);

}

