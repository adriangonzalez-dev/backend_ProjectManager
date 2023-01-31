const { Schema, model } = require('mongoose');
const {hash, compare} = require('bcryptjs')

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    checked: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await hash(this.password, 10);
})

userSchema.methods.checkedPassword = async function(password){
    return await compare(password, this.password)
}

userSchema.methods.toJSON = function() {
    const { __v, password, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'User', userSchema );