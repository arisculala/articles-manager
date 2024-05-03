import express from 'express';

import { HttpStatusCode, HttpStatusName } from '../lib/httpstatus';

const router = express.Router();

router.get('/healthcheck/liveness', function (req, res) {
  return res
    .status(HttpStatusCode.OK)
    .json({ status: HttpStatusName[HttpStatusCode.OK] });
});

router.get('/healthcheck/readiness', async function (req, res) {
  //TODO: check dependencies readiness here
  // if (!(await isPoolReady())) {
  //   return res
  //     .status(HttpStatusCode.ServiceUnavailable)
  //     .json({ status: HttpStatusName[HttpStatusCode.ServiceUnavailable] });
  // }
  return res
    .status(HttpStatusCode.OK)
    .json({ status: HttpStatusName[HttpStatusCode.OK] });
});

export default router;
