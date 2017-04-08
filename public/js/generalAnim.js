
$(".contentInside").velocity({scaleY : ["0"]}, {duration : 0});
function initial(){

	$(".contentInside2").velocity({scaleY : ["0"]}, {duration : 0});
		$(".topFifteenLayout").velocity({opacity : ["0"]}, {duration : 0});
}
function showSoal(){

}
function wordPopShow(){removeAll()

	$(".blackout").velocity({opacity : ["1","0"]}, {duration : 800, easing : "easeIn"});

	$(".wordPopBox").html("START!!").css("background-color" , "#2ECC71");
	$(".wordPopSquareC").css("background-color" , "#1BBC9B");
	$(".wordPopSquareL").css("background-color" , "#C8F7C5");
	$(".wordPopSquare").css("background-color" , "#C8F7C5");
	$(".wordPopSquareL ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopSquare ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopSquareC ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopBox ").velocity({scale : 0}, {duration : 0});
	$(".wordPop").velocity(
		{scale : ["1","0"], translateY : ["1300px","-1000px"]},
		{duration : 600, easing : "easeInOut"});
	$(".wordPopSquare").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 400, easing : "easeInOut"});
	$(".wordPopSquareL").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 600, easing : "easeInOut"});
	$(".wordPopSquarec").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 600, easing : "easeInOut"});
	$(".wordPopBox").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 700, easing : "easeInOut"});


}
function wordPopShowRed(){

	$(".blackout").velocity({opacity : ["1","0"]}, {duration : 800, easing : "easeIn"});
	$(".wordPopBox").html("TIME UP!").css("background-color" , "#2ECC71");
	$(".wordPopSquareC").css("background-color" , "#1BBC9B");
	$(".wordPopSquareL").css("background-color" , "#C8F7C5");
	$(".wordPopSquare").css("background-color" , "#C8F7C5");



	$(".wordPopSquareL ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopSquare ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopSquareC ").velocity({scale : 0,rotateZ : "45deg"}, {duration : 0});
	$(".wordPopBox ").velocity({scale : 0}, {duration : 0});
	$(".wordPop").velocity(
		{scale : ["1","0"], translateY : ["1300px","-1000px"]},
		{duration : 600, easing : "easeInOut"});
	$(".wordPopSquare").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 400, easing : "easeInOut"});
	$(".wordPopSquareL").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 600, easing : "easeInOut"});
	$(".wordPopSquarec").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 600, easing : "easeInOut"});
	$(".wordPopBox").velocity(
		{scale : ["1","0"]},
		{duration : 600, delay : 700, easing : "easeInOut"});


}
function showSoalLoadTimer(){removeAll()
//timerIconEmbed
// timer iseng
var start = new Date;
var waktu = 90;
setTimeout(function() {

	setInterval(function() {
	    $('.timerNumber').text(waktu );
				$( ".timerNumber" ).velocity({scale :["1","1.4"]},{duration : 800, easing : "easeOut"});
				$('.timerEmbedCount').velocity({ rotateZ : ["360deg", "0deg"]}, {duration : 800, easing : "easeInOut"});
			waktu--;
	}, 1000);
}, 1400);



//reset
	$(".blackout").velocity({opacity : ["0"]}, {duration : 0});
	var timeyea;
	$(".contentInside").velocity({scaleY : ["0"]}, {duration : 0});
	$(".contentInside2").velocity({scaleY : ["0"]}, {duration : 0});

	$(".wordPop").velocity({scale : ["0", "1"]},
		{duration : 400, delay : 0, easing : "easeInOut"});

	$(".mbSoal").velocity({opacity : ["0"]}, {duration : 0});

	$(".AFirst ").velocity({opacity : ["0"]}, {duration : 0});
	$(".timerFill2").velocity({scaleX : ["0"]}, {duration : 0});
	$(".ASecond ").velocity({opacity : ["0"]}, {duration : 0});
	$(".AThird ").velocity({opacity : ["0"]}, {duration : 0});
	$(".AFourth ").velocity({opacity : ["0"]}, {duration : 0});

	$(".timerWrapper").velocity({scaleX : ["1","0"],scaleY : ["1","0,5"]},{duration : 1000, easing : "easeIn"});
	$(".conboard").velocity({translateY : ["0px","1000px"]},{duration : 500, easing : "easeIn"});
	$(".contentInside").velocity({scaleY : ["1","0"]},{duration : 400, delay:1000, easing : "easeInOut"});

	timeyea = 1400;
	$('.timerFill2').velocity({ scaleX : ["1", "0"]}, {duration : 2000, delay : timeyea, easing : "easeIn"});

	//1400+5000 + 6400
	timeyea += 2000;
	$(".mbSoal").velocity({opacity : ["1","0"]},
		{duration : 400, delay : timeyea, easing : "easeIn"});
	$(".AFirst").velocity({opacity : ["1"], scale : ["1","0"]},
		{duration : 400, delay : timeyea+200, easing : "easeInOut"});

	$(".ASecond").velocity({opacity : ["1"], scale : ["1","0"]},
		{duration : 400, delay : timeyea+400, easing : "easeInOut"});

	$(".AThird").velocity({opacity : ["1"], scale : ["1","0"]},
		{duration : 400, delay : timeyea+600, easing : "easeInOut"});

	$(".AFourth").velocity({opacity : ["1"], scale : ["1","0"]},
		{duration : 400, delay : timeyea+800, easing : "easeInOut"});


	$(".timerFill2").velocity({scaleX : ["0","1"]},
		{duration : 90000, delay : 1400, easing : "linear"});

}
function wordPopCorrect(Status){removeAll()
	$(".blackout").velocity({opacity : ["1","0"]}, {duration : 800, easing : "easeIn"});
	if(Status == "correct"){

		$(".correctAnswer").html("CORRECT!!");
		$(".blackoutWrapper").velocity({opacity : 1}, {duration : 0});
	} else if(Status =="timesup"){

		$(".correctAnswer").html("TIMES UP!!");
		$(".blackoutWrapper").velocity({opacity : 0}, {duration : 0});
	}
	$(".correctLayout ").velocity({scale : 0, opacity : 0}, {duration : 0});
	$(".correctLayout").velocity(
		{scale : ["1","0"],opacity : ["1","0"]},
		{duration : 600, easing : "easeInOut"});



}
function removeAll(){
	$(".topFifteenLayout").velocity({opacity : ["0"]}, {duration : 0});
	$(".blackout").velocity({opacity : ["0"]}, {duration : 0});
	$(".correctLayout").velocity({opacity : ["0"]}, {duration : 0});
	$(".wordPop").velocity(
		{scale : ["0","1"], translateY : ["-1000px","1300px"]},
		{duration : 0, easing : "easeInOut"});

}
function removeBig(){

	$(".correctLayout").velocity({scale : ["0","1"]}, {duration :0 });
		$(".timerWrapper").velocity({scaleX : ["0","1"]},{duration : 0, easing : "easeIn"});
		$(".contentInside").velocity({scaleY : ["0","1"]},{duration : 0, easing : "easeInOut"});
}
function showScorePointRace(){removeAll();removeBig();

var colorarr = ["#81CFE0","#DB0A5B","#9A12B3","#446CB3","#E4F1FE",
"#87D37C","#E9D460","#F89406","#95A5A6",
"#81CFE0","#DB0A5B","#9A12B3","#446CB3","#E4F1FE",
"#87D37C","#E9D460","#F89406","#95A5A6",
"#81CFE0","#DB0A5B","#9A12B3","#446CB3","#E4F1FE",
"#87D37C","#E9D460","#F89406","#95A5A6",
"#81CFE0","#DB0A5B","#9A12B3","#446CB3","#E4F1FE",
"#87D37C","#E9D460","#F89406","#95A5A6"];

$(".contentInside2").velocity({translateY : ["-"+$(".contentInside").outerHeight()+"px" ,"0px"]},{duration : 0});
	$(".contentInside2").velocity({scaleY : ["0"]}, {duration : 0});
		$(".contentInside2").velocity({scaleY : ["1","0"]}, {duration : 600, easing : "easeInOut"});

			$(".scoreStick").velocity({scaleY : ["0"]}, {duration : 0});
		$( ".scoreStick" ).each(function( index ) {
				$( this ).velocity({scaleY : ["1","0"]}, {duration : 600, delay : index*50, easing : "easeInOut"})
				.find(".scoreStickBar").css("background-color", colorarr[index]);
				$( this ).find(".scoreStickT").html(index+1);
				});


		$(".scorePageNum").html("1/2");
}
function showTop15(){
	$(".blackout").velocity({opacity : ["1","0"]}, {duration : 800, easing : "easeIn"});
	$( ".scorePieceWrapper" ).velocity({scale :0},{duration : 0});
		$( ".scoreSquareT" ).velocity({scale :0},{duration : 0});
			$( ".scoreSquareR" ).velocity({rotateZ : ("0deg"),scale : ["0.6"]},{duration : 0});
	$(".topFifteenLayout").velocity({opacity : ["1","0"]}, {duration : 600, easing : "easeInOut"});
	$( ".scorePieceWrapper" ).each(function( index ) {
			$( this ).velocity({scale : ["1.4","0"]}, {duration : 600, delay : index*50, easing : "easeInOut"});
			$( this ).find(".scoreSquareR").velocity({rotateZ : ["585deg", "0deg"],scale : ["1","0.6"]},
			{duration : 1200, delay : index *50, easing : "easeInOut"});
					$( this ).find(".scoreSquareT").velocity({scale : ["1","0"]}, {duration : 600, delay : index*100, easing : "easeInOut"})
					.html(index);
	});
}
function showScoreStick(){

}

initial();
removeAll();
removeBig();

$(window).keydown(function(event){
	console.log(event.which);

	if(event.which ==49){

	} else if(event.which ==50){
		wordPopShow();
	} else if(event.which ==51){
		showSoalLoadTimer();

	} else if(event.which ==52){
		wordPopCorrect("correct");

	} else if(event.which ==53){
	wordPopCorrect("timesup");
	} else if(event.which ==54){
		showScorePointRace();
	}else if(event.which ==55){
		showTop15();
	} else if(event.which==81){
		removeAll();
	}else if(event.which==87){
		removeBig();
	}

});
