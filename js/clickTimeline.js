var views;
    $.ajax({url: "http://www.terminate.at/staudigl/views.json", success: function(v){
          views = v;
          /*console.log(views[0].name);
          views[0].description;
          views[0].dates[0].date;
          views[0].dates[0].content;
          views[0].dates[0].facts[0];
          views[0].dates[0].facts[1];
          views[0].dates[1].date;
          views[0].dates[1].content;
          views[0].dates[1].facts[0];
          views[0].dates[1].facts[1];*/
          function createStoryPreview(){
            let container = document.getElementById('firstChoose');
            for(let i=0; i<views.length; i++){
              let story = document.createElement('div');
              story.classList.add('story');
              story.innerHTML='<figure ><img src="images/testimages/'+(i+1)+'.jpg" alt=""><figcaption>'+views[i].name+'</figcaption></figure><p>'+views[i].description+'</p>';
              container.insertBefore(story,document.getElementById('starttour'));
            }
            let stories = document.getElementsByClassName("story");
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
          }
          createStoryPreview();

    }});



      let activeKnot;
      let knots = document.getElementsByClassName('knotpoint');
      function chooseStory(){
        let dates = views[activeStory].dates;
        for(let i = 0;i<dates.length; i++){
          let date = dates[i].date;
          let id = i;
          addKnot(date,id);
        }
      }

      function addKnot(date, id){
        var knot = document.createElement('div');
        knot.setAttribute('id','knot'+id);
        knot.setAttribute('class','knot');
        knot.setAttribute('t',date);
        var knotdiv = document.createElement('div');
        knotdiv.setAttribute('class','knotdiv');
        var knotpoint = document.createElement('div');
        knotpoint.setAttribute('class','knotpoint');
        var knottext = document.createElement('div');
        knottext.setAttribute('class','knottext');
        var datetext = document.createTextNode(''+date);
        knot.appendChild(knotdiv);
        knot.appendChild(knottext);
        knotdiv.appendChild(knotpoint);
        knottext.appendChild(datetext);
        document.getElementById('customline').appendChild(knot);
      }

      function eventAdd(){
        knots = document.getElementsByClassName('knotpoint');
        for(let i=0; i<knots.length;i++){
          knots[i].addEventListener('click',function(){setActive(i)});
        }
      }
      function setActive(i){
        if(i >= 0 &&i<knots.length){
        if(activeKnot>=0){
          knots[activeKnot].classList.remove('activeKnot');
        }

        knots[i].classList.add('activeKnot');
        activeKnot=i;
        setStory(i);
      }
      }
      function setStory(id){
        console.log("dates an Stelle "+id);
          let ue = views[activeStory].dates[id].date;
          let con = views[activeStory].dates[id].content;
          addContent(ue,con);
      }
      function addContent(ue,con){
        let h = document.createElement("H1");
        let p = document.createElement("p");
        h.innerHTML = ue;
        p.innerHTML = con;
        let cc = document.getElementById('cc');
        cc.innerHTML="";
        cc.appendChild(h);
        cc.appendChild(p);
      }



    function doEverything(){
      chooseStory();
      eventAdd();
    }
/*
function addKnot(date, id){
  var knot = document.createElement('div');
  knot.setAttribute('id','knot'+id);
  knot.setAttribute('class','knot');
  knot.setAttribute('t',date);
  var knotdiv = document.createElement('div');
  knotdiv.setAttribute('class','knotdiv');
  var knotpoint = document.createElement('div');
  knotpoint.setAttribute('class','knotpoint');
  var knottext = document.createElement('div');
  knottext.setAttribute('class','knottext');
  var datetext = document.createTextNode(''+date);
  knot.appendChild(knotdiv);
  knot.appendChild(knottext);
  knotdiv.appendChild(knotpoint);
  knottext.appendChild(datetext);
  document.getElementById('customline').appendChild(knot);
}
function addContent(ue,con){
  let h = document.createElement("H1");
  let p = document.createElement("p");
  h.innerHTML = ue;
  p.innerHTML = con;
  let cc = document.getElementById('cc');
  cc.innerHTML="";
  cc.appendChild(h);
  cc.appendChild(p);
}
function chooseStory(){
var mydata = JSON.parse(test);
  for(let i = 0;i<mydata.length; i++){
    let date = mydata[i].name;
    let id = mydata[i].views[0].id;
    addKnot(date,id);
  }
}
function setStory(id){
  var mydata = JSON.parse(test);
    let ue = mydata[id].views[0].name;
    let con = mydata[id].views[0].content;
    addContent(ue,con);
}
function setActive(i){
  if(active>=0){
      knots[active].classList.remove('activeKnot');
  }
  knots[i].classList.add('activeKnot');
  active=i;
  setStory(i);
}
function eventAdd(){
  for(let i=0; i<knots.length;i++){
    knots[i].addEventListener('click',function(){setActive(i)});
  }
}

chooseStory();
eventAdd();
*/
