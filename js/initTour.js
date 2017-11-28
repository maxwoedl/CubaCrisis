let stories = document.getElementsByClassName("story");
let activeStory = -1;
for(let i = 0; i<stories.length;i++){
  stories[i].addEventListener("click",function(){
    if(activeStory!=-1){
          stories[activeStory].classList.remove("special");
    }
    stories[i].classList.add("special");
    activeStory = i;
    console.log(activeStory);
  })
}

function startTour(){
  let body = document.getElementsByTagName("BODY")[0];
  body.classList.remove("preview");
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
