import {Constants} from "../constants";
import {AdminAuth} from "../models/AdminAuth";

type Res = { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; };

const BadRequest = (res: Res) => res.status(400).json({message: 'Wrong name or password!'});

const {Router} = require('express');
const router = Router();

router.post('/auth', async (req: { body: AdminAuth; }, res: Res) => {
    if (!req.body) {
        return BadRequest(res);
    }
    const {adminName, adminPass}: AdminAuth = req?.body;

    if (
        adminName === Constants.adminName
        && adminPass === Constants.adminPass
    ) {
        res.status(200).json({message: 'Success!'});
    } else {
        BadRequest(res);
    }
})

router.post('/send-invites', async (req: { body: any; }, res: Res) => {
    if (!req.body) {
        return BadRequest(res);
    }
    console.log(req?.body)
    res.status(200).json({message: 'Success!'});
})

module.exports = router;
