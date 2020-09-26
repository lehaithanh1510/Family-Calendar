controller = {

}
controller.currentMonth = new Date().getMonth()+1
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
controller.createDayArray = (month,year) => {
    let  startIndex = (zeller(1, month, year));
    let  endIndex = dayInMonth(month, year);
    let arrayDay = []
    for (let i=0; i<=42 ;i++) {
        arrayDay[i] = 0;
    }
    for (let i=startIndex; i<endIndex+startIndex; i++) {
        arrayDay[i] = (i-startIndex) +1 ;
    }
    return arrayDay

}
controller.identifyMonthAndYearPrevious = (month,year) => {
    
    if (month === 1) {
        view.renderDayOfMonth(12,controller.currentYear-1)
        controller.currentMonth = 12;
        controller.currentYear-=1
        view.setErrorMessage("month_header",`Tháng ${controller.currentMonth},${controller.currentYear}`)
    }
    else {
        view.renderDayOfMonth(controller.currentMonth-1,controller.currentYear)
        controller.currentMonth -= 1;
        view.setErrorMessage("month_header",`Tháng ${controller.currentMonth},${controller.currentYear}`)
    }
    
}
controller.identifyMonthAndYearFollowing = (month,year) => {
    
    if (month === 12) {
        view.renderDayOfMonth(1,controller.currentYear+1)
        controller.currentMonth = 1;
        controller.currentYear +=1
        view.setErrorMessage("month_header",`Tháng ${controller.currentMonth},${controller.currentYear}`)

    }
    else {
        view.renderDayOfMonth(controller.currentMonth+1,controller.currentYear)
        controller.currentMonth += 1;
        view.setErrorMessage("month_header",`Tháng ${controller.currentMonth},${controller.currentYear}`)
    }
    console.log(controller.currentMonth)
    console.log(controller.currentYear)
}
const zeller = (day,month,year) => {
   return new Date (`${month}/${day}/${year}`).getDay() 
}
const dayInMonth = (month,year) => {
  if (month === 1) return 31
  if (month === 2 && year % 4 !==0 ) return 28
  if (month === 2 && year % 4 ===0 ) return 29
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
