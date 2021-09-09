/* global data */
/* exported data */
var $form = document.querySelector('form');
var $img = document.querySelector('img');

$form.addEventListener('focusout', function (event) {
  if (event.target.matches('.photo-url')) {
    $img.setAttribute('src', event.target.value);
  }
  if (event.target.matches('.photo-url') && event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $form.title.value,
    photoUrl: $form.photoUrl.value,
    notes: $form.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  var $entryFormView = document.querySelector('.entry-form-view');
  var $entriesView = document.querySelector('.entries-view');

  $entryFormView.classList.add('hidden');
  $entriesView.classList.remove('hidden');

  data.view = 'entries';
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'entry');

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);

  var $divColumn1 = document.createElement('div');
  $divColumn1.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumn1);

  var $img = document.createElement('img');
  $img.setAttribute('class', 'placeholder-img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'Entry image');
  $divColumn1.appendChild($img);

  var $divColumn2 = document.createElement('div');
  $divColumn2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumn2);

  var $h2 = document.createElement('h2');
  var $text1 = document.createTextNode(entry.title);
  $h2.appendChild($text1);
  $divColumn2.appendChild($h2);

  var $p = document.createElement('p');
  var $text2 = document.createTextNode(entry.notes);
  $p.appendChild($text2);
  $divColumn2.appendChild($p);

  return $li;
}

var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }

  if (data.view === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  } else if (data.view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  }
});

// View Swapping

var $entriesNav = document.querySelector('.entries');
var $newButton = document.querySelector('.new-button');
var $entryFormView = document.querySelector('.entry-form-view');
var $entriesView = document.querySelector('.entries-view');

$entriesNav.addEventListener('click', function (event) {
  $entryFormView.classList.add('hidden');
  $entriesView.classList.remove('hidden');

  data.view = 'entries';
});

$newButton.addEventListener('click', function (event) {

  $entryFormView.classList.remove('hidden');
  $entriesView.classList.add('hidden');

  data.view = 'entry-form';
});
