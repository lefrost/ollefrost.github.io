$("#top").hover(function() {

	$("#top-background").css({"opacity": "1"});
  $("#middle-background").css({"opacity": "0"});
  $("#bottom-background").css({"opacity": "0"});

  $("#top").css({"height": "60%", "opacity": "1"});
	$("#top .link").css({"font-size": "30px"});
  $("#middle").css({"height": "30%", "opacity": "0.5"});
  $("#middle #name").css({"font-size": "15px"});
  $("#bottom").css({"height": "10%", "opacity": "0"});
  $("#bottom .link").css({"font-size": "5px"});
  
  $("a").css({"color": "#f2bde5"});
  
}, function() {

	$("#top-background").css({"opacity": "`0`"});
  $("#middle-background").css({"opacity": "1"});
  $("#bottom-background").css({"opacity": "0"});

  $("#top").css({"height": "30%", "opacity": "0.5"});
	$("#top .link").css({"font-size": "15px"});
  $("#middle").css({"height": "40%", "opacity": "1"});
  $("#middle #name").css({"font-size": "70px"});
  $("#bottom").css({"height": "30%", "opacity": "0.5"});
  $("#bottom .link").css({"font-size": "15px"});
  
  $("a").css({"color": "#ebecf5"});
  
});

$("middle").hover(function() {

	$("#top-background").css({"opacity": "0"});
  $("#middle-background").css({"opacity": "1"});
  $("#bottom-background").css({"opacity": "0"});

});

$("#bottom").hover(function() {

	$("#top-background").css({"opacity": "0"});
  $("#middle-background").css({"opacity": "0"});
  $("#bottom-background").css({"opacity": "1"});

  $("#bottom").css({"height": "60%", "opacity": "1"});
	$("#bottom .link").css({"font-size": "30px"});
  $("#middle").css({"height": "30%", "opacity": "0.5"});
  $("#middle #name").css({"font-size": "15px"});
  $("#top").css({"height": "10%", "opacity": "0"});
  $("#top .link").css({"font-size": "5px"});
  
  $("a").css({"color": "#f5e0c1"});
  
}, function() {

	$("#top-background").css({"opacity": "0"});
  $("#middle-background").css({"opacity": "1"});
  $("#bottom-background").css({"opacity": "0"});

  $("#bottom").css({"height": "30%", "opacity": "0.5"});
	$("#bottom .link").css({"font-size": "15px"});
  $("#middle").css({"height": "40%", "opacity": "1"});
  $("#middle #name").css({"font-size": "70px"});
  $("#top").css({"height": "30%", "opacity": "0.5"});
  $("#top .link").css({"font-size": "15px"});
  
  $("a").css({"color": "#ebecf5"});
  
});
