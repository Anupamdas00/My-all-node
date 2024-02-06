const request = require('postman-request');

const geoCode = (address, callback) => {
    const urlForGeocode = 'http://api.positionstack.com/v1/forward?access_key=416fa727924ffbde9984bbc669b346b8&query=' + encodeURIComponent(address);

    request({ url : urlForGeocode, json : true }, (error, { body }) => {
        if(error){
            callback('Service not available', undefined)
        } else if(body.error){
            callback('Unable to find the resouces!', undefined)
        } else {
            callback(undefined, {
                data : {
                    place : body.data[0].label,
                    latitude : body.data[0].latitude,
                    longitude : body.data[0].longitude,
                }
            })
        }
    })

}

module.exports = geoCode;

