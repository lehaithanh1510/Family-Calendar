model = {

}
model.currentLogInUser = undefined
model.currentUser = undefined
model.rooms = [];
model.currentRoom = undefined // object chứa thông tin room
model.currentDayOfRoom = new Date() // ngày cụ thể 
model.currentEventDayOfRoom = undefined //array chứa các schedules của ngày cụ thể 
model.register = async (data) => {
    try {
        const respone = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentLogInUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentLogInUser.sendEmailVerification()
    }
    catch (err) {
        // console.log(err)
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
        //     model.currentLogInUser = {
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
model.logOut = async () => {
    // console.log('haha')
    await firebase.auth().signOut()
    view.setActiveScreen('loginPage')
}
model.getSchedules = async () => {
    const response = await firebase.firestore().collection("rooms").where("users", "array-contains", model.currentLogInUser.email).get()
    model.rooms = getManyDocument(response)
    console.log(model.rooms)
    if (model.rooms.length > 0) {
        model.currentRoom = model.rooms[0]
        console.log(model.currentRoom)
        for (let schedule of model.currentRoom.schedules) {
            console.log(schedule.time)
            schedule.time = new Date(schedule.time)
        }
        // console.log(model.currentRoom)
        model.currentEventDayOfRoom = controller.filterScheduleOfDay(new Date())
        // console.log(model.currentEventDayOfRoom)
        model.currentEventDayOfRoom = controller.sortSchedulesOfDay(model.currentEventDayOfRoom)
        console.log(model.currentEventDayOfRoom)
        view.showCurrentRoom()
    }
}
model.updateNewevent = (data) => {
    let dataToUpdate = {
        schedules: firebase.firestore.FieldValue.arrayUnion(data)
    }
    firebase.firestore().collection("rooms").doc(model.currentRoom.id).update(dataToUpdate)
}
model.listenChange = () => {
    firebase.firestore().collection('rooms').where("users", "array-contains", model.currentLogInUser.email)
        .onSnapshot((snapshot) => {
            // console.log(snapshot.docChanges())
            for (oneChange of snapshot.docChanges()) {
                const docData = getOneDocument(oneChange.doc)
                if (docData.id === model.currentRoom.id) {
                    model.currentRoom = docData
                    for (let schedule of model.currentRoom.schedules) {
                        schedule.time = new Date(schedule.time)
                    }
                    model.currentEventDayOfRoom = controller.filterScheduleOfDay(model.currentDayOfRoom)
                    model.currentEventDayOfRoom = controller.sortSchedulesOfDay(model.currentEventDayOfRoom)
                    document.querySelector('.family_list_timeline').innerHTML = ''
                    view.showCurrentRoom()
                    view.scrollToEndElement()
                }

            }
        })
}
model.deleteEvent = (schedules) => { //input is array
    console.log(schedules)
    firebase.firestore().collection('rooms').doc(model.currentRoom.id).update({
        schedules: firebase.firestore.FieldValue.delete()
    })
    for (let i = 0; i < schedules.length; i++) {
        let dataToUpdate = {
            schedules: firebase.firestore.FieldValue.arrayUnion(schedules[i])
        }
        firebase.firestore().collection("rooms").doc(model.currentRoom.id).update(dataToUpdate)
    }
    // model.getSchedules()
    // view.showCurrentRoom()
}
model.deleteAllSchedules = () => {
    firebase.firestore().collection('rooms').doc(model.currentRoom.id).update({
        schedules: firebase.firestore.FieldValue.delete()
    })
}

