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
            document.querySelector('.log_out').addEventListener('click', () => {
                model.logOut();
            })
            view.renderDayOfMonth(new Date().getMonth()+1, new Date().getFullYear())
            document.querySelector(".previous_month").addEventListener("click", () => {
                document.querySelector(".days").innerHTML = ""
                controller.identifyMonthAndYearPrevious(controller.currentMonth,controller.currentYear)
            })
            document.querySelector(".next_month").addEventListener("click", () => {
                document.querySelector(".days").innerHTML = ""
                controller.identifyMonthAndYearFollowing(controller.currentMonth,controller.currentYear)
            })
            document.querySelector(".create_event").addEventListener("click",() => {
                document.querySelector(".create_event_form").style.display ='block'
            })
            document.querySelector(".cancel").addEventListener("click",() => {
                document.querySelector(".create_event_form").style.display ='none'
            })

            break;


    }
}
view.setErrorMessage = (id, content) => {
    document.getElementById(id).innerText = content
}
view.renderDayOfMonth = (month, year) => {
    const daysId = controller.createDayArray(month, year)
    // console.log(daysId)
    let daysIdCount = 0;
    for (let i = 0; i <= 6; i++) {
        const rowWrapper = document.createElement('tr')
        rowWrapper.classList.add(`row_${i}`)
        document.querySelector(".days").appendChild(rowWrapper)
        for (let j = daysIdCount; j <= 6 + daysIdCount; j++) {
            const dayWrapper = document.createElement('td')
            dayWrapper.classList.add("days_of_week")
            dayWrapper.classList.add("cursor_pointer")
            if (daysId[j] === new Date().getDate() && month === new Date().getMonth()+1) {
                dayWrapper.classList.add("today")

            }
            if (daysId[j]) {
                dayWrapper.innerText = daysId[j]
            }
            document.querySelector(`.row_${i}`).appendChild(dayWrapper)
        }
        daysIdCount+=7
    }
    const addWrapper = document.createElement('tr')
    // document.querySelector(".days").appendChild()

}