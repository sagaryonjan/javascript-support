var supportHelper = function () {
    this.extend = new extend, this.search = new search, this.searchUrl = function (e, t) {
        return this.search.urlGenerator(e, t).run()
    }, this.validateForm = function (e, t, r) {
        return this.extend.validate(e, t, r)
    }, this.print = function (e) {
        return console.log(e), !1
    }, this.ajaxPost = function (e, t) {
        return this.extend.ajax(e, t, "POST")
    }, this.ajaxGet = function (e, t) {
        return this.extend.ajax(e, t, "GET")
    }, this.redirect = function (e) {
        return this.extend.redirect(e)
    }
}, search = function () {
    this.url = "", this.extend = new extend, this.urlGenerator = function (e, t) {
        var r = "";
        return $.each(t, function (e, t) {
            "" !== t && (r = "" == r ? "?" + e + "=" + t : r + "&" + e + "=" + t)
        }), this.url = e + r, this
    }, this.run = function () {
        return this.extend.redirect(this.url)
    }
}, fieldValue = function () {
    this.checkbox = function (e) {
        return e.is(":checked") ? 1 : 0
    }
}, extend = function () {
    this.urlGenerator = function (e, t) {
        var r = "";
        return $.each(t, function (e, t) {
            "" !== t && (r = "" == r ? "?" + e + "=" + t : r + "&" + e + "=" + t)
        }), e + r
    }, this.validate = function (e, t, r) {
        return $("#" + e).validate({
            errorElement: "div",
            ignore: [],
            debug: !1,
            errorClass: "help-block",
            focusInvalid: !1,
            rules: t,
            messages: r,
            errorPlacement: function (e, t) {
                e.addClass("note-error"), "radio" == t.prop("type") ? e.insertAfter(t.parents(".inline-group")) : e.insertAfter(t)
            },
            highlight: function (e, t, r) {
                $(e).parents(".input, .select, .radio, .textarea").addClass("state-error").removeClass("has-success")
            },
            unhighlight: function (e, t, r) {
                $(e).parents(".input, .select, .radio, .textarea").addClass("has-success").removeClass("state-error")
            },
            invalidHandler: function (e, t) {
                $(".alert-danger").show(), t.errorList.length && $('#myTab1 a[href="#' + $(t.errorList[0].element).closest(".tab-pane").attr("id") + '"]').tab("show")
            }
        })
    }, this.ajax = function () {
        return new Promise(function (e, t) {
            $.ajax({
                url: url, method: method, data: data, success: function (t) {
                    e(t)
                }, errors: function (e) {
                    t(e)
                }
            })
        })
    }, this.redirect = function (e) {
        if (e) return location.href = e
    }
}, support = new supportHelper, field = new fieldValue;