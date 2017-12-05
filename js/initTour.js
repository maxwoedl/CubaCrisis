
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
    startIntroJS()
  });

}

function startIntroJS() {
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
