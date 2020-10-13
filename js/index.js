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
    console.log('haha')
    console.log(user)
    if (user) {
      model.currentLogInUser = {
        email: user.email,
        title: user.displayName
      }
      model.currentUser = {
        email: user.email,
      }
      if (user.emailVerified) {   
        view.setActiveScreen('calendarPage')
      }
      else {
        alert("Please verify your email")
        firebase.auth().signOut()
        view.setActiveScreen("loginPage")
      }
    }
    else {
      view.setActiveScreen("loginPage")
    }
  })
}
const getManyDocument = (response) => {
  const listData = []
  for (const doc of response.docs) {
      listData.push(getOneDocument(doc))
  }
  return listData
}
const getOneDocument = (response) => {
  const data = response.data()
  data.id = response.id
  return data
}
console.log(new Date())
