const model = {}

model.currentUser = undefined
model.rooms = []
model.currentRoom = undefined
model.register = async (data) => {
    try {
        const respone = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
    }
    catch (err) {
        console.log(err)
        switch (err.code) {
            case ("auth/email-already-in-use"):
                view.setErrorMessage("email_error", "This email address is already in use by another account.")
                break;
            case ("auth/weak-password"):
                view.setErrorMessage('password_error', "Password should be at least 6 characters")
                break;
        }
    }
}
model.logIn = async (data) => {
    try {
        const respone = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        // console.log(respone)
        // if (respone && respone.user.emailVerified) {
        //     model.currentUser = {
        //         email : respone.user.email,
        //         displayName : respone.user.displayName,
        //     }
        // }
        // else {
        //     view.setErrorMessage('password_email_error', "Please verify your email")
        //}
    }
    catch (err) {
        console.log(err)
        switch (err.code) {
            case ("auth/invalid-email"):
                view.setErrorMessage('login_email_error', "This email address is not valid.")
            case ("auth/user-not-found"):
                view / setErrorMessage('login_email_error', "There is no user corresponding to the given email.")
            case ("auth/wrong-password"):
                view.setErrorMessage('password_email_error', "You have entered wrong password")

        }
    }

}
model.getRooms = async () =>{
    const response = await firebase.firestore().collection('rooms').where('users','array-contains',model.currentUser.email).get()
    model.rooms = getManyDocument(response)
    if(model.rooms.length > 0) {
        model.currentRoom = model.rooms[0]
        // view.showCurrentRoom()
        view.showRooms()
    }
}
model.listenRoomChange = () =>{
    let isFirstRun = true
    firebase.firestore().collection('rooms').where('users','array-contains',model.currentUser.email).onSnapshot((snapshot) =>{
        if(isFirstRun) {
            isFirstRun = false
            return
        }
        for(oneChange of snapshot.docChanges()){
           const docData = getOneDocument(oneChange.doc)
           if(docData.id === model.currentRoom.id){
               model.currentRoom = docData
           }
        }
    })
}
model.createRoom = (title) =>{
    const dataToCreate = {
        title,
        schedules: [],
        users: [email,model.currentUser.email]
    }
    firebase.firestore().collection('rooms').add(dataToCreate)
    view.setActiveScreen('calendarPage')
}
model.addUser = ({title,email}) =>{
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(title),
        users: firebase.firestore.FieldValue.arrayUnion(email)
    }
    firebase.firestore().collection('rooms').doc(model.currentRoom.id).update(dataToUpdate)
}