window.onload = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyCIqQlpesEg-7-YJtMhHZpZcbOID5JQriw",
    authDomain: "family-calendar-f8041.firebaseapp.com",
    databaseURL: "https://family-calendar-f8041.firebaseio.com",
    projectId: "family-calendar-f8041",
    storageBucket: "family-calendar-f8041.appspot.com",
    messagingSenderId: "862824814519",
    appId: "1:862824814519:web:f620679e751f9aeb057a32"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      model.currentUser = {
        email: user.email,
        displayName: user.displayName
      }
      if (user.emailVerified) {   
        view.setActiveScreen('calendarPage')

      }
      else {
        firebase.auth().signOut()
        view.setErrorMessage('password_email_error', "Please verify your email")
        view.setActiveScreen("logInPage")
      }
    }
  })
  console.log(firebase.app())
  view.setActiveScreen('loginPage')
}