const router = require('express').Router();

router.get('/:id', (req, res) => {
  const id = req.params.id
  const t = req.query.t || 0
  const body = JSON.stringify(req.body, null, 4)
  if(isNaN(id)) {
    res.status(400).send('miss id')
    return 
  }

  const ret = `id=${id}, t=${t}, body=\n${body}`
  console.log(ret)
  res.send(ret)

})

router.get('/', (req, res) => {
  res.status(400).send('miss id')
})

module.exports = router