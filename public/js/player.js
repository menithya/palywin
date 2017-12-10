document.addEventListener('DOMContentLoaded',function () {
    document.getElementById("btnPlay").addEventListener('click',feelingLucky);
    var imageMap={
        "1":'img/Symbol_0.png',
        "2":'img/Symbol_1.png',
        "3":'img/Symbol_2.png',
        "4":'img/Symbol_3.png',
        "5":'img/Symbol_4.png',
    };

    var winMap={
        smallWin:"Small Win",
        bigWin:"Bing Win",
        noWin:"No Win"
    }

    var constantMap={
        bonusText:"YOU WON BONUS",
        bonusTrigger:"Wait Bonous is trigering"
    }

    
    function feelingLucky() {
        imageContainer=document.getElementById('imagecontainer');
        var displayText=getElementByIdApi('winkey').innerHTML="";
        getElementByIdApi('bonusTrigger').innerHTML="";
        document.getElementById("btnPlay").style.display="block";

        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200){
                var result = JSON.parse(req.responseText);
                // setGameResult(result)
                cleanImageContainer();
                var isBonus=false;
                for (var val in result){
                    imageTagCreater(result[val]);
                    if(val === 7){ //Bonus
                       isBonus = true;
                    }
                }

                if(isUnique(result)){
                    getElementByIdApi('winkey').innerHTML=winMap['noWin'];
                } else if(countDuplicate(result) === true){
                    getElementByIdApi('winkey').innerHTML = winMap['bigWin'];
                } else {
                    getElementByIdApi('winkey').innerHTML = winMap['smallWin'];
                }
                if(isBonus){
                    getElementByIdApi('winkey').innerHTML=constantMap['bonusText']
                    document.getElementById("btnPlay").style.display="none";
                    getElementByIdApi('bonusTrigger').innerHTML=constantMap['bonusTrigger'];

                }

            }
            
        };

        req.open('GET',window.location.href+'playwin',true);
        req.send();

        function cleanImageContainer() {
           while (imageContainer.hasChildNodes()){
               imageContainer.removeChild(imageContainer.lastChild);
           }
        }

        function imageTagCreater(key) {
            var image= document.createElement('img');
            image.src=imageMap[key]
            imageContainer.appendChild(image)

        }

        function isUnique(arr) {
            return arr.length == new Set(arr).size;
        }

        function countDuplicate(arr) {
            var counts = {};
          arr.forEach(function (val,index,valu) {
            counts[val] = (counts[val] || 0) + 1;
          });

          if(Object.keys(counts).length === 1){
              return true
          }else {
              return false;
          }

          console.log(counts)
        }

        function  getElementByIdApi(idName) {
           return document.getElementById(idName);
        }

    }
})