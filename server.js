const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//allow app to accept json
app.use(express.json());


// a users variable
const users = [];


//create my route here to fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    // add salt to the beginning of our password the hash it
    // this ensure security of our password because salt is different for everys single user
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //generate salt 
        // console.log(salt);
        // console.log(hashedPassword);

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send("added a user");
    } catch {
        res.status(500).send()
    }
});

//login route here
app.post('/users/login', async(req, res) => {
    const user = users.find(user => user.name = req.body.name); //check whether username is available
    // check if can find user
    if (user == null) {
        return res.status(404).send('user not found');
    }
    // do comparison for user passwords here
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Login Sucessfully');
        } else {
            res.send('Not allowed');
        }
        
    } catch (error) {
        res.status(500).send()
    }
  

})








// port that server will run on.
app.listen(4000);