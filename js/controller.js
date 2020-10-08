controller = {

}
controller.currentMonth = new Date().getMonth() + 1
controller.currentYear = new Date().getFullYear()
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
controller.createDayArray = (month, year) => {
    let startIndex = (zeller(1, month, year));
    let endIndex = dayInMonth(month, year);
    let arrayDay = []
    for (let i = 0; i <= 42; i++) {
        arrayDay[i] = 0;
    }
    for (let i = startIndex; i < endIndex + startIndex; i++) {
        arrayDay[i] = (i - startIndex) + 1;
    }
    return arrayDay

}
controller.identifyMonthAndYearPrevious = (month, year) => {

    if (month === 1) {
        view.renderDayOfMonth(12, controller.currentYear - 1)
        controller.currentMonth = 12;
        controller.currentYear -= 1
        view.setErrorMessage("month_header", `Tháng ${controller.currentMonth},${controller.currentYear}`)
    }
    else {
        view.renderDayOfMonth(controller.currentMonth - 1, controller.currentYear)
        controller.currentMonth -= 1;
        view.setErrorMessage("month_header", `Tháng ${controller.currentMonth},${controller.currentYear}`)
    }

}
controller.identifyMonthAndYearFollowing = (month, year) => {

    if (month === 12) {
        view.renderDayOfMonth(1, controller.currentYear + 1)
        controller.currentMonth = 1;
        controller.currentYear += 1
        view.setErrorMessage("month_header", `Tháng ${controller.currentMonth},${controller.currentYear}`)

    }
    else {
        view.renderDayOfMonth(controller.currentMonth + 1, controller.currentYear)
        controller.currentMonth += 1;
        view.setErrorMessage("month_header", `Tháng ${controller.currentMonth},${controller.currentYear}`)
    }
    console.log(controller.currentMonth)
    console.log(controller.currentYear)
}
controller.filterScheduleOfDay = (day) => { // input là ngày cụ thể dạng new Date()
    // console.log(Boolean(model.currentRoom.schedules))
    if (model.currentRoom.schedules) {
        const dayStandard = (object) =>
            object.time.getDate() === day.getDate()
            && object.time.getMonth() === day.getMonth()
            && object.time.getFullYear() === day.getFullYear()
            return model.currentRoom.schedules.filter(dayStandard)
    }
    else {
        console.log("ra array rong ma")
        return []
    }
    // trả ra 1 array schedules bao gồm các schedules chứa ngày cần tìm

}
controller.sortSchedulesOfDay = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = array.length -1; j > i; j--) {
            if (new Date(array[j].time).getHours() < new Date(array[j-1].time).getHours()) {
                let temp = array[j]
                array[j] = array[j-1]
                array[j-1] = temp
            }
            else if (new Date(array[j].time).getHours() == new Date(array[j-1].time).getHours() 
            && new Date(array[j].time).getMinutes() < new Date(array[j-1].time).getMinutes()) {
                let temp = array[j]
                array[j] = array[j-1]
                array[j-1] = temp
            }
        }
    }
    return array

}
controller.updateNewevent = (data) => {
    if (data.content.trim() === "")
        data.content === "Don't have any schedule"
    model.updateNewevent(data)

}
const zeller = (day, month, year) => {
    return new Date(`${month}/${day}/${year}`).getDay()
}
const dayInMonth = (month, year) => {
    if (month === 1) return 31
    if (month === 2 && year % 4 !== 0) return 28
    if (month === 2 && year % 4 === 0) return 29
    if (month === 3) return 31
    if (month === 4) return 30
    if (month === 5) return 31
    if (month === 6) return 30
    if (month === 7) return 31
    if (month === 8) return 31
    if (month === 9) return 30
    if (month === 10) return 31
    if (month === 11) return 30
    if (month === 12) return 31
}
controller.compareTwoObject = (objA, objB) => {
    let aProps = Object.getOwnPropertyNames(objA);
    let bProps = Object.getOwnPropertyNames(objB);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (objA[propName] !== objB[propName]) {
            return false;
        }
    }
    return true;
}
controller.deleteSchedule = (schedule) => {
    let index = -1
    for (let i = 0; i < model.currentRoom.schedules.length; i++) {
        if (controller.compareTwoObject(schedule, model.currentRoom.schedules[i])) {
            index =i 
            // model.currentRoom.schedules.splice(i, 1)
        }
        // if (model.currentRoom.schedules.length === 0) {
        //     model.deleteAllSchedules()
        // }
        else {
            model.currentRoom.schedules[i].time = model.currentRoom.schedules[i].time.toISOString()
        }

    }
    if (index!== -1) {
        model.currentRoom.schedules.splice(index, 1)
    }
    console.log(model.currentRoom.schedules)
    model.deleteEvent(model.currentRoom.schedules)
}
controller.createRoom = (roomTitle,userData) =>{
    if(roomTitle.trim() === '') {
        view.setErrorMessage('create_room_title_error', 'Please enter room title')    
    }
    else{
        view.setErrorMessage('create_room_title_error', '')
    }
    if(userData.title.trim() === ''){
        view.setErrorMessage('create_my_title_error', 'Please enter your title')
    }
    else{
        view.setErrorMessage('create_my_title_error', '')
    }
    model.createRoom(roomTitle,userData)
    
    
}
