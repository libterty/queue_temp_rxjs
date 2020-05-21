const express = require('express')
const router = express.Router();
const {
  Subject
} = require("rxjs");
const {
  concatMap
} = require("rxjs/operators");
const Queue = require("./model");

const _queue$ = new Subject({});

async function processData(data) {
  let _datas = await Queue.find();
  let _data = _datas[_datas.length - 1];
  let _res;

  if (!_data) {
    _res = await new Queue({
      name: data.name,
      tugBoatId: 1,
    }).save();
  } else {
    _res = await new Queue({
      name: data.name,
      tugBoatId: _data.tugBoatId + 1,
    }).save();
  }

  return
}

_queue$
  .concatMap((x) => processData(x))
  .subscribe({
    next: () => console.log("queue_processing"),
    error: err => console.log("err", err.message),
    complete: () => console.log("queue_finishing"),
  });

router.post('/test', (req, res) => {
  const data = req.body.datas;
  while (data.length > 0) {
    _queue$.next(data.shift());
  }
  return res.status(201).json({
    status: "ok"
  });
})

module.exports = router;