
let activeStory = -1;

let weiter = document.getElementById('next');
weiter.addEventListener('click', function(){
      setActive(activeKnot+1);
})
let zurueck = document.getElementById('prev');
zurueck.addEventListener('click', function(){
      setActive(activeKnot-1);
})


function startTour(){
  let body = document.getElementsByTagName("BODY")[0];
  body.classList.remove("preview");
  doEverything();
  $("html, body,#ccc").animate({ scrollTop: 0 }, 600, function() {
    // setTimeout(function() {startIntroJS();}, 2000);
    startIntroJS();
  });
}

function startIntroJS(){
	checkCookie();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var visited = getCookie("visited");
    if (visited == "") {
        setCookie("visited", "true", 7);
        introJs()
		    .setOption('showStepNumbers', false)
			.setOption('showBullets', false)
		    .setOption('hideNext', true)
		    .setOption('hidePrev', true)
		    .setOption('disableInteraction', true)
		    .setOption('nextLabel', 'Weiter')
		    .setOption('prevLabel', 'Zurück')
		    .setOption('skipLabel', 'Überspringen')
		    .setOption('doneLabel', 'Fertig')
		    .setOption('keyboardNavigation', true)
		    .setOption('scrollToElement', false)
		    .start();
    }    
}
