/* global data */
/* exported data */
var $form = document.querySelector('form');
var $img = document.querySelector('img');

$form.addEventListener('input', function (event) {
  if (event.target.matches('.photo-url')) {
    $img.setAttribute('src', event.target.value);
  }
});
