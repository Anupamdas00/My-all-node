const { error } = require('console');
const fs = require('fs');

fs.writeFileSync('./text.txt', 'New Text');

const readFileData = (filePath) => {
    return new Promise((reject, resolve) => {
        fs.readFile(filePath, 'utf16le', (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}

readFileData('./text.tx',).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error);
})