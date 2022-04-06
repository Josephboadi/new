$("#msg_selected").click(function () {
  var msg = $("#msgType").val();

  console.log(msg);

  if (msg == "0") {
    swal({
      icon: "error",

      title: "Oops...",

      text: "Select a msg type",

      footer: "<a href>Why do I have this issue?</a>",
    });
  } else {
    window.location.replace(`/swift/showmessage/${msg}`);
  }
});
