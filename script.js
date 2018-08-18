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
var database = firebase.database();



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('authentication').style.display = 'none'; 
    document.getElementById('blog').style.display = 'block'; 
    console.log(user.email + ' is here');
    console.log(latestNotes());
    // document.getElementById('notes').innerHTML = latestNotes();
  } else {
    document.getElementById('authentication').style.display = 'block';
    document.getElementById('blog').style.display = 'none';
  }
});

function registerUser() {
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Error: ' + errorMessage);
  });
}

function login() {
  var userEmail = document.getElementById("email").value;
  var userPass  = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Error: ' + errorMessage);// ...
  });
}

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    var errorMessage = error.message;
    alert('Error: ' + errorMessage);
  });
}


function writeUserData(userId, email, note) {
  console.log('userId, email, note: ' + userId, email, note);
  database.ref('notes/' + userId).push({
    email: email,
    note: note
  });
}

function addNote() {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userId = user.uid;
    var email = user.email;
    var note = document.getElementById('newNote').value;
  }
  writeUserData(userId,email,note);
  document.getElementById('newNote').value = '';
  document.getElementById('newNote').placeholder = '...';
  }

function latestNotes() {
  let noteString = 's';
  let userId = firebase.auth().currentUser.uid;
  let readNote = firebase.database().ref('notes/' + userId);
  readNote.on('value',function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      noteString += childSnapshot.val().note + ' \n';
      });
      console.log(noteString);
  });
  return noteString
}
    
  var check = function() { setTimeout(function() {
  let userId = firebase.auth().currentUser.uid;
  var readNote = firebase.database().ref('notes/' + userId);
  readNote.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      
    console.log('123'+ childSnapshot.val().note);
    })
                      //   var rootRef = firebase.database().ref();
                      //   rootRef.once("value")
                      //   .then(function(snapshot) {
                      //   console.log('1'+snapshot.key); //
                      //   console.log('2'+ snapshot.child("notes/").key); 
                      // });
                      //   // console.log(snapshot.val().note);
                      // });
    });}, 2000);}
  