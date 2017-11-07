function typeWriter(text, n) {
  if (n < (text.length)) {
    $('.contract').html(text.substring(0, n+1));
    n++;
    setTimeout(function() {
      typeWriter(text, n)
    }, 20);
  }
}

$('.start').click(function(e) {
  e.stopPropagation();

  var text = $('.contract').data('text');

  typeWriter(text, 0);
});
