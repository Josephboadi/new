$("#add_smsgateway").click(function () {
  var gateway = $("#gateway").val();

  var gatewayurl = $("#gatewayurl").val();

  var gatewaykeys = $("#gatewaykeys").val();
  var gatewaypassword = $("#gatewaypassword").val();
  var balance = $("#balance").val();

  if (
    gateway == "" ||
    gatewayurl == "" ||
    gatewaykeys == "" ||
    gatewaypassword == "" ||
    balance == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/addsmsgateway";

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        gateway: gateway,

        gatewayurl: gatewayurl,

        gatewaykeys: gatewaykeys,

        gatewaypassword: gatewaypassword,
        balance: balance,
      }),
      success: function (res) {
        $("#loader").hide();

        console.log(res);

        if (res.success == 1) {
          $("form").trigger("reset");

          swal({
            icon: "success",

            title: "Success",

            text: res.message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/settings/smsgateways");
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

        console.log(xhr);

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

$("#update_smsgateway").click(function () {
  var id = $("#id").val();
  var gateway = $("#gateway").val();

  var gatewayurl = $("#gatewayurl").val();

  var gatewaykeys = $("#gatewaykeys").val();
  var gatewaypassword = $("#gatewaypassword").val();
  var balance = $("#balance").val();
  var status = $("#status").on();

  console.log(status);

  if (
    gateway == "" ||
    gatewayurl == "" ||
    gatewaykeys == "" ||
    gatewaypassword == "" ||
    balance == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updatesmsgateway";
    let enabledNumber;

    if (status[0].checked) {
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
        id: id,
        gateway: gateway,
        gatewayurl: gatewayurl,

        gatewaykeys: gatewaykeys,

        gatewaypassword: gatewaypassword,
        balance: balance,
        status: enabledNumber,
      }),
      success: function (res) {
        $("#loader").hide();

        // console.log(res);

        if (res.success == 1) {
          // window.location.replace("/settings/smsgateways");
          $("form").trigger("reset");

          swal({
            icon: "success",

            title: "Success",

            text: res.message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/settings/smsgateways");
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

        console.log(xhr);

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
