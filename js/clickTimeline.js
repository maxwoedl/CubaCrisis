let knots = document.getElementsByClassName('knotpoint');
let active;
function setActive(i){
  if(active>=0){
      knots[active].classList.remove('activeKnot');
  }
  knots[i].classList.add('activeKnot');
  active=i;
}
function eventAdd(){
  for(let i=0; i<knots.length;i++){
    knots[i].addEventListener('click',function(){setActive(i)});
  }
}


eventAdd();
