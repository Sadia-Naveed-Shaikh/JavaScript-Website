      
class signin {
  constructor(email,password) {
      email: email;
      password: password;
  }

  validate() {
    alert("signin");
      var email = email;
    var password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    var user = JSON.parse(localStorage.getItem("users"));
    // console.log(user.password);
      for (var i = 0; i < user.length; i++){
                if(user[i].email==email && user[i].password==password){
                    alert("User Already Exist");
                }
              
            }
    id = user.id;
    if (password == user.password && email == user.email) {
      // alert("Login successfully");
    //   const obj = {
    //     userdata: [
    //       "id:user.id",
    //       "browserVersion : navigator.appVersion",
    //       "browserAgent : navigator.userAgent",
    //       "browserName : navigator.appName",
    //       "fullVersion : '' + parseFloat(navigator.appVersion)",
    //       "majorVersion : parseInt(navigator.appVersion, 10)",
    //       "browserPlatform : navigator.platform",
    //       "browserEngine: navigator.product",
    //       "locationHostname : window.location.hostname",
    //       "locationProtocol : window.location.protocol",
    //     ],
      };
      // const myJSON = JSON.stringify(obj);
      // console.log(myJSON);
      // alert(myJSON);

      // localStorage.setItem('User', JSON.stringify(obj));
      // localStorage.setItem("name", username);
      // localStorage.setItem("LoginTime", Date());
      // document.getElementById("demo").innerHTML = localStorage.getItem("name") + localStorage.getItem("LoginTime");
      // window.location = "success.html"; // Redirecting to other page.
      // return false;
    } else {
      alert("error");
    }
  }
}
      