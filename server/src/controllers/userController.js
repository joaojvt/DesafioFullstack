const User = require("../database/models/user")
const { jwt } = require('../config/auth')

const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

exports.login = async(req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
        return res.status(404).send({ error: 'user not found' })

    if (!await bcrypt.compare(password, user.password))
        return res.status(403).send({ error: 'invalid password' })

    user.password = undefined
    const token = generateToken(user._id)

    return res.status(201).send({ token })
}

function generateToken(params = {}) {
    return sign({ id: params }, jwt.secret, { expiresIn: jwt.expiresIn })
}


exports.me = async(req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader === 'undefined') {
        res.status(401).send({ error: 'token not informed' })
    }
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    await verify(bearerToken, jwt.secret, async function(err, data) {
        if (err) {
            res.status(404).send({ error: 'user not found' })
        } else {
            const id = data.id

            try {
                const user = await User.findById(id)
                if (!user) return res.status(404).send({ error: 'user not found' })

                return res.status(201).send(user)
            } catch {
                return res.status(400).send({ error: 'error try again later' })
            }
        }
    })
}

exports.create = async(req, res, next) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(409).send({ error: 'User already exists' })

        const user = await User.create(req.body)

        user.password = undefined

        return res.status(201).send({
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        return res.status(400).send({ error: 'registration failed' })
    }
};

exports.findById = async(req, res, next) => {
    const id = req.params.user_id

    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).send({ error: 'user not found' })

        return res.status(201).send(user)
    } catch {
        return res.status(400).send({ error: 'user not found' })
    }
}

exports.updateUser = async(req, res, next) => {
    const id = req.params.user_id;
    try {
        if (!await User.findById({ _id: id })) return res.status(404).send({ error: `User not found` })

        const user = await User.findOneAndUpdate({ _id: id }, req.body)
        return res.status(201).send(user);
    } catch {
        return res.status(401).send({ error: 'error trying to update' })
    }
};

exports.delete = async(req, res, next) => {
    const id = req.params.user_id;
    try {
        const user = await User.findById({ _id: id })
        if (!user) return res.status(404).send({ error: `User not found` })

        userDeleted = await User.findByIdAndDelete({ _id: id })
        return res.status(200).send(`deleted with success!`);

    } catch (error) {
        return res.status(400).send({ error: `error trying to delete` })
    }
};

exports.getAll = async(req, res, next) => {
    try {
        const users = await User.find({}).select('+password')
        return res.status(201).send(users)
    } catch (error) {
        return res.status(404).send({ error: 'problem during search' })
    }
}

exports.searchByName = async(req, res, next) => {
    const name = req.params.filter
    try {
        const users = await User.find({ name })
        return res.status(201).send(users)
    } catch (error) {
        return res.status(404).send({ error: 'problem during search' })
    }
}

exports.ensureToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        verify(bearerToken, jwt.secret, function(err, data) {
            if (err) {
                res.sendStatus(403)
            }
        })
        next()
    } else {
        res.status(403)
    }
}