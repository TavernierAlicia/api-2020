const User = require('../../models/user.js')
const JWT = require('../../jwt')

/**
 * Create
 * @class
 */
class Show {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', User)
    this.jwt = new JWT()

    this.run()
  }

  /**
   * middleware
   */
  middleware () {
    this.app.get('/user/show/:id', this.jwt.express(), (req, res) => {
      try {
        const { id } = req.params

        this.UserModel.findById(id).then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            'code': 500,
            'message': err
          })
        })
      } catch (err) {
        res.status(500).json({
          'code': 500,
          'message': err
        })
      }
    })
  }

  /**
   * run
   */
  run () {
    this.middleware()
  }
}

module.exports = Show
