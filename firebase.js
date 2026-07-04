// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx8Bh-Xrf118qYvJHZ56wAwjZy-yWcPs0",
  authDomain: "duamate-4c05a.firebaseapp.com",
  projectId: "duamate-4c05a",
  storageBucket: "duamate-4c05a.firebasestorage.app",
  messagingSenderId: "717245050918",
  appId: "1:717245050918:web:bdf107962c9c8637a376e7",
  measurementId: "G-2W841L2PQ6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function showApp() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    const user = auth.currentUser;

    user.reload().then(() => {

        let name = user.displayName;

        if (!name) {
            name = user.email.split("@")[0];
        }

        document.getElementById("welcomeUser").innerText =
            "Welcome, " + name + " 🤍";

        document.getElementById("profileName").innerText = name;
        document.getElementById("profileEmail").innerText = user.email;

    });
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const name = email.split("@")[0]; // take name before @

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

          // set display name (IMPORTANT)
            return userCredential.user.updateProfile({
                displayName: name
            });

        })
        .then(() => {
            showApp();
            document.getElementById("msg").innerHTML = "Account created!";
        })
        .catch((error) => {
            document.getElementById("msg").innerHTML = error.message;
        });
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showApp();
            document.getElementById("msg").innerHTML = "Logged in!";
        })
        .catch((error) => {
            document.getElementById("msg").innerHTML = error.message;
        });
}
auth.onAuthStateChanged((user) => {
    if (user) {
        showApp();
    }
});
function logout() {
    auth.signOut()
        .then(() => {
            // Hide the app
            document.querySelector(".container").style.display = "none";

            // Show the login page
            document.getElementById("loginBox").style.display = "block";

            // Clear the input fields
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("msg").innerText = "";
        })
        .catch((error) => {
            alert(error.message);
        });
}
