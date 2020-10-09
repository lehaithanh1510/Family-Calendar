component = {

}
component.registerPage = `
 <div class="register_container">
            <form id='register_form'>
                <div class="register_header">Family Calendar</div>
                <div class="name_wrapper">
                    <div class="input_wrapper">
                        <input type="text" placeholder="First Name" name="firstName">
                        <div class="error" id = "first_name_error"></div>
                    </div>
                    <div class="input_wrapper">
                        <input type="text" placeholder="Last Name" name="lastName">
                        <div class="error" id = "last_name_error"></div>
                    </div>
                </div>
                <div class="input_wrapper">
                    <input type="text" placeholder="Email" name="email">
                    <div class="error" id = "email_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Password" name="password">
                    <div class="error" id = "password_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Password Confirm" name="passwordConfirm">
                    <div class="error" id = "password_confirmation_error"></div>
                </div>
                <div class="form_action">
                    <div>Already have an account ?<span class="cursor_pointer" id="login_change"> Log in </span></div>
                    <button class="btn cursor_pointer" type="submit"> Register </button>
                </div>
            </form>
        </div>
`
component.loginPage = `
       <div class="login_container">
            <form id="login_form">
                <div class="login_header"> Family Calendar </div>
                <div class="input_wrapper">
                    <input type="text" placeholder="Email" name="email"> 
                    <div class="error" id= "login_email_error"></div>
                </div>
                <div class="input_wrapper">
                    <input type="password" placeholder="Password" name="password"> 
                    <div class="error" id= "password_email_error"></div>
                </div>
                <div class="form_action">
                    <div>Don't have any account ?<span class="cursor_pointer" id="register_change"> Register </span></div>
                    <button class="btn cursor_pointer" type="submit"> Log in </button>
                </div>
            </form>
        </div>
`
component.calendarPage =`
<div class="add_user_form">
            <form id="add_user_form">
                <div class="adduser_input_wrapper">
                    <div class="basic_icon"><i class="fas fa-users"></i> </div>
                    <input type="text " placeholder="User email" name="email">
                    <div class="error" id="new_user_email_error"></div>
                </div>
                <div class="adduser_input_wrapper">
                    <div class="basic_icon"><i class="far fa-file-alt"></i></div>
                    <input type="text " placeholder="User title" name="title">
                    <div class="error" id="new_user_title_error"></div>
                </div>
                <div class="form_action">
                    <button class="cursor_pointer cancel cancel_add_user" type="button"> Cancel
                    </button>
                    <button class="btn cursor_pointer" type="submit"> Add </button>
                </div>
            </form>
        </div> 
<div class="create_room_form">
            <form id="create_room_form">
                <div class="room_title_wrapper">
                    <div class="basic_icon"><i class="fas fa-user"></i></div>
                    <div class="input_wrapper title">
                        <input type="text " placeholder="Room title" name="roomTitle">
                        <div class="error" id="create_room_title_error"></div>
                    </div>
                </div>
                <div class="my_title_wrapper">
                    <div class="basic_icon"><i class="fas fa-home"></i></div>
                    <div class="input_wrapper title">
                        <input type="text " placeholder="My title" name="myTitle">
                        <div class="error" id="create_my_title_error"></div>
                    </div>
                </div>
                <div class="form_action">
                    <button class="cursor_pointer cancel cancel_room" type="button"> Cancel </button>
                    <button class="btn cursor_pointer" type="submit"> Save </button>
                </div>
            </form>
        </div>
<div class="create_event_form">
            <form id="create_event_form">
                <div class="input_wrapper work">
                    <input type="text " placeholder="Add Work" name="work">
                    <div class="error" id="work_error"></div>
                </div>
                <div class="time_wrapper">
                    <div class="basic_icon"> <i class="far fa-clock"></i> </div>
                    <div class="input_wrapper">
                        <input type="number" placeholder="Hour:" name="hour">
                        <div class="error" id="hour_error"></div>
                    </div>
                    <div class="input_wrapper">
                        <input type="number" placeholder="Min:" name="minute">
                        <div class="error" id="minute_error"></div>
                    </div>
                    <div class="input_wrapper">
                        <input type="number" placeholder="Day:" name="day">
                    </div>
                    <div class="input_wrapper">
                        <input type="number" placeholder="Month:" name="month">
                        <div class="error" id="month_error"></div>
                    </div>
                    <div class="input_wrapper">
                        <input type="number" placeholder="Year:" name="year">
                        <div class="error" id="year_error"></div>
                    </div>
                </div>
                <div class="description_wrapper">
                    <div class="basic_icon"> <i class="far fa-comment-dots"></i></div>
                    <div class="input_wrapper">
                        <input type="text" placeholder="Add Description:" name="description">
                    </div>
                </div>
                <div class="form_action">
                    <button class="cursor_pointer cancel cancel_event" type="button"> Cancel </button>
                    <button class="btn cursor_pointer " type="submit"> Save </button>
                </div>
            </form>
        </div>
<div class="timeline_container">
            <div class="header"> Family Calendar <button class="btn cursor_pointer log_out"><i class="fas fa-sign-out-alt"></i></button></div>
            <div class="main">
                <div class="aside_left">
                    <div class="create_event">
                        <button class="btn cursor_pointer"> <i class="fas fa-calendar-plus"></i> New event </button>
                    </div>
                    <div class="calendar">
                        <div class="month_navigation">
                            <div id="month_header">Tháng 9,2020</div>
                            <button class="cursor_pointer previous_month"> <i class="fas fa-chevron-left"></i></button>
                            <button class="cursor_pointer next_month"> <i class="fas fa-chevron-right"></i> </button>
                        </div>
                        <div class="days_wrapper">
                            <table>
                                <thead> 
                                    <tr>
                                        <th class="days_of_week">Sun </th>
                                        <th class="days_of_week">Mon </th>
                                        <th class="days_of_week">Tue </th>
                                        <th class="days_of_week">Wed </th>
                                        <th class="days_of_week">Thu </th>
                                        <th class="days_of_week">Fri </th>
                                        <th class="days_of_week">Sat </th>
                                    </tr>
                                </thead>
                                <tbody class = "days">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="room_container">
                        <div class="room_header"> My room
                            <button class="btn create_new_room cursor_pointer"> <i
                                    class="fas fa-folder-plus"></i></button>
                        </div>
                        <div class="list_rooms">
                            
                        </div>
                    </div>
                </div>
                <div class="timeline_detail">
                    <div class="user_navigation">
                        <div class="list_users"> </div>
                        <button class="btn add_user cursor_pointer "> <i class="fas fa-user-plus"></i></button>
                    </div>
                    <div class="date_header"> 23 tháng 9 năm 2020 </div>
                    <div class="family_list_timeline">
                        
                    </div>
                </div>
            </div>
        </div>
`
