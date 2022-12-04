const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

// DB name after mongodb.net/
const url = 'mongodb+srv://ehab:Lrj3XEnZgGidK4PA@ehab.nunonfr.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(url).then(() => {
    console.log('Connected to Database..');
}).catch((err) => {
    console.log(`Failed to connect to database Error: ${err}`);
});

// Schema
const customerSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    phone: String,
    email: String,
    tasks: [{
        description: String,
        isDone: Boolean,
        createdAt: Date
    }]
});

// Model
const Customer = mongoose.model('Customer', customerSchema);

// all customers
app.get('/customers', (req, res) => {
    Customer.find({}, (err, data) => {
        if (err)
            res.json({
                'status': 'error',
                'message': 'Error.. Couldn\'t find any customers!'
            });
        else
            res.json(data);
    });
});

// new customer
app.post('/customer/new', (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        occupation: req.body.occupation,
        phone: req.body.phone,
        email: req.body.email
    });

    customer.save((err) => {
        if (err) {
            res.json({
                'status': 'error',
                'message': 'Error.. Couldn\'t Create new customers!'
            });
        } else {
            res.json({
                'status': 'success',
                'message': 'Successfully created new customer!'
            });
        }
    });
});

// delete customer
app.delete('/customer/delete/:id', (req, res) => {
    Customer.findOneAndDelete({
        _id: req.params.id
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        if (err)
            res.json({
                'status': 'error',
                'message': 'Error.. Couldn\'t delete customers!'
            });
    });
});

// update customer
app.put('/customer/update/:id', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name,
        occupation: req.body.occupation,
        phone: req.body.phone,
        email: req.body.email
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        if (err)
            res.json({
                'status': 'error',
                'message': 'Error.. Couldn\'t delete customers!'
            });
    });
});

// all tasks
app.get('/tasks', (req, res) => {
    Customer.find({
            'tasks': {
                $ne: []
            }
        })
        .select({
            'name': 1,
            'tasks': 1
        }).exec((err, data) => {
            if (err)
                res.json({
                    'status': 'error',
                    'message': 'Error.. Couldn\'t find any tasks!'
                });
            else
                res.json(data);
        });
});

// all tasks
app.post('/task/new/:id', (req, res) => {
    Customer.findOneAndUpdate({
        '_id': req.params.id,
    }, {
        '$push': {
            'tasks': {
                description: req.body.description,
                isDone: req.body.isDone,
                createdAt: req.body.createdAt
            }
        }
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        if (err)
            res.json({
                'status': 'error',
                'message': 'Error.. Couldn\'t create customer!'
            });
    });
});

app.listen(3030, console.log('Listening to 3030...'));