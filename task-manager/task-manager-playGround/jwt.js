// const jwt = require('jsonwebtoken')

// const jwtFunction = () => {
//     const token = jwt.sign({ id : '@abc123' }, 'privateKey');
//     console.log(token);

//     jwt.verify(token, 'privateKey', (err, data) => {
//         if(err){
//             console.log(err);
//             return;
//         }
//         console.log(data);
//     })
// }

// jwtFunction()

let n = 24;
let l = 0, r = 100, ans = n;
while(l <= r) {
   let mid = Math.floor((l + r) / 2);
   if(mid * mid <= n) {
       ans = mid;
       l = mid + 1;
   }
   else {
       r = mid - 1;
  }
}
console.log(ans);