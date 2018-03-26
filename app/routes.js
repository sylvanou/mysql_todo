const moment = require('moment');
module.exports = function (app, database) {

    // GET index page
    app.get('/', (req, res) => {
        res.render('index.ejs', {
            user: {
                name: 'Sylvano Umbac'
            }
        });
    });

    // GET get-todo page
    app.get('/get-todo', (req, res) => {
        database.query(
            `SELECT * FROM todos`,
            function (error, results, fields) {

                if (error) throw error;

                console.log('Results: ', results);
                res.render('todos.ejs', {
                    todos: results
                });
            });
    });

    // Create todo
    app.post('/create-todo', (req, res) => {
        console.log('data', req.body);

        let todo = {
            task: req.body.task,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            complete: false,
            uid: `AKAIXR${Math.round(Math.random()*10+ 2000)}ESK`,
            dueDate: moment().add(7, "days").format('YYYY-MM-DD HH:mm:ss')
        }

        database.query(
            `INSERT INTO todos (task, date, complete, uid, due_date)
             VALUES('${todo.task}', '${todo.date}', '${todo.complete}', '${todo.uid}',
             '${todo.dueDate}')`,
            function (error, result, fields) {
                // console.log('result', result, 'fields', fields);
                if (error) {
                    console.log(error)

                    res.send({
                        success: false,
                        result: error,
                        message: 'The task was not added'
                    });
                }
                else {
                    console.log('result: ', result);
                    todo.id = result.insertId;

                    res.send({
                        success: true,
                        todo: todo
                    })
                };
            });
    });

    // Update todo
    app.post('/update-todo', (req, res) => {
        var id = req.body.id;

        database.query(
            `UPDATE todos SET complete = true WHERE id = ${id}`,
            function (error, result, fields) {

                if (error) {
                    console.log('error ', error);

                    res.send({
                        success: false,
                        error: error,
                        message: 'The todo was not updated :('
                    });
                }
                else {
                    // console.log('result: ', result);

                    res.send({
                        success: true,
                        id: id
                    });
                }

            });
    });

    // Delete todo
    app.post('/delete-todo', (req, res) => {
        let id = req.body.id;
        database.query(
            `DELETE FROM todos WHERE id = ${id}`,
            function (error, results, fields) {

                if (error) {
                    console.log(error)

                    res.send({
                        success: false,
                        result: error,
                        message: 'The task was not deleted'
                    });
                }
                else {
                    console.log('Results: ', results);

                    res.send({
                        success: true,
                        id: id
                    });
                }
            });
    });

    // 404 NOT FOUND Response
    app.get('*', function (req, res) {
        res.render('404.ejs');
    });

}

