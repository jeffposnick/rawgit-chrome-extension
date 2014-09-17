// TODO: I need to wrap my head around how to import the massageUrlString()
// function from rawgit.js in order to test it...

(function() {
  'use strict';

  describe('Ensure the URL massaging logic', function() {
    it('handles gist.github.com URLs', function() {
      var gistUrl = 'https://gist.github.com/dummy/hash/raw/hash/dummy.html';
      var rawGitUrl = massageUrlString(gistUrl);
      expect(rawGitUrl).to.equal('https://rawgit.com/dummy/hash/raw/hash/dummy.html');
    });

    it('handles github.com URLs', function() {
      var gitHubUrl = 'https://github.com/dummy/dummy/raw/gh-pages/dummy/dummy.html';
      var rawGitUrl = massageUrlString(gitHubUrl);
      expect(rawGitUrl).to.equal('https://rawgit.com/dummy/dummy/gh-pages/dummy/dummy.html');

      done();
    });
  });
})();
