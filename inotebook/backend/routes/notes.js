import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
   const  obj  = {
        a:'Demo',
        Number: 34
    }
    res.send(obj);
})

export default router;