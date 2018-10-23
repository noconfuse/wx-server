const express = require('express');
const router = express.Router();

const mapService = require('../../service/mapService.js')
router.post('/transit',function(req,res){
  mapService.transit({
    origin:"40.056878,116.30815",
    destination:"31.222965,121.505821"
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.send(err)
  })
})
module.exports = router