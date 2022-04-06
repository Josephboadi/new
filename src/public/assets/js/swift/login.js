$("#login_user").click(function () {
  var username = $("#username").val();
  var password = $("#password").val();

  console.log(username, password);

  if (username == "" || password == "") {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Field cannot be empty!",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    let url = "/login";

    $.ajax({
      url: url,

      method: "POST",

      dataType: "json",

      cache: false,

      contentType: "application/json",

      data: JSON.stringify({
        username: username,
        password: password,
      }),
      success: function (res) {
        $("#loader").hide();
        console.log(res);
        window.location.replace("/dashboard");
      },
    });
  }
});
