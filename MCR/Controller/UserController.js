const User = require("../Model/userModel");
const passwordHash = require('password-hash');

exports.read = (req, res) => {
    console.log(req.body)
    User.find(function (err, userData) {
        if (err) return console.error(err);
        res.json(userData);

      });
      
}

//Use create for save datas received
exports.create = (req, res, next) => {

    let userData = new User(
        {
            mail: req.body.mail,
            password: hashFunc(req.body.password)
        }
    );
    userData.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

//Use update for change the datas received
exports.update = (req, res) => {
    console.log(req.body)
    User.findOneAndUpdate({ _id: req.body.id }, {$set: {password: hashFunc(req.body.password)}}, function (err) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

//Use delete for remove the datas received
exports.delete = (req, res) => {
    console.log(req.body.id)

    User.findOneAndDelete({ _id: req.body.id}, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.verify = (req, res) => {
    
    User.find(function (err, userData) {
        if (err) return console.error(err);
       
        let verifyVal;
        userData.map((value) => {
            verifyVal = hashFunc(req.body.password, value.password);
            console.log(verifyVal);
            if(req.body.mail === value.mail && verifyVal === true){
                res.json(req.body.mail);
            }
      });
    
    });
};

function hashFunc(getPassword, checkPassword = null){
    if(checkPassword !== null){
        return passwordHash.verify(getPassword, checkPassword);
    }
    return passwordHash.generate(getPassword);
}