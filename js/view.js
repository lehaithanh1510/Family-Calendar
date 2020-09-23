view = {

}
view.setActiveScreen = (page) => {
    switch (page) {
        case "loginPage":
            document.getElementById('app').innerHTML = component.loginPage
            const logInForm = document.getElementById('login_form')
            logInForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const logInData = {
                    email: logInForm.email.value,
                    password: logInForm.password.value,
                }
                controller.logIn(logInData)
            })
            document.getElementById('register_change').addEventListener('click', () => {
                view.setActiveScreen('registerPage')
            })
            break;
        case "registerPage":
            document.getElementById('app').innerHTML = component.registerPage
            const registerForm = document.getElementById('register_form')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const registerData = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.passwordConfirm.value,
                }
                controller.register(registerData)

            })
            document.getElementById('login_change').addEventListener('click', () => {
                view.setActiveScreen('loginPage')
            })
            break;
        case "calendarPage":
            document.getElementById('app').innerHTML = component.calendarPage

        break;    


    }
}
view.setErrorMessage = (id, content) => {
    document.getElementById(id).innerText = content
}
view.renderDayOfMonth = (month) => {

}