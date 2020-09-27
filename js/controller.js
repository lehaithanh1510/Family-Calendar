controller = {

}
controller.register = (data) => {
    if (data.firstName.trim() === "")
        view.setErrorMessage('first_name_error', 'Please enter your fisrt name')
    else
        view.setErrorMessage('first_name_error', '')
    if (data.lastName.trim() === "")
        view.setErrorMessage('last_name_error', 'Please enter your last name')
    else
        view.setErrorMessage('last_name_error', '')
    if (data.email.trim() === "")
        view.setErrorMessage('email_error', 'Please enter your email')
    else
        view.setErrorMessage('email_error', '')
    if (data.password.trim() === "")
        view.setErrorMessage('password_error', 'Please enter your password')
    else
        view.setErrorMessage('password_error', '')
    if (data.confirmPassword.trim() === "")
        view.setErrorMessage('password_confirmation_error', 'Please enter your password')
    else
        view.setErrorMessage('password_confirmation_error', '')
    if (data.firstName.trim() !== ""
        && data.lastName.trim() !== ""
        && data.email.trim() !== ""
        && data.password.trim() !== ""
        && data.confirmPassword !== ""
        && data.password === data.confirmPassword) {
        model.register(data)
    }
}
controller.logIn = (data) => {
    if (data.email.trim() === "")
        view.setErrorMessage('login_email_error', 'Please enter your email')
    else
        view.setErrorMessage('login_email_error', '')
    if (data.email.trim() === "")
        view.setErrorMessage('password_email_error', 'Please enter your password')
    else
        view.setErrorMessage('password_email_error', '')
    if (data.email.trim() !== "" && data.password.trim() !== "")
        model.logIn(data)

}
controller.createRoom = ({title, email}) =>{
    if(title.trim() === '') {
        view.setErrorMessage('create_room_title_error', 'Please input title')
    }else{
        view.setErrorMessage('create_room_title_error', '')
    }
    if(email.trim() === '') {
        view.setErrorMessage('create_room_email_error', 'Please input email')
    }else{
        view.setErrorMessage('create_room_email_error', '')
    }
    if(title.trim() !== '' && email.trim() !== ''){
        model.createRoom({title,email})
    }
}