const Machine = require('../../models/Machine');

module.exports = (app, db) => {
  app.get('/api/machines', (req, res) => {
    Machine.find()
      .exec()
      .then((machine) => {
        console.log(machine);
        res.json(machine)
      })
      .catch((err) => console.log((err)));
  });
  app.post('/api/machines', (req, res) => {
    console.log(req.headers);
    // const machine = new Machine(req.body);
    // console.log(machine);
    // machine.save((err) => {
    //   console.log(err);
    // })
    app.db.collection('machines').insertOne(req.body)
    .then((result) => {
      // console.log(result);
    });
  })

};
