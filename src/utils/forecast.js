const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url ='https://api.darksky.net/forecast/38f9be1c2f954e51e19cb9afbda649fb/'+latitude+','+longitude
  request({url:url, json: true}, (error, {body})=> {
    if(error){
      callback('Unable to connect to weather services', undefined)
    }else if(body.error){
      callback('Unable to find location', undefined)
    }else{
      const result = 'It is currently '+body.currently.temperature+' out. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.cloudCover+' chance of rain.';
      callback(undefined ,result)
    }
  })
}

module.exports = forecast