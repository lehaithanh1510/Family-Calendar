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
            model.getSchedules()
            document.querySelector('.log_out').addEventListener('click', () => {
                model.logOut();
            })
            view.renderDayOfMonth(new Date().getMonth() + 1, new Date().getFullYear())
            // click previous month
            document.querySelector(".previous_month").addEventListener("click", () => {
                document.querySelector(".days").innerHTML = ""
                controller.identifyMonthAndYearPrevious(controller.currentMonth, controller.currentYear)
            })
            // click next month
            document.querySelector(".next_month").addEventListener("click", () => {
                document.querySelector(".days").innerHTML = ""
                controller.identifyMonthAndYearFollowing(controller.currentMonth, controller.currentYear)
            })
            // click new event
            document.querySelector(".create_event").addEventListener("click", () => {
                document.querySelector(".create_event_form").style.display = 'block'
            })
            // click cancel new event
            document.querySelector(".cancel").addEventListener("click", () => {
                document.querySelector(".create_event_form").style.display = 'none'
            })
            // click create new room 
            // document.getElementById('create_room').addEventListener('click', () =>{
            //     view.setActiveScreen('createRoomPage')
            // })
            // click create new event 
            const createEventForm = document.getElementById("create_event_form")
            createEventForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const time = new Date()
                time.setDate(Number(createEventForm.day.value))
                time.setMonth(Number(createEventForm.month.value) - 1)
                time.setFullYear(Number(createEventForm.year.value))
                time.setHours(Number(createEventForm.hour.value))
                time.setMinutes(Number(createEventForm.minute.value))
                const newEventToUpdate = {
                    content: createEventForm.work.value,
                    time: time.toISOString(),
                    owner: model.currentUser.email,
                    creater: model.currentLogInUser.email,
                    description: createEventForm.description.value,
                    createdAt: new Date().toISOString()
                }
                controller.updateNewevent(newEventToUpdate)
                document.querySelector(".create_event_form").style.display = 'none'
            })
            model.listenChange()
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
    view.setErrorMessage("month_header",`Tháng ${new Date().getMonth() + 1},${new Date().getFullYear()}`)
    document.querySelector('.date_header').innerText = `${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`
    for (let i = 0; i <= 6; i++) {
        const rowWrapper = document.createElement('tr')
        rowWrapper.classList.add(`row_${i}`)
        document.querySelector(".days").appendChild(rowWrapper)
        for (let j = daysIdCount; j <= 6 + daysIdCount; j++) {
            const dayWrapper = document.createElement('td')
            dayWrapper.classList.add("days_of_week")
            dayWrapper.classList.add("cursor_pointer")
            if (daysId[j] === new Date().getDate() && month === new Date().getMonth() + 1) {
                dayWrapper.classList.add("today")
            }
            if (daysId[j]) {
                dayWrapper.innerText = daysId[j]
            }
            if (daysId[j] === model.currentDayOfRoom.getDate() 
            && month === model.currentDayOfRoom.getMonth() + 1
            && daysId[j] !== new Date().getDate()) {
                dayWrapper.classList.add("chosenday")
            }
            // console.log(model.currentDayOfRoom)
            // click and render different day
            dayWrapper.addEventListener('click', () => {
                date = new Date()
                date.setDate(daysId[j])
                date.setFullYear(year)
                date.setMonth(month - 1)
                console.log(date.toISOString())
                model.currentDayOfRoom = date
                document.querySelector(".family_list_timeline").innerHTML = ""
                model.currentEventDayOfRoom = controller.filterScheduleOfDay(date)
                console.log(model.currentEventDayOfRoom)
                view.showCurrentRoom()
                document.querySelector('.date_header').innerText = `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`
                document.querySelector(".days").innerHTML = ""
                view.renderDayOfMonth(date.getMonth() + 1, date.getFullYear())
            })
            document.querySelector(`.row_${i}`).appendChild(dayWrapper)
            
        }
        daysIdCount += 7
    }
    // document.querySelector(".days").appendChild()

}
view.showCurrentRoom = () => {
    let day = model.currentEventDayOfRoom || []
    for (schedule of (model.currentEventDayOfRoom || [])) {
        view.addSchedule(schedule)
    
    }
}
view.addSchedule = (schedule) => {
    // const htmlDoc = `
    // <div class="timeline_wrapper">
    //     <div class="time"> %hour%.%minute% </div>
    //     <div class="content">%content%</div>
    //     <button class="basic_btn delete_event"> <i class="fas fa-trash-alt"></i></button>
    // </div>`
    // var newHtmlDoc = htmlDoc.replace("%hour%", schedule.time.getHours())
    // newHtmlDoc = newHtmlDoc.replace("%minute%", schedule.time.getMinutes())
    // newHtmlDoc = newHtmlDoc.replace("%content%", schedule.content)
    // document.querySelector(".family_list_timeline").insertAdjacentHTML('beforeend', newHtmlDoc)
    console.log(schedule)
    const scheduleWrapper = document.createElement('div')
    scheduleWrapper.classList.add('timeline_wrapper')
    const timeWrapper = document.createElement('div')
    timeWrapper.classList.add('time')
    timeWrapper.innerText = `${schedule.time.getHours()}h${schedule.time.getMinutes()}`
    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add("content")
    contentWrapper.innerText = schedule.content
    const buttonWrapper = document.createElement('button')
    buttonWrapper.classList.add('basic_btn')
    buttonWrapper.classList.add('delete_event')
    buttonWrapper.innerHTML= `<i class="fas fa-trash-alt"></i>`
    scheduleWrapper.appendChild(timeWrapper)
    scheduleWrapper.appendChild(contentWrapper)
    scheduleWrapper.appendChild(buttonWrapper)
    document.querySelector(".family_list_timeline").appendChild(scheduleWrapper)
    //click and delete event
    scheduleWrapper.addEventListener("click",(e) => {
        console.log(schedule)
        controller.deleteSchedule(schedule)
        e.target.parentNode.parentNode.parentNode.removeChild(scheduleWrapper)

    })
 }
view.scrollToEndElement = () => {
    console.log('haha')
    const element = document.querySelector('.family_list_timeline')
    element.scrollTop = element.scrollHeight
}
