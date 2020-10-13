const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

initializeDatabase().catch(err => console.log(err.stack))

async function initializeDatabase() {
    mongoose.connect('mongodb://localhost/DesafioFullstack', { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set('useCreateIndex', true);

    await mongoose.connection.dropDatabase()

    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    })

    UserSchema.pre('save', async function(next) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash

        next()
    })

    const User = mongoose.model('User', UserSchema)

    await User.create({
        name: 'Pedro',
        email: 'pedro@email.com',
        password: '12345678'
    });

}