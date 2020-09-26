model = {

}
model.currentUser = undefined
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
model.logOut = async () => {
    console.log('haha')
    await firebase.auth().signOut()
    view.setActiveScreen('loginPage')
}