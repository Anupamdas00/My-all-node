const add = (a, b) => {
  return new Promise((resolve,reject ) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Number should be positive number!");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doMath = async () => {
  const sum1 = await add(2, 10);
  const sum2 = await add(sum1, 6);

  return sum2;
};

// doMath()
//   .then((data) => {
//     console.log("result", data);
//   })
//   .catch((error) => console.log(error));

  (async () => {
    try {
      const result = await doMath();
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  })();