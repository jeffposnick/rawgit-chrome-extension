'use strict';

var RAWGIT_BUTTON_CLASS = 'rawgitbutton';

var matchingElements = [];
// Find all HTML elements corresponding to the 'Raw' and 'View' buttons (if they exists).
// There's no consistent way to identify them, so use a combination of selectors.
['#raw-url', '.raw-url', '[aria-label="View the whole file"]'].forEach(function(selector) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    matchingElements.push(elements[i]);
  }
});
matchingElements.forEach(function(matchingElement) {
  // Only add the button once. Due to the way GitHub uses pjax and pushHistory(),
  // it's easy to add the button multiple times, so let's explicitly check.
  if (matchingElement.parentElement.querySelector('.' + RAWGIT_BUTTON_CLASS) == null) {
    var rawGitElement = createRawGitButton(matchingElement);
    // Put the 'RawGit' button right before the existing 'Raw' button.
    matchingElement.parentElement.insertBefore(rawGitElement, matchingElement);
  }
});

function createRawGitButton(matchingElement) {
  var rawGitElement = document.createElement('a');
  // This seems to be enough to get the button to look like the standard GitHub buttons.
  rawGitElement.classList.add('minibutton');
  rawGitElement.classList.add(RAWGIT_BUTTON_CLASS);
  rawGitElement.textContent = 'RawGit';
  rawGitElement.setAttribute('aria-label', 'View on RawGit');
  rawGitElement.href = massageUrlString(matchingElement.href);

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
