const JWT = require('../app/jwt')
const jwt = new JWT()

const user = {
  id: 'dghdsaahfd',
  email: 'tartampion@gmail.com'
}

console.log(jwt.JWTgenerator(user))
