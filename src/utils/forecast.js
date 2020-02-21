const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url ='https://api.darksky.net/forecast/38f9be1c2f954e51e19cb9afbda649fb/'+latitude+','+longitude
  request({url:url, json: true}, (error, response)=> {
    if(error){
      callback('Unable to connect to weather services', undefined)
    }else if (response.body.error){
      callback('Unable to find location', undefined)
    }else{
      const result = 'It is currently '+response.body.currently.temperature+' out. There is a '+response.body.currently.cloudCover+' chance of rain.';
      callback(undefined ,result)
    }
  })
}

module.exports = forecast