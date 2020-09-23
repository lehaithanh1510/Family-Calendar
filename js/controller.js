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