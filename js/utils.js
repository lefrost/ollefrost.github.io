function inView($elem) {
    var elementTop = $elem.offset().top;
    var elementBottom = elementTop + $elem.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = $(window).scrollTop() + window.innerHeight;
    var quartViewport = window.innerHeight / 4;

    return elementBottom - quartViewport > viewportTop && elementTop + quartViewport < viewportBottom;
}

function getTimeStr() {
    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }

    return new Date().getHours().pad() + ':' + new Date().getMinutes().pad();
}