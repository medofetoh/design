var tasks_under_day = [];

function Analytics(element) {
    tasks_under_day = [];

    var date = element.value;
    var not_started = 0;
    var working = 0;
    var finished = 0;
    var time_spent = 0;

    //get tasks under selected day
    for (var i = 0; i < all_tasks.length; i++) {
        if (all_tasks[i].date == date) {
            tasks_under_day.push(all_tasks[i]);
        }
    }

    //fill analystics variables
    for (var i = 0; i < tasks_under_day.length; i++) {
        switch (tasks_under_day[i].status) {
            case status_enum.not_start:
                not_started += 1;
                break;
            case status_enum.working:
                working += 1;
                break;
            case status_enum.finished:
                finished += 1;
                time_spent += Number(tasks_under_day[i].period);
                break;
        }
    }

    document.getElementById('allCount').innerHTML = tasks_under_day.length;
    document.getElementById('notStartedCount').innerHTML = not_started;
    document.getElementById('workingCount').innerHTML = working;
    document.getElementById('finishedCount').innerHTML = finished;
    document.getElementById('timeSpent').innerHTML = time_spent;

    debugger
    //Draw Chart
    //EX: 5 : 1 : 4
    var devider = 100 / (not_started + working + finished);

    var not_started_ratio = (not_started * devider) / 100;
    var working_ratio = (working * devider) / 100;
    var finished_ratio = (finished * devider) / 100;

    var not_started_height = 250 * not_started_ratio;
    var working_height = 250 * working_ratio;
    var finished_height = 250 * finished_ratio;

    document.getElementById('cl_notStarted').style.height = (Number(not_started_height) ? not_started_height : 0) + 'px';
    document.getElementById('cl_working').style.height = (Number(working_height) ? working_height : 0) + 'px';
    document.getElementById('cl_finished').style.height = (Number(finished_height) ? finished_height : 0) + 'px';

    document.getElementById('cl_notStarted').style.marginTop = (250 - not_started_height) + 'px';
    document.getElementById('cl_working').style.marginTop = (250 - working_height) + 'px';
    document.getElementById('cl_finished').style.marginTop = (250 - finished_height) + 'px';
};