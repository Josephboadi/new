$("#update_smtp").click(function () {
  var idsettings_sms = $("#idsettings_sms").val();
  var smtpHost = $("#smtpHost").val();

  var smtpPort = $("#smtpPort").val();

  var smtpTLS = $("#smtpTLS").val();
  var smtpUser = $("#smtpUser").val();
  var smtpPass = $("#smtpPass").val();
  var smtpFrom = $("#smtpFrom").val();
  // var enabled2 = $("#enabled2").val();

  // let dgg;

  var enabled2 = $("#enabled2").on();

  // console.log(enabledNumber);
  // console.log(enabled2[0].checked);

  if (
    idsettings_sms == "" ||
    smtpHost == "" ||
    smtpPort == "" ||
    smtpTLS == "" ||
    smtpUser == "" ||
    smtpPass == "" ||
    smtpFrom == "" ||
    enabled2 == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updatenotification";

    let enabledNumber;

    if (enabled2[0].checked) {
      enabledNumber = 1;
    } else {
      enabledNumber = 0;
    }

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        id: idsettings_sms,
        smtpHost: smtpHost,
        smtpPort: smtpPort,
        smtpTLS: smtpTLS,
        smtpUser: smtpUser,
        smtpPass: smtpPass,
        smtpFrom: smtpFrom,
        enabled: enabledNumber,
      }),
      success: function (res) {
        $("#loader").hide();

        // console.log(res);

        if (res.success == 1) {
          $("form").trigger("reset");

          swal({
            icon: "success",

            title: "Success",

            text: res.message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/settings/notification");
          });
        } else {
          swal({
            icon: "error",

            title: "Sorry...",

            text: res.message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            console.log(value);
          });
        }
      },
      error: function (xhr, status, error) {
        $("#loader").hide();

        // console.log(xhr);

        if (xhr.readyState == 4) {
          // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)

          var err = JSON.parse(xhr.responseText);

          $("form").trigger("reset");

          swal({
            icon: "error",

            title: "Ooops...",

            text: err.message,

            footer: "<a href>Why do I have this issue?</a>",
          });
        } else if (xhr.readyState == 0) {
          // Network error (i.e. connection refused, access denied due to CORS, etc.)

          $("form").trigger("reset");

          swal({
            icon: "error",

            title: "Ooops...",

            text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",

            footer: "<a href>Why do I have this issue?</a>",
          });
        } else {
          // something weird is happening

          $("form").trigger("reset");

          swal({
            icon: "error",

            title: "Ooops...",

            text: "something weird is happening",

            footer: "<a href>Why do I have this issue?</a>",
          });
        }
      },
    });
  }
});
