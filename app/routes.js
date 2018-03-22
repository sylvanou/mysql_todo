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

    app.post('/create-todo', (req, res) => {
        console.log('data', req.body);

        let todo = {
            task: req.body.task,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            completed: false,
            uid: 'aohjknjiokl',
            dueDate: moment().add(7, "days").format('YYYY-MM-DD HH:mm:ss')
        }

        // console.log(`'${moment().add(7, "days").format('YYYY-MM-DD HH:mm:ss')}'`);
        database.query(
            `INSERT INTO todos (task, date, complete, uid, due_date)
             VALUES('${todo.task}', '${todo.date}', '${todo.completed}', '${todo.uid}',
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
                    // console.log('result: ', result);
                    todo.id = result.insertId;

                    res.send({
                        success: true,
                        todo: todo
                    })
                };
            });
    });

    app.post('/update-todo', (req, res) => {

    });

    app.post('/delete-todo', (req, res) => {
        database.query(
            `DELETE * FROM todos`,
            function (error, results, fields) {

                if (error) throw error;

                console.log('Results: ', results);
                res.render('todos.ejs', {
                    todos: results
                });
            });
    });

}

