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
  let request = data;
  let results = [];

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

  results.push(_res);

  while (request.length > 0) {
    request.shift();
    _queue$.next(request);
  }

  return results;
}

_queue$
  .do(x => console.log('Before', x))
  .concatMap((x) => processData(x))
  .do(x => console.log('after', x))
  .subscribe({
    next: () => console.log("queue_processing"),
    error: err => console.log("err", err.message),
    complete: () => console.log("queue_finishing"),
  });

router.post('/test', (req, res) => {
  console.log("d", req.body.datas);
  _queue$.next(req.body.datas);
  return res.status(201).json({
    status: "ok"
  });
})

module.exports = router;