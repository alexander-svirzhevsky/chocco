; (function () {
    const validateForm = (form, fieldsArray) => {
        fieldsArray.forEach((field) => {
            field.removeClass('input-error');
            if (field.val().trim() === "") {
                field.addClass('input-error');
            }
        })

        const errorField = form.find('.input-error');

        return errorField.length === 0;
    }


    $('.form').submit(e => {
        e.preventDefault();

        const form = $(e.currentTarget);
        const name = form.find('[name="name"]');
        const phone = form.find('[name="phone"]');
        const comment = form.find('[name="comment"]');
        const to = form.find('[name="to"]');

        const modal = $('#modal');
        const content = modal.find('.modal__content');

        content.removeClass('error-modal');

        const isValid = validateForm(form, [name, phone, comment, to]);

        if (isValid) {
            $.ajax({
                url: 'https://webdev-api.loftschool.com/sendmail',
                method: 'post',
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val(),
                    to: to.val()
                },
                success: (data) => {
                    content.text(data.message)
                    // console.log(data);
                    $.fancybox.open({
                        src: "#modal",
                        type: "inline"
                    })
                },
                error: data => {
                    const message = data.responseJSON.message;
                    content.text(message);
                    content.addClass('error-modal');

                    $.fancybox.open({
                        src: "#modal",
                        type: "inline"
                    })
                }

            });
        }



    });

    $('.js-close-modal').click(e => {
        e.preventDefault();

        $.fancybox.close();
    });
})()


