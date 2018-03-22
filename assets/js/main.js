$(document).ready(function () {

    const scroll = () => $('#todos_container').scrollTop($('#todos_container')[0].scrollHeight);

    const createTodo = () => {
        let task = $('#todo_input').val();
        if (task) {
            console.log('CLICKED');
            $.post("/create-todo", {
                task: task,
            }, function (response) {
                if (response.success) {
                    $('#todos_container').append(`
                          <div class='todo'>
                            ${response.todo.task}
                          </div>`);
                    $('#todo_input').val('');
                    console.log('create to doresponse', response);
                }
            })
        }
        else {
            alert("You must insert a task");
        }
    }

    $('#btn').on('click', function () {
        createTodo();
    });

    $('#todo_input').on('keyup', function (e) {
        if (e.keyCode === 13) {
            createTodo();
        }
    });
})