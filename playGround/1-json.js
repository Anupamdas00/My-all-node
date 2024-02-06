const fs = require('fs');
const os = require('os');

// const book = {
//     title : "Think like a Monk",
//     author : "Jay Shetty",
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync('1-json.json',bookJson)
const args = process.argv[2]
console.log(args);
const dataBuffer = fs.readFileSync('1-json.json');
const dataStr = dataBuffer.toString();
// const dataObj = JSON.parse(dataStr);
console.log(dataStr);

// dataObj.author = "Jay Shetty";
// dataObj.title = "Think like a Monk";

// fs.writeFileSync('1-json.json', JSON.stringify(dataObj))


