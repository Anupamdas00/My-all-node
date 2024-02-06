const bcrypt = require('bcrypt');
const router = require('../src/Router/user-router');


const hashFunction =async () => {
    const pass = '@reel1234';

    const hashedPass =await bcrypt.hash(pass, 8)
    console.log(pass);
    console.log(hashedPass);
}

hashFunction()


router.post('/life/todo', async (req, res) => {
    await new Time(req.body.knowledge).save();
    res.status(200).send('Keep Going!');
})