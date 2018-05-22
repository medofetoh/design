 // Mohamed Hassan

//enums
var status_enum = {
    not_start: 0,
    working: 1,
    finished: 2,
};

var from_enum = {
    from_task: 0,
    from_other: 1,
};
//end enums

//task Constructor
var Task = function (name, period, date) {
    this.id = UniqueKey();
    this.name = name;
    this.date = date != null ? date : (new Date()).FormatDate(null, '-');
    this.period = period;
    this.status = status_enum.not_start;
    this.current_minutes = period;
    this.current_seconds = 0;
};


//generate unique key
function UniqueKey() {
    function unq() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return unq() + "-" + unq() + "-" + unq() + "-" + unq() + "-" + unq() + "-" + unq();
}



//INTERVAL --------------------------------------------------------------------------------------
var interval_all = function (selected_task) {
    for (var i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].status == status_enum.working && (selected_task == undefined || all_tasks[i].id != selected_task.id)) {
            apply_interval(all_tasks[i], from_enum.from_other);
        }
    }
    if (selected_task != null) {
        apply_interval(selected_task, from_enum.from_task);
    }
};

function apply_interval(task, from) {
    //Set the target date
    var countDownDate = (new Date()).AddMinutes(Number(task.current_minutes)).AddSeconds(Number(task.current_seconds));
    //Update timer every 1 second
    setInterval(function () {
        var timer_in_task = document.getElementById('timer')
        var hidden = $('table tbody tr').find('.hd-task-id[value="' + task.id + '"]');
        var tr = $(hidden).closest('tr');

        var now = new Date().getTime(); //get todays date and time
        var distance = countDownDate - now; //distance between now an the target date

        //stops when target equal now, and clear interval
        if (distance < 0) {
            clearInterval(interval_all);
            all_tasks[all_tasks.indexOf(task)].status = status_enum.finished;
            all_tasks[all_tasks.indexOf(task)].current_minutes = 0;
            all_tasks[all_tasks.indexOf(task)].current_seconds = 0;
            localStorage['all_tasks'] = JSON.stringify(all_tasks);
            //update in table
            $(tr).find('td:nth-child(5)').html(finishedbtn());
            //update in task page
            if (timer_in_task != null) {
                timer_in_task.replaceChild(finishedbtn());
            }
            return;
        }

        //calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //update timer in html
        all_tasks[all_tasks.indexOf(task)].current_minutes = minutes;
        all_tasks[all_tasks.indexOf(task)].current_seconds = seconds;
        localStorage['all_tasks'] = JSON.stringify(all_tasks);

        //console.log(task.current_minutes + ":" + task.current_seconds)

        //update in task page
        if (timer_in_task != null && from == from_enum.from_task) {
            timer_in_task.innerHTML = task.current_minutes + ":" + task.current_seconds;
        }

        //update in table
        if (tr != null) {
            $(tr).find('.btn-working').html('working .. (' + task.current_minutes + ":" + task.current_seconds + ')');
        }
    }, 1000);
};



//-------------------------------------------------------
var all_tasks = [];
//get tasks from local storage
if (localStorage['all_tasks'] != null) {
    all_tasks = JSON.parse(localStorage['all_tasks']);
}

var startbtn = function (tr, id) {
    var res;
    res = document.createElement('button');
    res.type = 'button';
    res.classList = 'btn btn-primary btn-start btn-rad';
    res.innerHTML = 'Start';
    res.onclick = function () {
        StartTask(tr, id);
    };
    return res;
};

var workingbtn = function (id) {
    var res;
    res = document.createElement('button');
    res.type = 'button';
    res.classList = 'btn btn-warning btn-working btn-rad';
    res.innerHTML = 'Working ..';
    res.onclick = function () {
        window.location.href = 'task.html?id=' + id + '';
    };
    return res;
};

var finishedbtn = function () {
    var res;
    res = document.createElement('button');
    res.type = 'button';
    res.classList = 'btn btn-default btn-rad';
    res.innerHTML = 'finished';
    return res;
};



//get all tasks
function GetAllTasks() {
    var tblbody = document.getElementById('tblAllTasksBody');
    for (var i = 0; i < all_tasks.length; i++) {
        var tr = document.createElement("tr");
        FillRowHtml(tr, i, all_tasks[i]);
        tblbody.appendChild(tr);
    }
}


function FillRowHtml(tr, i, task) {
    var statusvalue = null;
    switch (task.status) {
        case status_enum.not_start:
            statusvalue = startbtn(tr, task.id);
            break;
        case status_enum.working:
            statusvalue = workingbtn(task.id);
            interval_all(task);
            break;
        case status_enum.finished:
            statusvalue = finishedbtn();
            break;
        default:
            statusvalue = 'error';
            break;
    }

    //index
    var td_counter = document.createElement('td');
    td_counter.classList = 'text-center';
    td_counter.innerHTML = '<input type="hidden" class="hd-task-id" value="' + task.id + '" />';
    td_counter.appendChild(document.createTextNode(i + 1));

    //name
    var td_name = document.createElement('td');
    td_name.classList = 'text-center';
    td_name.innerHTML = '<a href="task.html?id=' + task.id + '">' + task.name + '</a>';

    //period
    var td_period = document.createElement('td');
    td_period.classList = 'text-center';
    td_period.appendChild(document.createTextNode(task.period));

    //date
    var td_date = document.createElement('td');
    td_date.classList = 'text-center';
    td_date.appendChild(document.createTextNode(task.date));

    //status
    var td_statusvalue = document.createElement('td');
    td_statusvalue.appendChild(statusvalue);
    td_statusvalue.classList = 'text-center';

    //remove
    var td_removebtn = document.createElement('td');
    td_removebtn.classList = 'text-center';
    var removebtn = document.createElement('button');
    removebtn.type = 'button';
    removebtn.classList = 'btn btn-danger';
    removebtn.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';
    removebtn.onclick = function () {
        RemoveTask(tr, task.id);
    };
    td_removebtn.appendChild(removebtn);

    tr.appendChild(td_counter);
    tr.appendChild(td_name)
    tr.appendChild(td_period);
    tr.appendChild(td_date);
    tr.appendChild(td_statusvalue);
    tr.appendChild(td_removebtn);
}


//Add new task when submit form
function Addtask() {
    debugger
    var name = document.getElementById('txtTaskName').value;
    var period = document.getElementById('txtTaskPeriod').value;
    var date = document.getElementById('txtTaskDate').value;

    var task = new Task(name, period, date); //create new object from task
    all_tasks.push(task); //add new task to tasks list
    localStorage['all_tasks'] = JSON.stringify(all_tasks); //update tasks in local storage
}


//remove task from tasks list
function RemoveTask(tr, id) {
    var task = findTask(id);
    if (task != null) {
        all_tasks.splice(all_tasks.indexOf(task), 1);
        localStorage['all_tasks'] = JSON.stringify(all_tasks);
        tr.remove();
    }
}


//Start Task
function StartTask(tr, id) {
    var task = findTask(id);
    if (task != null) {
        all_tasks[all_tasks.indexOf(task)].status = status_enum.working;
        interval_all(task);
        localStorage['all_tasks'] = JSON.stringify(all_tasks);
        if (tr != null) {
            $(tr).find('td:nth-child(5)').html(workingbtn(id));
        }
    }
}


//find task
function findTask(id) {
    for (var i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].id == id) {
            return all_tasks[i];
        }
    }
    return null;
}