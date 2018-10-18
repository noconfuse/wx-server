const express = require('express');
const fs = require('fs');
const app = express();
const Multiparty = require('multiparty')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const AipSpeechClient = require("baidu-aip-sdk").speech;
// 设置APPID/AK/SK
var APP_ID = "14451157";
var API_KEY = "A9SAEhLX048vvEgQIs7WzY7F";
var SECRET_KEY = "HyBZypBCElUbuTp74Ty190Bra1RHfv7L";
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
app.post('/uploadVoice', function (req, res, next) {
  let form = new Multiparty.Form({
    uploadDir:'./uploads'
  })
  form.parse(req, function (err, fields, files) {
    if(err) {
      return
    }
    let inputFile = files.voice[0];
    var uploadedPath = inputFile.path;
    let command = ffmpeg();
    command.addInput(uploadedPath)
    .save(uploadedPath.slice(0,-3)+'wav')
    .on('error',function(err){
      console.log(err)
    })
    .on('end',function(){
      let voice = fs.readFileSync(uploadedPath.slice(0,-3)+"wav")
      let voiceBuffer = new Buffer(voice)
      client.recognize(voiceBuffer,'wav',16000).then((result)=>{
        res.end(JSON.stringify(result));
      })
    })
  })
})
var server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
})