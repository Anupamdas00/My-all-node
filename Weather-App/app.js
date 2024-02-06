// const request = require('postman-request')
// const chalk = require('chalk')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js') 

const args = process.argv[2]

geocode(args, (error, data) => {
    // console.log('Error :', error)
    // console.log('Data :', data)

    if(error){
        return console.log(error);
    }

    forecast(data, (error, foreCastData) => {
        if(error){
            return console.log(error);
        }
        console.log(data);
        // console.log(foreCastData)
      })
})



