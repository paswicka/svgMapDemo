$(function(){
	var s = Snap("#map");
	var targetState = "";
	var timer = setInterval(updateTooltip, 10);
	var cursorX;
	var cursorY;
	
	document.onmousemove = function(e){
	    cursorX = e.offsetX;
	    cursorY = e.offsetY;
	}

	Snap.load("images/usaLow.svg", function (fragment) {
	    s.append(fragment);
	    var paths = s.select("path");
	    for (var i = 0; i < paths.length; i++) {
	    	//console.log(path[i]);
	    };
	    s.hover( hoverover, hoverout );
	});

	var hoverover = function(e){
		var targetId = $(e.target).parent().attr("id")
		if (targetId != "map") {
			targetState = targetId;
			$('.popover').show();
		};
	}

	var hoverout = function(e){
		var targetId = $(e.target).parent().attr("id")
		targetState = "";
		if (targetId != "map") {
			$('.popover').hide();
		};
	}

	function updateTooltip() {
		
	    var theHeight = $('.popover').height();
	  
	  if (targetState != "") {
	  	// $('.popover div').text("Showing " + targetState);
	  	$('.popover').css('left', (cursorX + 35) + 'px');
    	$('.popover').css('top', (cursorY) + 'px');
	  };
	}

	function abortTimer() { // to be called when you want to stop the timer
	  clearInterval(tid);
	}
});