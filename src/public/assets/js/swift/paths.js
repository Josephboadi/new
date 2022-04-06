$("#add_path").click(function () {
  var src_swift_docs_path_print = $("#src_swift_docs_path_print").val();

  var src_swift_docs_path_pdf = $("#src_swift_docs_path_pdf").val();

  var src_swift_docs_path_img = $("#src_swift_docs_path_img").val();
  var src_swift_docs_path_txt = $("#src_swift_docs_path_txt").val();

  if (
    src_swift_docs_path_print == "" ||
    src_swift_docs_path_pdf == "" ||
    src_swift_docs_path_img == "" ||
    src_swift_docs_path_txt == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/addpath";

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        src_swift_docs_path_print: src_swift_docs_path_print,

        src_swift_docs_path_pdf: src_swift_docs_path_pdf,

        src_swift_docs_path_img: src_swift_docs_path_img,

        src_swift_docs_path_txt: src_swift_docs_path_txt,
      }),
      success: function (res) {
        $("#loader").hide();

        console.log(res);

        if (res.success == 1) {
          $("form").trigger("reset");

          swal({
            icon: "success",

            title: "Success",

            // text: res.message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/settings/paths");
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

$("#update_path").click(function () {
  var idsettings_paths = $("#idsettings_paths ").val();
  var src_swift_docs_path_print = $("#src_swift_docs_path_print").val();
  var src_swift_docs_path_pdf = $("#src_swift_docs_path_pdf").val();
  var src_swift_docs_path_img = $("#src_swift_docs_path_img").val();
  var src_swift_docs_path_txt = $("#src_swift_docs_path_txt").val();

  if (
    src_swift_docs_path_print == "" ||
    src_swift_docs_path_pdf == "" ||
    src_swift_docs_path_img == "" ||
    src_swift_docs_path_txt == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updatepath";

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        id: idsettings_paths,
        src_swift_docs_path_print: src_swift_docs_path_print,
        src_swift_docs_path_pdf: src_swift_docs_path_pdf,

        src_swift_docs_path_img: src_swift_docs_path_img,

        src_swift_docs_path_txt: src_swift_docs_path_txt,
      }),
      success: function (res) {
        $("#loader").hide();

        // console.log(res);

        if (res.success == 1) {
          window.location.replace("/settings/paths");
          // $("form").trigger("reset");

          // swal({
          //   icon: "success",

          //   title: "Success",

          //   text: res.message,

          //   footer: "<a href>Why do I have this issue?</a>",
          // }).then((value) => {
          //   window.location.replace("/settings/paths");
          // });
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
