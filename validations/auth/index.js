const {registerValidator} = require('./registerValidator');
const {loginValidator} = require('./loginValidator');
const {emailValidator} = require('./emailValidator');
const {tokenValidator} = require('./tokenValidator');
const { passValidator } = require('./passValidator');

module.exports = {
    registerValidator,
    loginValidator,
    emailValidator,
    tokenValidator,
    passValidator
}