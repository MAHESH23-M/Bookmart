// REGISTER USER
async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      name: name,
      email: email
    }, { merge: true });

    await user.updateProfile({ displayName: name });

    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
}


// LOGIN USER
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}
