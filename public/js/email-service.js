$(document).ready(function () {

    $('#contact-form').on('submit', function (e) {

        e.preventDefault();

        var data = {
            subject: $('#subject').val(),
            from: $('#from').val(),
            text: $('#text').val()

        }
        console.log(data);

        $.post("/sendmail", data, function () {

            var alertEmail = $("<div></div>").text("Form submitted Successfully").addClass('alert alert-success');
            $('.contact-div').append(alertEmail);

            $('#subject').val('');
            $('#from').val('');
            $('#text').val('');

        });

        setTimeout(function () {
            $('.alert-success').hide();
        }, 10000);
    });

    $('#subscribe-form').on('submit', function (e) {

        e.preventDefault();
        var data = { email: $('#email').val() };

        $.post("/subscribemail", data, function () {

            var alertEmail = $("<div></div>").text("Successfully subscribe").addClass('alert alert-success');
            $('#email-form').append(alertEmail);

            $('#email').val('');
        });

        setTimeout(function () {
            $('.alert-success').hide();
        }, 10000);
    });
});