$(window).on('load', function() {
    var $onloaders = $('[data-onload]');
    $onloaders.delay(0).animate({'opacity' : '1'}, 700);

    var $links = $('[data-link]');

    $links.each(function() {
        var $link = $(this);
        var $linkName = $(this).data('link');

        $link.addClass('linkable---');

        $link.on('click', function() {
            $onloaders.delay(0).animate({'opacity' : '0'}, 700);

            setTimeout(function() {
                window.location.href = $linkName + '.html';
            }, 700);
        });
    });
});

$(window).on('load scroll', function() {
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