function barChartUpdate(){
    var setup = function (targetID, times, rawHeight) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 220 - margin.left - margin.right,
            height = rawHeight - margin.top - margin.bottom,
            categoryIndent = 4*15 + 5,
            defaultBarWidth = 2000;
        var x = d3.scale.linear()
                .domain([0, defaultBarWidth])
                .range([0, width]);
        var y = d3.scale.ordinal()
                .rangeRoundBands([0, height * times], 0.1, 0);

        //Create SVG element
        d3.select(targetID).selectAll("svg").remove()
        var svg = d3.select(targetID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height * times)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," +       margin.top + ")");
        var settings = {
            margin:margin, width:width, height:height, categoryIndent:categoryIndent,
            svg:svg, x:x, y:y
        }
        return settings;
    };
    var renderChart = function(settings, newData) {
        var margin = settings.margin, width = settings.width, height = settings.height, categoryIndent = settings.categoryIndent, svg = settings.svg, x = settings.x, y = settings.y;
        y.domain(newData.sort(function(a, b) {
            return b.value - a.value;
        }).map(function(data) {
            return data.key;
        }));
        var barMax = d3.max(newData, function(e) {
            return e.value;
        });
        x.domain([0, barMax]);

        /////////
        //ENTER//
        /////////
        
        
        var chartRow = svg.selectAll("g.chartRow")
        .data(newData, function(ele) { return ele.key;});
        
        var newRow = chartRow
                .enter()
                .append("g")
                .attr("class", "chartRow")
                .attr("transform", "translate(0," + height + margin.top + margin.bottom + ")");
        
        newRow.insert("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("opacity", 0)
        .attr("height", y.rangeBand())
        .attr("width", function(d) { return x(d.value);});
        //Add value Label
        newRow.append("text")
        .attr("class","label")
        .attr("y", y.rangeBand()/2)
        .attr("x",0)
        .attr("opacity",0)
        .attr("dy",".35em")
        .attr("dx","0.5em")
        .text(function(d){return d.value;}); 
        
        //Add Headlines
        newRow.append("text")
        .attr("class","category")
        .attr("text-overflow","ellipsis")
        .attr("y", y.rangeBand()/2)
        .attr("x",categoryIndent)
        .attr("opacity",0)
        .attr("dy",".35em")
        .attr("dx","0.5em")
        .text(function(d){return d.key});
        
        //////////
        //UPDATE//
        //////////
        
        
        //Update bar widths
        chartRow.select(".bar").transition()
        .duration(100)
        .attr("width", function(d) { return x(d.value);})
        .attr("opacity",1);

        //Update data labels
        chartRow.select(".label").transition()
        .duration(100)
        .attr("opacity",1)
        .tween("text", function(d) { 
        var i = d3.interpolate(+this.textContent.replace(/\,/g,''), +d.value);
        return function(t) {
          this.textContent = Math.round(i(t));
        };
        });

        //Fade in categories
        chartRow.select(".category").transition()
        .duration(100)
        .attr("opacity",1);
        
        ////////
        //EXIT//
        ////////

        //Fade out and remove exit elements
        chartRow.exit().transition()
        .style("opacity","0")
        .attr("transform", "translate(0," + (height + margin.top + margin.bottom) + ")")
        .remove();

        
	////////////////
	//REORDER ROWS//
	////////////////

	var delay = function(d, i) { return i * 30; };

	chartRow.transition()
		.delay(delay)
		.duration(400)
		.attr("transform", function(d){ return "translate(0," + y(d.key) + ")"; });

    };
    
    var pullData = function(settings,callback, number){
        d3.json("/Json/badwords.json", function (err, data){
            if (err) return console.warn(err);

            var newData = data;

            newData = formatData(newData, number);

            callback(settings,newData);
        })
    }    
    //Sort data in descending order and take the top 10 values
    var formatData = function(data, number){
        return data.sort(function (a, b) {
            return b.value - a.value;
          })
        .slice(0, number);
          
    }
    this.start = function(ID, number, times, height) {
        var redraw = function(settings){
            pullData(settings,renderChart, number);
        }
        //setup (includes first draw)
        var settings = setup(ID, times, height);
        redraw(settings)
        //Repeat every 1.5 seconds
        setInterval(function(){
            redraw(settings)
        }, 1500);    
    }
}