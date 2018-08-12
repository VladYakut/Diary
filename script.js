var config = {
  apiKey: "AIzaSyBqwfR_MrBfEl4CBun8UqsrfwrVscdPsl0",
  authDomain: "myfirstchatvol1.firebaseapp.com",
  databaseURL: "https://myfirstchatvol1.firebaseio.com",
  projectId: "myfirstchatvol1",
  storageBucket: "",
  messagingSenderId: "272878410191"
};
firebase.initializeApp(config);
// fetch('https://5b3b45b7e7659e0014969488.mockapi.io/api/db/users')
//     .then(data => data.json())
//     .then(data => console.log(data));

function login() {
  var userEmail = document.getElementById("email").value;
  var userPass  = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Error: ' + errorMessage);// ...
  });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('main').style.display = 'none';
    document.getElementById('logged').style.display = 'block';
  } else {
    document.getElementById('main').style.display = 'block';
    document.getElementById('logged').style.display = 'none';
  }
});

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    var errorMessage = error.message;
    alert('Error: ' + errorMessage);
  });
}