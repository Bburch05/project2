//Need to match up to the div with the User image tag

$(document).on("change", "#profile-pic", function(event) {
  event.preventDefault();
  let cloudPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  var imgUpload = event.target.files[0];
  var formData = new FormData();
  formData.append("file", imgUpload);
  formData.append("upload_preset", cloudPreset);
  console.log(formData);
  $(document).on("click", "#btn-signup", function(event) {
    event.preventDefault();
    axios({
      url: cloudURL,
      method: "POST",
      headers: {
        baseURL: process.env.cloudURL,

        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(function(res) {
        var userPic = res.data.secure_url;
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});

$(document).on("click", "#btn-login", function(e) {
  e.preventDefault;
  var userName = $("#login-username")
    .val()
    .trim();
  var userPswd = $("#login-password")
    .val()
    .trim();

  $.get("/api/users/" + userName, function(data) {
    if (!data) {
      console.log("We looked but couldnt find anything");
    } else {
      console.log(data);
    }
  });
});

module.export = userPic;
