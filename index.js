// Array to store alarm timers
var timer = [];

// Index for tracking the number of alarms
var i = 0;

// Reference to the alarms list element
var alarms_ul = document.getElementById('alarms_ul');

// Function to display and update the clock
let displayClock = () => {
    // Get current time
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let format = hours < 12 ? "A.M" : 'P.M';

    // Get the clock element
    let clock = document.getElementById('clock');
    let currentHour = hours < 10 ? '0' + hours : hours;

    // Update the clock display
    clock.innerHTML = `
    ${hours > 12 ? hours - 12 : currentHour}
    : ${minutes < 10 ? '0' + minutes : minutes}
    : ${seconds < 10 ? '0' + seconds : seconds}
    : ${format}
    `;

    // Update the clock every second
    setTimeout(displayClock, 1000);
}

// Function to set a new alarm
let setAlarm = () => {
    // Get user input for the alarm time
    let alarmsInput = document.getElementById('input');
    let alarmTime = alarmsInput.value;
    alarmsInput.value = "";

    if (alarmTime !== "") {
        // Extract hours, minutes, and seconds from the input
        let [hours, minutes, seconds] = alarmTime.split(":");
        let currTime = new Date();
        let alarmDateTime = new Date(currTime);

        // Set the alarm time using the user input
        alarmDateTime.setHours(hours, minutes, seconds);
        let duration = alarmDateTime - currTime;

        // Check if the specified time has already passed
        if (duration < 0) {
            alert('Oops! The selected time has already passed. Please choose a future time for your alarm.');
        } else {
            // Display the alarm in the list and set a timer for notification
            displayAlarms(alarmDateTime);
            timer[i++] = setTimeout(() => {
                alert('Times up');
                document.getElementById(alarmDateTime.getTime()).remove();
                i--;
            }, duration);
        }
    } else {
        alert('Select Time First !!!');
    }
}

// Function to display alarms in the list
let displayAlarms = (time) => {
    let alarmTime = new Date(time);
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();

    // Create a new list item for the alarm
    let newLi = document.createElement('li');
    newLi.className = "alarms-li flex justify-around items-center py-3 border-b-2 border-slate-600 gap-2 text-lg font-semibold";
    newLi.id = alarmTime.getTime();
    newLi.innerHTML = `
    <i class="fas fa-bell fa-lg"></i>
    ${hours % 12 < 10 ? ("0" + (hours % 12)) : (hours % 12)}:
    ${minutes < 10 ? "0" + minutes : minutes}:
    ${seconds < 10 ? "0" + seconds : seconds}
    <button type="submit" onClick="deleteAlarm(${i})" class='deleteAlarm flex w-1/4 rounded-xl bg-red-600 ml-2 items-center justify-center text-white gap-2 shadow-md hover:bg-red-500'>Delete</button>    
    `;
    alarms_ul.appendChild(newLi);
}

// Function to delete an alarm
let deleteAlarm = (index) => {
    clearInterval(timer[index]);
}

// Function to remove an alarm from the list
function removeAlarm(el) {
    if (el.classList.contains('deleteAlarm')) {
        el.parentElement.remove();
    }
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded ', displayClock());

// Event listener for clicking the "Add Alarm" button
document.querySelector('#submit-time').addEventListener('click', (e) => {
    e.preventDefault();
    setAlarm();
});

// Event listener for clicking on the alarms list to remove an alarm
document.getElementById('alarms_ul').addEventListener('click', (e) => {
    removeAlarm(e.target);
})
