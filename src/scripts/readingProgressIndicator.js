"use strict";
var getScrollPosition = function () {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
};
var getDocumentHeight = function () {
    return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
};
var progressBar = document.getElementById('reading-progress');
if (progressBar) {
    var windowHeight_1 = window.innerHeight || 0;
    var documentHeight_1 = getDocumentHeight();
    var maximumHeight_1 = documentHeight_1 - windowHeight_1;
    progressBar.setAttribute('max', maximumHeight_1.toString());
    document.addEventListener('scroll', function () {
        var scrollPosition = getScrollPosition();
        progressBar.setAttribute('value', scrollPosition.toString());
    });
    window.addEventListener('resize', function () {
        windowHeight_1 = window.innerHeight || 0;
        documentHeight_1 = getDocumentHeight();
        maximumHeight_1 = documentHeight_1 - windowHeight_1;
        progressBar.setAttribute('max', maximumHeight_1.toString());
        var scrollPosition = getScrollPosition();
        progressBar.setAttribute('value', scrollPosition.toString());
    });
}
//# sourceMappingURL=readingProgressIndicator.js.map