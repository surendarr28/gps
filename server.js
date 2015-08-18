var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 7000,
    router = express.Router(),
    app = express();

/*config*/

app.use(bodyParser());
mongoose.connect('mongodb://semp:emps@ds033163.mongolab.com:33163/employee');
var empSchema = mongoose.Schema({
    name: String,
    color: String
});

var emp = mongoose.model('emp', empSchema);

router.route("/")
.get(function (req, res) {
    emp.find(function (err, emps) {
        if (err)
            res.send(err);
        res.send(emps);
    });
})
.post(function (req, res) {
    var emps = new emp();
    emps.name = req.body.name;
    emps.color = req.body.color;

    emps.save(function (err) {
        if (err)
            res.send(err);
        res.send({ message: "emp created" });
    })
})

app.use(router);
app.listen(port);