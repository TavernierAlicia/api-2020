const JWT = require('../app/jwt')
const jwt = new JWT()

const user = {
  id: '2947hdh393',
  email: 'cyril@gmail.com'
}

const token = jwt.JWTgenerator(user)

jwt.saveToken(token.signature)
jwt.saveToken('djdh67S76S')
jwt.saveToken('sdfksjkdf33sfddsdf')
jwt.saveToken('kjsj483636')
jwt.saveToken('3sfddsdf')
jwt.saveToken('sdfksjkdf33sfddsdf')
jwt.saveToken('493737')
jwt.saveToken('sdfksjkdf33sdsffddsdf')


console.log(jwt.getTokens())

console.log(jwt.getToken('sdfksjkdf33sdsffddsdf'));
console.log(jwt.getToken('sdfksjkdf33sfddsdf'));
console.log(jwt.getToken('djdh67S76S'));
