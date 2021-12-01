console.log("Signup helper loaded");
$(document).ready(function () {
  console.log("jquery loaded ");
  // sign up user
  $("#submit").click(function (event) {
    console.log("button pressed");
    event.preventDefault();
    var formData = document.getElementById("signupForm");
    var fd = new FormData(formData);
    var formDataObj = {};
    for (var [key, value] of fd.entries()) {
      formDataObj[key] = value;
    }

    function sendNoti(message) {
      new Noty({
        theme: "relax",
        text: message,
        type: "warning",
        layout: "topCenter",
        timeout: 4000,
      }).show();
    }


    // check if password and confirm password is same
    if (formDataObj.password !== formDataObj.conformPassword) {
      sendNoti("Entered Password and Confirm Password don't match");
      return;
    }

    // call server to create a user
    $.ajax({
      url: "/users/createUser",
      method: "POST",
      data: formDataObj,
      success: function (data, success) {
        console.log(data);
        console.log(success);
        if (success === "success") {
          if (data.userFound) {
            sendNoti(
              `User with email: ${data.email} already exist. You can try signing on Sign In page.`
            );
          } else {
            sendNoti("User created successfully");
          }
        }
      },
    });
  });
});
