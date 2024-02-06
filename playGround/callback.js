const geoCode = (address, callback) => {
   
    setTimeout(() => {
        const data = {
            longitude : 0,
            latitude : 0
        } 
        callback(data)
    }, 2000)
}

geoCode('Kolkata',(placeCode) => {
    console.log(placeCode);
})


const add = (num1, num2, callback) => {
    setTimeout(() => {
        const sum = num1 + num2;
        callback(sum)
    }, 2000)
    
}


add(1,3,(sum) => {
    console.log(sum);
})
