const view = {}
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
            document.getElementById('create_room').addEventListener('click', () =>{
                view.setActiveScreen('createRoomPage')
            })
            model.getRooms()
            // model.listenRoomChange()
             break;    
         case "createRoomPage" :
             document.getElementById('app').innerHTML = component.createRoomPage
             document.getElementById('redirect_to_calendar').addEventListener('click', () =>{
                 view.setActiveScreen('calendarPage')
             })
             const createRoomForm = document.getElementById('create_room_form')
             createRoomForm.addEventListener('submit', (e) =>{
                 e.preventDefault()
                 const data = {
                     title: createRoomForm.title.value,
                     email: createRoomForm.email.value
                 }
                 controller.createRoom(data)
             })
             break;    
    }
}
view.setErrorMessage = (id, content) => {
    document.getElementById(id).innerText = content
}
view.renderDayOfMonth = (month) => {

}
view.showCurrentRoom = () =>{
    for(schedule of model.currentRoom.schedules){

    }
}
view.showRooms = () =>{
    for(room of model.rooms) {
        view.addRoom(room)
    }
}
view.addRoom = (room) =>{
    const roomWrapper = document.createElement('div')
    roomWrapper.classList.add('room')
    roomWrapper.classList.add('cursor_pointer') 
    if(room.id === model.currentRoom.id) {
        roomWrapper.classList.add('current')
    }
    roomWrapper.innerHTML = `
    <div class="room_title">${room.title}</div>
    <div class="num_of_user">${room.users.length} users</div>
    `
    roomWrapper.addEventListener('click', () =>{
        model.currentRoom = filter(model.rooms, item => item.id === room.id)[0]
        view.showCurrentRoom()
        document.querySelector('.room.current').classList.remove('current')
        roomWrapper.classList.add('current')
    })
    document.querySelector('.list_rooms').appendChild(roomWrapper)
}
console.log(view.addRoom(room))