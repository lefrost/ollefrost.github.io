$(window).on(`load`, function() {

    var $container = $('.container');
    var noOfAddTasks = 0

    /* --- Blob --- */
    var $blobs = $(`[data-blob]`);
    refreshBlobs();

    function refreshBlobs() {
        $blobs = $(`[data-blob]`);

        $blobs.each(function() {
            let $blob = $(this);
            let name = $blob.data(`blob`);
            // let nameLead = name.trim().toLowerCase().split('-')[0];
            let $blobCloser = $(`[data-blob-closer='${name}']`);

            $blob.draggable();

            $blobCloser.off(`mouseover`).on(`mouseover`, function() { // .off() --> https://stackoverflow.com/a/40216885/8919391
                type($blobCloser, 'close', { widthBase: 'text' });
            });

            $blobCloser.off(`mouseout`).on(`mouseout`, function() {
                untype($blobCloser, { widthBase: 'text', minWidth: 15 });
            });

            $blobCloser.on(`click`, function() {
                $blob.hide('slow', function() { $blob.remove(); });
                refreshBlobs();
            });
        });
    }


    /* --- Input ---- */

    var $inputs = $(`[data-input]`);
    refreshInputs();

    function refreshInputs() {
        $inputs = $(`[data-input]`);

        $inputs.each(function() {
            let $input = $(this);
            let name = $input.data(`input`);
            let nameArr = name.trim().toLowerCase().split('-');
            let nameLead = nameArr[0];
            let $inputSugs = $(`[data-input-sugs='${name}']`);

            $input.on(`mouseover`, function() {
                $input.focus();
                $input.toggleClass(`active`);
            });

            $input.on(`mouseout`, function() {
                $input.blur();
            });

            $input.on(`input`, function() {
                let cmd = $input.val();
                let minWidth = 0;

                switch (nameLead) {
                    case `add`: minWidth = 120; break;
                    case `cmd`: minWidth = 80; break;
                }

                $input.css(`width`, (cmd.length + 5 + `ch`));

                if (parseInt($input.css(`width`)) < minWidth) {
                    $input.css(`width`, (minWidth + 'px'));
                }

                $inputSugs.text(cmd.length > 0 ? `suggestions tbc` : ``);
            });

            $input.bind(`enter`, function() {
                let cmd = $input.val().toLowerCase().trim();
                $input.val(``);

                let cmdArr = cmd.split(' ');

                if (cmdArr.length > 0) {
                    let leadCmd = cmdArr[0];

                    switch (leadCmd) {
                        case 'add': box({ type: 'add' }); break;
                        default:
                            // tbc error handling
                    }
                } else {
                    // tbc error handling
                }

            });

            $input.keyup(function(e){
                var trigs = [];

                switch (e.keyCode) {
                    case 13: trigs.push(`enter`, `input`); break;
                }

                for (let trig of trigs) {
                    $input.trigger(trig);
                }
            });
        });
    }



    /* --- Box --- */

    function box(params) { // Creates a box.
        let type = params.type;

        switch (type) {
            case 'add': addBox();
        }
    }

    function addBox() {
        noOfAddTasks++;

        $container.append(
            `<div class="new---  floaty---  blob  box" data-blob="add-${noOfAddTasks}">` +
                `<div class="blob__closer  close--" data-blob-closer="add-${noOfAddTasks}"></div>` +
                `<div class="blob__mug">` +
                    `<span>add</span>` +
                `</div>` +
                `<div class="blob__section">` +
                    `<input class="blob__input" placeholder="name" type='text' data-input="add-${noOfAddTasks}">` +
                    `<input class="blob__input" placeholder="id" type='text' data-input="add-${noOfAddTasks}">` +
                `</div>` +
            `</div>`
        );

        $blob = $('.new---');
        $blob.removeClass('new---').hide().show('slow');

        refreshBlobs();
        refreshInputs();

        for (let b of $blobs) {
            console.log(b);
        }
    }



    function type($elem, msg, configs) {
        let widthBase = configs.widthBase;
        let speed = configs.speed;

        for (let i = 0; i < msg.length; i++) {
            setTimeout(function() {
                $elem.append(msg.charAt(i));

                switch (widthBase) {
                    case 'text':
                        $elem.css(`width`, ($elem.text().length + 1 + `ch`));
                        break;
                }
            }, i * (speed ? speed : 20));
        }
    }

    function untype($elem, configs) {
        let widthBase = configs.widthBase;
        let minWidth = configs.minWidth;
        let speed = configs.speed;

        for (let i = $elem.text().length - 1; i >= 0; i--) {
            setTimeout(function() {
                $elem.text($elem.text().slice(0, -1));

                switch (widthBase) {
                    case 'text':
                        $elem.css(`width`, (
                            $elem.text().length + 1 >= 2
                            ? $elem.text().length + 1 + `ch`
                            : minWidth + 'px'
                        ));
                        break;
                }
            }, i * (speed ? speed : 20));
        }
    }

});