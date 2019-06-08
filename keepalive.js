const express = require('express')
const app = express()
const port = 3000

module.exports={
  run: function() {
    app.get('/', (req, res) => res.send('currently running'))
    app.listen(port, () => console.log(`listening on port ${port}`))
  }
}