const request = require('postman-request')

const foreCast = (data, callback) => {
    // const url = `http://api.weatherstack.com/current?access_key=2f45f1774c66b542ee75556fa84e5f5b&query=${lat},${long}`;

    // request({ url, json : true },(error, { body }) => {
    //     if(error){
    //         callback('connection Error!',undefined)
    //     } else if(body.error){
    //         callback(body.error.info, undefined)
    //     }else{
    //         const forCastData = `In ${body.location.name} ${body.current.temperature}°C with Humidity of ${body.current.humidity}% `
    //         callback(undefined, forCastData)
    //     }
    // })
    console.log(data);
}

module.exports = foreCast;