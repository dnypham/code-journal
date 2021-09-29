/* global data */
/* exported data */
var $form = document.querySelector('form');
var $img = document.querySelector('img');
var $ul = document.querySelector('ul');
var $pDiv = document.querySelector('.no-entries');

// Photo URL event listener

$form.addEventListener('focusout', function (event) {
  if (event.target.matches('.photo-url')) {
    $img.setAttribute('src', event.target.value);
  }
  if (event.target.matches('.photo-url') && event.target.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

// Submit button event listener

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing !== null) {
    data.editing.title = $form.title.value;
    data.editing.photoUrl = $form.photoUrl.value;
    data.editing.notes = $form.notes.value;

    $ul.innerHTML = '';

    for (var i = 0; i < data.entries.length; i++) {
      $ul.appendChild(renderEntry(data.entries[i]));
    }

  } else {
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
  }

  $form.reset();

  $pDiv.classList.add('hidden');

  viewSwap('entries');

  reset();

});

// Function to visually create an Entry

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'entry');
  $li.setAttribute('data-entry-id', entry.entryId);

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

  var $divFlex = document.createElement('div');
  $divFlex.setAttribute('class', 'edit-flex');
  $divColumn2.appendChild($divFlex);

  var $h2 = document.createElement('h2');
  var $text1 = document.createTextNode(entry.title);
  $h2.setAttribute('class', 'font-proza');
  $h2.appendChild($text1);
  $divFlex.appendChild($h2);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen fa-2x');
  $editIcon.classList.add('edit');
  $divFlex.appendChild($editIcon);

  var $p = document.createElement('p');
  var $text2 = document.createTextNode(entry.notes);
  $p.setAttribute('class', 'font-open');
  $p.appendChild($text2);
  $divColumn2.appendChild($p);

  return $li;
}

// Loops through entries array and appends entries to page

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }

  viewSwap(data.view);

  if (data.nextEntryId > 1) {
    $pDiv.classList.add('hidden');
  }
  reset();
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

  reset();
});

$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  reset();
});

// Event Listener for editing entry

var $title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo-url');
var $notes = document.querySelector('#notes');
var $entryHeader = document.querySelector('#entry-header');

var $switchPosition = document.querySelector('#switch-position');
var $deleteModalButton = document.querySelector('.delete-modal-button');

$ul.addEventListener('click', function (event) {
  $entryHeader.textContent = 'Edit Entry';

  if (event.target.matches('i')) {
    viewSwap('entry-form');

    var $li = event.target.closest('.entry');
    var $entryId = parseInt($li.getAttribute('data-entry-id'));

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $entryId) {
        data.editing = data.entries[i];

        $title.value = data.entries[i].title;
        $photoUrl.value = data.entries[i].photoUrl;
        $notes.value = data.entries[i].notes;
      }
    }
  }
  $img.setAttribute('src', $form.photoUrl.value);

  $switchPosition.className = 'flex-space-between';
  $deleteModalButton.classList.remove('hidden');
});

// function to reset values

function reset() {
  $title.value = '';
  $photoUrl.value = '';
  $notes.value = '';
  data.editing = null;

  $entryHeader.textContent = 'New Entry';

  $switchPosition.className = 'justify-right';
  $deleteModalButton.classList.add('hidden');

  if (data.entries.length === 0) {
    $pDiv.classList.remove('hidden');
  }
}

// Delete button click event

var $deletePopUp = document.querySelector('.delete-modal-button');
var $popUpContainer = document.querySelector('.pop-up-container');

$deletePopUp.addEventListener('click', function (event) {
  $popUpContainer.classList.remove('hidden');
});

// Cancel button

var $cancelButton = document.querySelector('.cancel');

$cancelButton.addEventListener('click', function (event) {
  $popUpContainer.classList.add('hidden');
});

// Confirm button

var $confirmButton = document.querySelector('.confirm');

$confirmButton.addEventListener('click', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(data.entries.indexOf(data.entries[i]), 1);
    }
  }
  $ul.innerHTML = '';

  for (var x = 0; x < data.entries.length; x++) {
    $ul.appendChild(renderEntry(data.entries[x]));
  }
  $popUpContainer.classList.add('hidden');
  reset();
  viewSwap('entries');
});
