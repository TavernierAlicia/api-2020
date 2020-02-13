const CryptoJS = require('crypto-js')
/**
 * Jwt - Json Web Token
 */
class JWT {
  /**
   * Encode base 64
   * @param {string} source
   * @return {string} string
   */
  encodeBase64 (source) {
    const encodedSource = CryptoJS.enc.Utf8.parse(JSON.stringify(source))
    return CryptoJS.enc.Base64.stringify(encodedSource)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }
  /**
   * Encode source to SHA256
   * @param {string} source
   * @return {string} text
   */
  encodeSHA256 (source) {
    const secret = 'secret'
    let encodedSource = CryptoJS.enc.Utf8.parse(JSON.stringify(source))
    encodedSource = CryptoJS.HmacSHA256(encodedSource, secret)
    return this.encodeBase64(encodedSource)
  }
  /**
   * JWT Genrator
   * @param {Object} user
   * @param {string} user.id
   * @param {string} user.email
   * @return {Object} token
   * @return {string} token.header
   * @return {string} token.payload
   * @return {string} tonken.signature
   */
  JWTgenerator (user) {
    if (!user.id && !user.email) {
      return new Error('[ERROR] JWTgenerator() -> user id or email is missing !')
    }
    const header = {alg: 'HS256', typ: 'JWT' }
    const payload = { id: user.id, email: user.email }
    const signature = { header, payload, timestamp: Date.now() }
    return {
      header: this.encodeBase64(header),
      payload: this.encodeBase64(payload),
      signature: this.encodeSHA256(signature)
    }
  }

  //SaveToken (user) {

  //}
}
module.exports = JWT
