$(window).on('load', function() {
    butter.init({
        wrapperId: 'butter',
        cancelOnTouch: true,
        wrapperDamper: 0.15
      });
});

$(window).on('load scroll', function() {

    $("html, body").animate({

    });
    var $sections = $('[data-section]');

    $sections.each(function() {

        var $section = $(this);

        if (inView($section)) {
            setTimeout(function() {
                $section.addClass('visible--');
            }, 200);
        } else {
            $section.removeClass('visible--');
        }
    });
});

function inView($elem) {
    var elementTop = $elem.offset().top;
    var elementBottom = elementTop + $elem.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = $(window).scrollTop() + window.innerHeight;
    var quartViewport = window.innerHeight / 4;

    return elementBottom - quartViewport > viewportTop && elementTop + quartViewport < viewportBottom;
}

