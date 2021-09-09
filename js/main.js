/* global data */
/* exported data */
var $form = document.querySelector('form');
var $img = document.querySelector('img');
var $ul = document.querySelector('ul');

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

  var newEntry = renderEntry(entry);

  $ul.prepend(newEntry);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();

  viewSwap('entries');
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

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }

  viewSwap(data.view);

  var $pDiv = document.querySelector('.no-entries');

  if (data.nextEntryId > 1) {
    $pDiv.classList.add('hidden');
  }
});

// View Swapping

var $entriesNav = document.querySelector('.entries');
var $newButton = document.querySelector('.new-button');
var $entryFormView = document.querySelector('.entry-form-view');
var $entriesView = document.querySelector('.entries-view');

function viewSwap(view) {
  if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');

    data.view = 'entry-form';
  } else if (view === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');

    data.view = 'entries';
  }
}

$entriesNav.addEventListener('click', function (event) {
  viewSwap('entries');
});

$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
