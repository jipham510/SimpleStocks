$(document).ready(function () {
    $('#logo').click(function () {
        const bod = $('body')
        if(bod.attr('data-theme')) {
            bod.removeAttr('data-theme');
        } else {
            bod.attr('data-theme','dark');
        }
    });
});

