const request = require('../utils/request');
const AK = "jSs6u5u38MSnu4RklIazZu5dok76F6r8",
      baseUrl = "http://api.map.baidu.com/direction/v2"
const _ = {
  transit:(data)=>request.base({
    url:baseUrl+'/transit',
    method:'get',
    data:{
      ak:AK,
      origin:data.origin,
      destination:data.destination
    }
  })
}
module.exports=_;