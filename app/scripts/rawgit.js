'use strict';

var BUTTON_ID = 'rawgit-button';

// Find an HTML element corresponding to the 'Raw' button (if it exists).
// If there are multiple elements on the GitHub page, only the first will be found.
// (I don't know if there are GitHub pages with multiple 'Raw' buttons.)
// On github.com, #raw-url matches, and on gist.github.com, .raw-url matches.
var existingElement = document.querySelector('#raw-url') ||
                 document.querySelector('.raw-url') ||
                 document.querySelector('[aria-label="View the whole file"]');
// Also ensure that we don't add BUTTON_ID twice...
if (existingElement && document.getElementById(BUTTON_ID) == null) {
  var rawGitElement = createRawGitButton(existingElement);
  // Put the 'RawGit' button right before the existing 'Raw' button.
  existingElement.parentElement.insertBefore(rawGitElement, existingElement);
}

function createRawGitButton(rawElement) {
  var rawGitElement = document.createElement('a');
  // This seems to be enough to get the button to look like the standard GitHub buttons.
  rawGitElement.classList.add('minibutton');
  rawGitElement.id = BUTTON_ID;
  rawGitElement.textContent = 'RawGit';
  rawGitElement.setAttribute('aria-label', 'View on RawGit');
  rawGitElement.href = massageUrlString(rawElement.href);

  // There's some magic going on with the click handlers on GitHub buttons,
  // so opt-out of the default onclick behavior.
  rawGitElement.onclick = function(e) {
    e.preventDefault();
    window.open(rawGitElement.href, '_blank');
  };

  return rawGitElement;
}

function massageUrlString(urlString) {
  var url = new URL(urlString);

  // The URLs associated with the "Raw" button on github.com (not gist.github.com)
  // have the github.com domain and 'raw/' in the path, and they end up redirecting to
  // raw.githubusercontent.com with the 'raw/' removed. The actual URL we want has
  // the 'raw/' removed.
  if (url.host === 'github.com') {
    // This will only replace the first instance of each.
    url.pathname = url.pathname.replace('/raw/', '/');
    url.pathname = url.pathname.replace('/blob/', '/');
  }

  // The scheme (https: or http:) will be retained.
  url.host = 'rawgit.com';

  return url.href;
}
