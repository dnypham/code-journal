/* global data */
/* exported data */
var $form = document.querySelector('form');
var $img = document.querySelector('img');

$form.addEventListener('input', function (event) {
  if (event.target.matches('.photo-url')) {
    $img.setAttribute('src', event.target.value);
  }
  if (event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $form.title.value,
    photoUrl: $form.photoUrl.value,
    notes: $form.notes.value
  };

  data.nextEntryId++;
  data.entries.unshift(entry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
