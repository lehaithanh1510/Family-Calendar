model = {

}
model.baseColor = ["xanhthienthanh", "FF0000", "FA28FF", "A4DD00", "AB149E", "A1887F", "FFEB3B", "FF5722"]
model.currentAvailableColor = ["xanhthienthanh", "FF0000", "FA28FF", "A4DD00", "AB149E", "A1887F", "FFEB3B", "FF5722"]
model.currentLogInUser = undefined // Người đang đăng nhập
model.currentUser = undefined // Nguời đang hiển thị lịch
model.rooms = [];
model.currentRoom = undefined // object chứa thông tin room
model.currentDayOfRoom = new Date() // ngày cụ thể 
model.currentEventDayOfRoom = [] //array chứa các schedules của ngày cụ thể
model.currentEventDayAndUserOfRoom = [] //array chứa các schedules của ngày và người cụ thể  
model.register = async (data) => {
    try {
        const respone = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        firebase.auth().currentUser.updateProfile({
            displayName: data.firstName + ' ' + data.lastName
        })
        firebase.auth().currentUser.sendEmailVerification()
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
model.getAndShowSchedulesAndRooms = async () => {
    const response = await firebase.firestore().collection("rooms").where("userEmail", "array-contains", model.currentLogInUser.email).get()
    model.rooms = getManyDocument(response)
    console.log(model.rooms)
    // if (model.rooms.length === 0) {
    //     model.createRoom("Your private schedule", {
    //         ...model.currentLogInUser,
    //         color : "FFFFFF",
    //     })
    //     model.getAndShowSchedulesAndRooms()
    // }
    for (let i = 0; i < model.rooms.length; i++) {
        for (schedule of (model.rooms[i].schedules || [])) {
            schedule.time = new Date(schedule.time)
        }
    }
    if (model.rooms.length > 0) {
        model.currentRoom = model.rooms[0]
        console.log(model.currentRoom)
        // for (let schedule of model.currentRoom.schedules) {
        //     console.log(schedule.time)
        //     schedule.time = new Date(schedule.time)
        // }
        // console.log(model.currentRoom)
        model.currentAvailableColor =controller.findCurrentAvailableColor(model.currentRoom)
        model.currentEventDayOfRoom = controller.filterScheduleOfDay(new Date(), model.currentRoom)
        model.currentEventDayAndUserOfRoom = controller.filterScheduleOfPerson(model.currentEventDayOfRoom)
        model.currentEventDayAndUserOfRoom = controller.sortSchedulesOfDay(model.currentEventDayAndUserOfRoom)
        console.log(model.currentEventDayAndUserOfRoom)
        view.showCurrentSchedules()
        view.showCurrentUsersOfRoom()
    }
    view.showRooms()
}
model.updateNewevent = (data) => {
    let dataToUpdate = {
        schedules: firebase.firestore.FieldValue.arrayUnion(data)
    }
    firebase.firestore().collection("rooms").doc(model.currentRoom.id).update(dataToUpdate)
}
model.listenChange = () => {
    firebase.firestore().collection('rooms').where("userEmail", "array-contains", model.currentLogInUser.email)
        .onSnapshot((snapshot) => {
            console.log(snapshot.docChanges())
            for (oneChange of snapshot.docChanges()) {
                const docData = getOneDocument(oneChange.doc)
                if (oneChange.type === 'modified') {
                    if (docData.id === model.currentRoom.id) {
                        for (let i = 0; i < model.rooms.length; i++) {
                            if (model.rooms[i].id === docData.id) {
                                model.rooms[i] = docData
                            }
                        }
                        model.currentRoom = docData
                        for (let schedule of model.currentRoom.schedules) {
                            schedule.time = new Date(schedule.time)
                        }
                        model.currentEventDayOfRoom = controller.filterScheduleOfDay(model.currentDayOfRoom,model.currentRoom)
                        model.currentEventDayAndUserOfRoom = controller.filterScheduleOfPerson(model.currentEventDayOfRoom)
                        view.showCurrentSchedules()
                        view.showCurrentUsersOfRoom()
                    }
                }
                if (oneChange.type === 'added') {
                    model.currentRoom = docData
                    model.rooms.push(docData)
                    console.log(model.rooms)
                    view.addRoom(docData)
                    view.showCurrentSchedules()
                    view.showCurrentUsersOfRoom()
                }
            }
            view.showRooms()
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
    // view.showCurrentSchedules()
}
model.deleteAllSchedules = () => {
    firebase.firestore().collection('rooms').doc(model.currentRoom.id).update({
        schedules: firebase.firestore.FieldValue.delete()
    })
}
model.createRoom = (title, userData) => {
    const dataToCreate = {
        title,
        schedules: [],
        users: [userData],
        userEmail: [model.currentLogInUser.email],
    }
    console.log(dataToCreate)
    firebase.firestore().collection('rooms').add(dataToCreate)
}
model.addUser = (dataUser) => {
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(dataUser),
        userEmail: firebase.firestore.FieldValue.arrayUnion(dataUser.email)
    }
    firebase.firestore().collection('rooms').doc(model.currentRoom.id).update(dataToUpdate)
}


