const { MongoClient, ObjectId } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("There is an error!", error);
    }

    const db = client.db(dbName);

    // ------------------------------insert data into Mongodb------------------------------------
    // db.collection('users').insertOne({
    //     name : "Anupam",
    //     task : "Developing"
    // }, (error, result) => {
    //     if(error){
    //         console.log('Unable to store');
    //     }
    //     console.log('Final result: ',result.insertedId );
    // })

    // db.collection('users').insertMany([
    //   {
    //     name : "Abhinav",
    //     task : 'Drawing'
    //   },
    //   {
    //     name : 'Pritha',
    //     task : 'Testing'
    //   }
    // ],(error, result) => {
    //   if(error){
    //     console.log('Unable to store');
    //   }

    //   console.log(result.ops);
    // })

    // ------------------------------Find or read data from mongodb---------------------------------
    // db.collection("users").findOne(
    //   { _id: new ObjectId("64bdf449e572e05a5a3c7623") },
    //   (error, result) => {
    //     if(error){
    //       console.log('Unable to fetch data!');
    //     }

    //     console.log(result);
    //   }
    // );

    // db.collection("users")
    //   .find({ name: "Anupam" })
    //   .toArray((error, users) => {
    //     if(error){
    //       console.log(error)
    //     }
    //     console.log(users);
    //   });


    // ------------------------------update data to mongodb--------------------------------------
    // const updateData = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectId("64bdf4825d23eb637894998f"),
    //   },
    //   {
    //     $set: {
    //       name: "Mike",
    //     },
    //   }
    // );

    // updateData.then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // })

    // db.collection('users').updateMany(
    //   {
    //     task : 'Drawing'
    //   },
    //   {
    //     $set : {
    //       task : 'Updating'
    //     }
    //   }
    // ).then((result) => {
    //   console.log('Update successfull', result);
    // }).catch((error) => {
    //   console.log(error);
    // })


    // ------------------------------Delete data from mongodb-------------------------------------
  //   db.collection('users').deleteOne( 
  //     {
  //       id : new ObjectId('64c1f6692e5565196f0eac09')
  //     }
  //   ).then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   })


  }
);
  