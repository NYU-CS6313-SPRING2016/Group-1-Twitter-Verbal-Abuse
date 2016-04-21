function updateLive() {
        var color = "odd";

        function liveStreamUpdate(data) {
            
            var parent = document.getElementById("liveList");
            var newItem = document.createElement("li");
            
            
            var spanPart1 = document.createElement("span");
            spanPart1.innerHTML = data.user;
            
            var spanPart2 = document.createElement("p");
            spanPart2.innerHTML = data.text;
            
            newItem.appendChild(spanPart1);
            newItem.appendChild(spanPart2);
            
            newItem.className = decideColor();
            newItem.style.height = "0px";
            //------------------------//            
            var $firstElement = $(parent).find('li:first');
            $(newItem).insertBefore($firstElement);
            var orginHeight = $firstElement.height();
            $(newItem).animate({
                height : orginHeight
            }, 40, function(){});
            
        }
        function decideColor() {
            if (color == "even") {
                color = "odd";
                return "odd";
            }
            else {
                color = "even";
                return "even";
            }
        }
        this.update = function() {
            setInterval(function() {
                d3.json("/Json/updateLive.json", function(err, data) {
                    liveStreamUpdate(data);
                })
            }, 500);
        }
    }