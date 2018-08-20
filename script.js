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
const authenticationUI = document.getElementById("authentication");
const mainbodyUI = document.getElementById("blog");


// Check if user is login
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    authenticationUI.style.display = "none"; 
    mainbodyUI.style.display = "block"; 
    console.log(user.email + ' is here');
    latestNotes();
  } else {
    authenticationUI.style.display = "block";
    mainbodyUI.style.display = "none";
  }
});

function registerUser() {
  let userEmail = document.getElementById("email").value;
  let userPass = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert("Error: " + errorMessage);
  });
}

function login() {
  let userEmail = document.getElementById("email").value;
  let userPass  = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Error: ' + errorMessage);// ...
  });
}

function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    let errorMessage = error.message;
    alert("Error: " + errorMessage);
  });
}

// Add data to database
function writeUserData(userId, email, note) {
  console.log('userId, email, note: ' + userId, email, note);
  database.ref("notes/" + userId).push({
    email: email,
    note: note
  });
}

function addNote() {
  let user = firebase.auth().currentUser;
  let userId = user.uid;
  let email = user.email;
  let note = document.getElementById('newNote').value;
  writeUserData(userId,email,note);
  document.getElementById("newNote").value = '';
  document.getElementById("newNote").placeholder = '';
  latestNotes();
  }

// Display data
function latestNotes() {
  let userId = firebase.auth().currentUser.uid;
  let readNote = firebase.database().ref('notes/' + userId);
  let promise = new Promise((resolve,reject) => {
    let noteString = '';
    let secondString = '';
    readNote.on('value',function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        secondString += childSnapshot.val().note;
        noteString += childSnapshot.val().note + '<br>';
      });
      resolve(noteString);
    });
  });
  promise
  .then( noteString => {
    if (noteString === '') { 
      let str = 'Нет записей';
      return str 
    }
    else {
      let str = [];
      str = noteString.split('<br>');
      str.pop();
      str.reverse();
      str = str.join('<br><br>');
      return str;
    }
  })
  .then( str => { 
    document.getElementById('notes').innerHTML = str;
  },
  error => { 
    alert(error);
  }); 
}
    