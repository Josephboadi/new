$("#add_alert").click(function () {
  var CustomerName = $("#CustomerName").val();

  var email = $("#email").val();
  var sms = $("#sms").val();
  var account_number = $("#account_number").val();
  var idMsgType = $("#idMsgType").val();
  var idFlow = $("#idFlow").val();
  var message_template = $("#message_template").val();
  var internal_alert_email = $("#internal_alert_email").val();
  var idalert_type = $("#idalert_type").val();
  var status = $("#status").on();

  var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  var phoneReg =
    /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (
    CustomerName == "" ||
    email == "" ||
    sms == "" ||
    account_number == "" ||
    idMsgType == "" ||
    idFlow == "" ||
    message_template == "" ||
    internal_alert_email == "" ||
    idalert_type == "" ||
    status == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (emailReg.test(email) == false) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Email is not valid!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (emailReg.test(internal_alert_email) == false) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Email is not valid!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (phoneReg.test(sms) == false) {
    swal({
      icon: "error",
      title: "Oops...",
      text: "Phone number is not valid!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/alert/addalert";

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
        CustomerName: CustomerName,

        email: email,

        sms: sms,

        account_number: account_number,
        idMsgType: idMsgType,
        idFlow: idFlow,
        message_template: message_template,
        internal_alert_email: internal_alert_email,
        idalert_type: idalert_type,

        status: enabledNumber,
      }),
      success: function (res) {
        $("#loader").hide();

        console.log(res);

        if (res.Status == 1) {
          $("form").trigger("reset");

          swal({
            icon: "success",

            title: "Success",

            text: res.Message,

            footer: "<a href>Why do I have this issue?</a>",
          }).then((value) => {
            window.location.replace("/alert/profiles");
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

$("#update_alert").click(function () {
  var idprofile = $("#idprofile").val();
  var CustomerName = $("#CustomerName").val();

  var email = $("#email").val();
  var sms = $("#sms").val();
  var account_number = $("#account_number").val();
  var idMsgType = $("#idMsgType").val();
  var idFlow = $("#idFlow").val();
  var message_template = $("#message_template").val();
  var internal_alert_email = $("#internal_alert_email").val();
  var idalert_type = $("#idalert_type").val();
  var status = $("#enabled1").on();

  var emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  var phoneReg =
    /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  console.log(idalert_type);
  console.log(internal_alert_email);
  console.log(status);

  if (
    CustomerName == "" ||
    email == "" ||
    sms == "" ||
    account_number == "" ||
    idMsgType == "" ||
    idFlow == "" ||
    message_template == "" ||
    internal_alert_email == "" ||
    idalert_type == "" ||
    status == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (emailReg.test(email) == false) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Email is not valid!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (emailReg.test(internal_alert_email) == false) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Email is not valid!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else if (phoneReg.test(sms) == false) {
    swal({
      icon: "error",
      title: "Oops...",
      text: "Phone number is not valid!",
      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/alert/updatealert";

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
        id: idprofile,
        CustomerName: CustomerName,

        email: email,

        sms: sms,

        account_number: account_number,
        idMsgType: idMsgType,
        idFlow: idFlow,
        message_template: message_template,
        internal_alert_email: internal_alert_email,
        idalert_type: idalert_type,

        status: enabledNumber,
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
            window.location.replace("/alert/profiles");
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

// $("#getsingle_alert").click(function () {
//   var email = $("#email").val();

//   console.log(email);

//   if (email == "") {
//     swal({
//       icon: "error",

//       title: "Oops...",

//       text: "Field cannot be empty!",

//       footer: "<a href>Why do I have this issue?</a>",
//     });
//   } else {
//     let url = "/alert/profiledetail";

//     $.ajax({
//       url: url,

//       method: "POST",

//       dataType: "json",

//       cache: false,

//       contentType: "application/json",

//       data: JSON.stringify({
//         email: email,
//       }),
//       success: function (res) {
//         $("#loader").hide();

//         // console.log(res);

//         if (res.Status == 1) {
//           window.location.replace("/alert/singlealert");
//           // $("form").trigger("reset");

//           // swal({
//           //   icon: "success",

//           //   title: "Success",

//           //   text: res.message,

//           //   footer: "<a href>Why do I have this issue?</a>",
//           // }).then((value) => {
//           //   window.location.replace("/settings/singlepath", { data: res.Data });
//           // });
//         } else {
//           swal({
//             icon: "error",

//             title: "Sorry...",

//             text: res.Message,

//             footer: "<a href>Why do I have this issue?</a>",
//           }).then((value) => {
//             console.log(value);
//           });
//         }
//       },
//       error: function (xhr, status, error) {
//         $("#loader").hide();

//         console.log(xhr);

//         if (xhr.readyState == 4) {
//           // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)

//           var err = JSON.parse(xhr.responseText);

//           $("form").trigger("reset");

//           swal({
//             icon: "error",

//             title: "Ooops...",

//             text: err.message,

//             footer: "<a href>Why do I have this issue?</a>",
//           });
//         } else if (xhr.readyState == 0) {
//           // Network error (i.e. connection refused, access denied due to CORS, etc.)

//           $("form").trigger("reset");

//           swal({
//             icon: "error",

//             title: "Ooops...",

//             text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",

//             footer: "<a href>Why do I have this issue?</a>",
//           });
//         } else {
//           // something weird is happening

//           $("form").trigger("reset");

//           swal({
//             icon: "error",

//             title: "Ooops...",

//             text: "something weird is happening",

//             footer: "<a href>Why do I have this issue?</a>",
//           });
//         }
//       },
//     });
//   }
// });
