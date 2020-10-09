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
            model.getAndShowSchedulesAndRooms()
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
            // click to render new event form
            document.querySelector(".create_event").addEventListener("click", () => {
                document.querySelector(".create_event_form").style.display = 'block'
            })
            // click cancel new event form
            document.querySelector(".cancel_event").addEventListener("click", () => {
                document.querySelector(".create_event_form").style.display = 'none'
            })
            // click to render new room form  
            document.querySelector('.create_new_room').addEventListener('click', () => {
                document.querySelector(".create_room_form").style.display = 'block'
            })
            // click to cancel new room form
            document.querySelector(".cancel_room").addEventListener("click", () => {
                document.querySelector(".create_room_form").style.display = 'none'
            })
            //click to render add user form 
            document.querySelector(".add_user").addEventListener("click", () => {
                document.querySelector(".add_user_form").style.display = 'block'
            })
            //click to cancel add user form 
            document.querySelector(".cancel_add_user").addEventListener("click", () => {
                document.querySelector(".add_user_form").style.display = 'none'
            })
            // click create new event 
            const createEventForm = document.getElementById("create_event_form")
            createEventForm.addEventListener('submit', (e) => {
                e.preventDefault()
                // get event's data
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
            //click create new room 
            const createRoomForm = document.getElementById("create_room_form")
            createRoomForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const roomTitle = createRoomForm.roomTitle.value
                const dataUser = {
                    email: model.currentLogInUser.email,
                    title: createRoomForm.myTitle.value,
                    color: model.currentAvailableColor[0]
                }
                model.currentAvailableColor = model.baseColor
                model.currentAvailableColor.splice(0, 1)
                controller.createRoom(roomTitle, dataUser)
                document.querySelector(".create_room_form").style.display = 'none'

            })
            // click to add user 
            const addUserForm = document.getElementById('add_user_form')
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const colorIndex = Math.random() * (model.currentAvailableColor.length)
                const dataUser = {
                    title: addUserForm.title.value,
                    email: addUserForm.email.value,
                    color: model.currentAvailableColor[parseInt(colorIndex)]
                }
                model.currentAvailableColor.splice(colorIndex, 1)
                console.log(model.currentAvailableColor)
                document.querySelector(".add_user_form").style.display = 'none'
                controller.addUser(dataUser)
            })
            document.querySelector(".add_user_form").style.display = 'none'


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
    view.setErrorMessage("month_header", `Tháng ${new Date().getMonth() + 1},${new Date().getFullYear()}`)
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
                dayWrapper.classList.add("chosenday")
                dayWrapper.classList.add("today")
            }
            if (daysId[j]) {
                dayWrapper.innerText = daysId[j]
            }
            // click and render different day
            dayWrapper.addEventListener('click', () => {
                date = new Date()
                date.setDate(daysId[j])
                date.setFullYear(year)
                date.setMonth(month - 1)
                console.log(date.toISOString())
                model.currentDayOfRoom = date
                model.currentEventDayOfRoom = controller.filterScheduleOfDay(date)
                view.showCurrentSchedules()
                document.querySelector('.date_header').innerText = `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`
                document.querySelector(".chosenday").classList.remove("chosenday")
                dayWrapper.classList.add("chosenday")
            })
            document.querySelector(`.row_${i}`).appendChild(dayWrapper)

        }
        daysIdCount += 7
    }

}
view.showCurrentSchedules = () => {
    let day = model.currentEventDayOfRoom || []
    document.querySelector(".family_list_timeline").innerHTML = ""
    for (schedule of (model.currentEventDayOfRoom || [])) {
        view.addSchedule(schedule)
    }
    view.scrollToEndElement()
}
view.addSchedule = (schedule) => {
    console.log(schedule)
    const scheduleWrapper = document.createElement('div')
    scheduleWrapper.classList.add('timeline_wrapper')
    for (user of model.currentRoom.users) {
        if (schedule.creater === user.email) {
            scheduleWrapper.classList.add(`${user.color}`)
        }
    }
    const timeWrapper = document.createElement('div')
    timeWrapper.classList.add('time')
    timeWrapper.innerText = `${schedule.time.getHours()}h${schedule.time.getMinutes()}`
    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add("content")
    contentWrapper.innerText = schedule.content
    const buttonWrapper = document.createElement('button')
    buttonWrapper.classList.add('basic_btn')
    buttonWrapper.classList.add('delete_event')
    buttonWrapper.innerHTML = `<i class="fas fa-trash-alt"></i>`
    scheduleWrapper.appendChild(timeWrapper)
    scheduleWrapper.appendChild(contentWrapper)
    scheduleWrapper.appendChild(buttonWrapper)
    document.querySelector(".family_list_timeline").appendChild(scheduleWrapper)
    //click and delete event
    scheduleWrapper.addEventListener("click", (e) => {
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
view.showRooms = () => {
    for (room of (model.rooms || [])) {
        view.addRoom(room)
    }
}
view.addRoom = (room) => {
    const roomWrapper = document.createElement('div')
    roomWrapper.classList.add('room')
    roomWrapper.classList.add('cursor_pointer')
    if (room.id === model.currentRoom.id) {
        roomWrapper.classList.add('current')
    }
    roomWrapper.innerHTML = `<div class="room_title">${room.title}</div>`
    // click and render different room 
    roomWrapper.addEventListener('click', () => {
        model.currentRoom = room
        // model.rooms.filter(item => item.id === room.id)
        console.log(model.currentRoom)
        console.log(model.currentDayOfRoom)
        document.querySelector('.room.current').classList.remove('current')
        roomWrapper.classList.add('current')
        model.currentEventDayOfRoom = controller.filterScheduleOfDay(model.currentDayOfRoom)
        model.currentAvailableColor = model.baseColor
        model.currentAvailableColor = controller.findCurrentAvailableColor(room)
        console.log(model.currentAvailableColor)
        console.log(model.baseColor)
        console.log(controller.filterScheduleOfDay(model.currentDayOfRoom))
        console.log(model.currentEventDayOfRoom)
        view.showCurrentSchedules()
    })
    document.querySelector('.list_rooms').appendChild(roomWrapper)
}
view.showCurrentUsersOfRoom = () => {
    document.querySelector(".list_users").innerHTML = ""
    for (user of (model.currentRoom.users)) {
        view.addUser(user)
    }
}
view.addUser = (user) => {
    const userWrapper = document.createElement('div')
    userWrapper.classList.add('family_member')
    userWrapper.classList.add('cursor_pointer')
    userWrapper.classList.add(`${user.color}`)
    if (user.email === model.currentUser.email) {
        userWrapper.classList.add('current')
    }
    userWrapper.innerText = user.title
    document.querySelector(".list_users").appendChild(userWrapper)
    userWrapper.addEventListener('click', () => {

    })
}