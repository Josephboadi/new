$("#update_company").click(function () {
  // var $form = $(this);
  // console.log(new FormData($form));

  var idsettings_company = $("#idsettings_company").val();
  var comp_name = $("#comp_name").val();

  var comp_email = $("#comp_email").val();

  var address = $("#address").val();
  var comp_url = $("#comp_url").val();
  var comp_slogan = $("#comp_slogan").val();
  var comp_logo = $("#comp_logo");

  var comp_emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // console.log(comp_logo[0].files[0]);
  let logoData = comp_logo[0].files[0];

  if (
    idsettings_company == "" ||
    comp_name == "" ||
    comp_email == "" ||
    address == "" ||
    comp_url == "" ||
    comp_slogan == "" ||
    comp_logo == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (comp_emailReg.test(comp_email) == false) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Email is not valid!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updatecompany";

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        id: idsettings_company,
        comp_name: comp_name,

        comp_email: comp_email,

        address: address,

        comp_url: comp_url,

        comp_slogan: comp_slogan,
        comp_logo_name: logoData.name,
        comp_logo_type: logoData.type,
        comp_email: comp_email,
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
            window.location.replace("/settings/company");
          });
        } else {
          swal({
            icon: "error",

            title: "Sorry...",

            text: res.Message,

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
