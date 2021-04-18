function inView($elem) {
    var elementTop = $elem.offset().top;
    var elementBottom = elementTop + $elem.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = $(window).scrollTop() + window.innerHeight;
    var quartViewport = window.innerHeight / 4;

    return elementBottom - quartViewport > viewportTop && elementTop + quartViewport < viewportBottom;
}

function getTimeStr() {
    return new Date().getHours() + ':' + new Date().getMinutes();
}