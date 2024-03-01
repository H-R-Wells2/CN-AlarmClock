var timer = [];
var i = 0;
var alarms_ul = document.getElementById('alarms_ul');

let displayClock = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let format = hours < 12 ? "A.M" : 'P.M';
    let clock = document.getElementById('clock');
    let currentHour = hours < 10 ? '0' + hours : hours;
    clock.innerHTML = `
    ${hours > 12 ? hours - 12 : currentHour}
    : ${minutes < 10 ? '0' + minutes : minutes}
    : ${seconds < 10 ? '0' + seconds : seconds}
    : ${format}
    `;
    setTimeout(displayClock, 1000);
}

let setAlarm = () => {
    let alarmsInput = document.getElementById('input');
    let alarmTime = alarmsInput.value;
    alarmsInput.value = "";

    if (alarmTime !== "") {
        let [hours, minutes, seconds] = alarmTime.split(":");
        let currTime = new Date();
        let alarmDateTime = new Date(currTime);
        alarmDateTime.setHours(hours, minutes, seconds);
        let duration = alarmDateTime - currTime;

        if (duration < 0) {
            alert('Time has already passed');
        } else {
            displayAlarms(alarmDateTime);
            timer[i++] = setTimeout(() => {
                alert('Times up');
                console.log("Alarm Deleted");
                document.getElementById(alarmDateTime.getTime()).remove();
                i--;
            }, duration);
        }
    } else {
        alert('Select Alarm Time !!!')
    }
}


let displayAlarms = (time) => {
    let alarmTime = new Date(time);
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();

    let newLi = document.createElement('li');
    newLi.className = "alarms-li flex justify-around items-center py-3 border-b-2 border-slate-600 gap-2";
    newLi.id = alarmTime.getTime();
    newLi.innerHTML = `
    <i class="fas fa-bell fa-2x"></i>
    ${hours % 12 < 10 ? ("0" + (hours % 12)) : (hours % 12)}:
    ${minutes < 10 ? "0" + minutes : minutes}:
    ${seconds < 10 ? "0" + seconds : seconds}
    <button type="submit" onClick="deleteAlarm(${i})" class='deleteAlarm flex w-1/4 rounded-xl bg-red-600 ml-2 items-center justify-center text-white gap-2 shadow-md hover:bg-red-500'>Delete</button>    
    `;
    alarms_ul.appendChild(newLi);
}

let deleteAlarm = (index) => {
    clearInterval(timer[index]);
}

function removeAlarm(el) {
    if (el.classList.contains('deleteAlarm')) {
        el.parentElement.remove();
    }
}

document.addEventListener('DOMContentLoaded ', displayClock());

document.querySelector('#submit-time').addEventListener('click', (e) => {
    e.preventDefault();
    setAlarm();
});

document.getElementById('alarms_ul').addEventListener('click', (e) => {
    removeAlarm(e.target);
})
