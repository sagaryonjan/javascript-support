var supportHelper = function () {

    this.extend = new extend();
    this.search = new search();

    this.searchUrl = function (url, searchObj) {

        return this.search.urlGenerator(url, searchObj).run();

    };

    this.validateForm = function (handler, rules, messages) {

        return this.extend.validate(handler, rules, messages);

    };

    this.print = function (result) {

        console.log(result);
        return false;

    };

    this.ajaxPost = function (url, data) {

        return this.extend.ajax(url, data, 'POST')

    };

    this.ajaxGet = function (url, data) {

        return this.extend.ajax(url, data, 'GET')

    };

    this.redirect = function (url) {

        return  this.extend.redirect(url);

    };

};

var search = function () {

    this.url = '';
    this.extend = new extend();

    this.urlGenerator = function ( url, searchObj ) {

        var query = '';

        $.each(searchObj, function (field, value) {

            if (value !== '') {

                if (query == '') {

                    query = '?' + field + '=' + value;

                } else {

                    query = query + '&' + field + '=' + value;

                }
            }

        });

        this.url = url + query;

        return this;

    };

    this.run = function () {

       return this.extend.redirect(this.url);

    };


};



var fieldValue = function () {

    this.checkbox = function (element) {

        if (element.is(":checked")) {

            return 1;

        } else {

            return 0;

        }

    };

};


var extend = function () {

    this.urlGenerator = function (url, searchObj) {

        var query = '';

        $.each(searchObj, function (field, value) {

            if (value !== '') {

                if (query == '') {

                    query = '?' + field + '=' + value;

                } else {

                    query = query + '&' + field + '=' + value;

                }
            }

        });

        return url + query;

    };

    this.validate = function (handler, rules, messages) {

        return $("#" + handler).validate({
            errorElement: "div",
            ignore: [],
            debug: false,
            errorClass: 'help-block',
            focusInvalid: false,
            rules: rules,
            messages: messages,
            errorPlacement: function (error, element) {
                // Add the `help-block` class to the error element
                error.addClass("note-error");

                if (element.prop("type") == "radio") {
                    error.insertAfter(element.parents(".inline-group"));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".input, .select, .radio, .textarea").addClass("state-error").removeClass("has-success");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).parents(".input, .select, .radio, .textarea").addClass("has-success").removeClass("state-error");
            },
            invalidHandler: function (e, validator) {
                $(".alert-danger").show();
                if (validator.errorList.length)
                    $('#myTab1 a[href="#' + $(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
            }
        });

    };

    this.ajax = function () {

        return new Promise(function (resolve, reject) {

            $.ajax({
                url: url,
                method: method,
                data: data,
                success: function (response) {
                    resolve(response)
                },
                errors: function (response) {
                    reject(response);
                }
            });

        });

    }

    this.redirect = function (url) {

        if(url) {
            return location.href = url;
        }



    };

};

var support = new supportHelper();

var field   = new fieldValue();












