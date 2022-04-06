$("#logout_user").click(function () {
  // console.log("Logout initiated");
  let url = "/logout";

  $.ajax({
    url: url,

    method: "POST",

    cache: false,

    contentType: "application/json",
    success: function (res) {
      $("#loader").hide();
      // console.log(res);
      window.location.replace("/signin");
    },
  });
});
