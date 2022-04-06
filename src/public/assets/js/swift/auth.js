$("#update_oauth").click(function () {
  var idsettings_auth_oauth = $("#idsettings_auth_oauth").val();
  var oauth_url = $("#oauth_url").val();

  var oauth_api_key = $("#oauth_api_key").val();

  var oauth_api_secret = $("#oauth_api_secret").val();
  var oauth_redirect_url = $("#oauth_redirect_url").val();
  //   var enabled = $("#enabled").val();
  var enabled = $("#enabled").on();

  //   console.log(enabled);

  if (
    idsettings_auth_oauth == "" ||
    oauth_url == "" ||
    oauth_api_key == "" ||
    oauth_api_secret == "" ||
    oauth_redirect_url == "" ||
    enabled == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updateoauth";
    let enabledNumber;

    if (enabled[0].checked) {
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
        id: idsettings_auth_oauth,
        url: oauth_url,
        apikey: oauth_api_key,
        secret: oauth_api_secret,
        redirect_uri: oauth_redirect_url,
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
            window.location.replace("/settings/auth");
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

$("#update_ldap").click(function () {
  var idsettings_auth_LDAP = $("#idsettings_auth_LDAP").val();
  var ldap_user = $("#ldap_user").val();

  var ldap_url = $("#ldap_url").val();

  var ldap_password = $("#ldap_password").val();
  var ldap_domain = $("#ldap_domain").val();
  //   var enabled = $("#enabled1").val();
  var enabled = $("#enabled1").on();

  //   console.log(enabled);

  if (
    idsettings_auth_LDAP == "" ||
    ldap_url == "" ||
    ldap_user == "" ||
    ldap_password == "" ||
    ldap_domain == "" ||
    enabled == ""
  ) {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/settings/updateldap";
    let enabledNumber;

    if (enabled[0].checked) {
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
        id: idsettings_auth_LDAP,
        ldap_url: ldap_url,
        ldap_user: ldap_user,
        ldap_password: ldap_password,
        ldap_domain: ldap_domain,
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
            window.location.replace("/settings/auth");
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
