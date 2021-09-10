module.exports = (app) => {
    const User = require('./model')

    const {generateSalt, hash, compare} = require('./index');

    let salt = generateSalt(10);
    console.log(salt)

    app.post('/register', async (req, res) => {
        try {
            hashPassword = hash(req.body.password, salt)
            console.log(hashPassword)
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: await hashPassword
            })
            let response = await user.save();
            res.status(200).json({
                status: 'Success',
                data: response
            })
        } catch (err) {
            console.log(err)
        }
    })

    app.post('/login', async (req, res) => {
        try {
            let {email, password} = req.body;
            let user = await User.findOne({email: email})

            if (!user) {
                return res.status(400).json({
                    type: "Not Found",
                    msg: "User not found"
                })
            }

            let match = await compare(password, user.password, salt)

            if (match) {
                res.status(200).json({
                    status: "Sucess",
                    message: "Login successful",
                    data: user
                })
            }
        } catch (err) {
            console.log(err)
        }
    })
}