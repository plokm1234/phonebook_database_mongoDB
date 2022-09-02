const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://plokm1234:${password}@phonebook.8wfirk5.mongodb.net/phonebook_database?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const Phone = mongoose.model('Phone', phoneSchema)


mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    
    // const phone = new Phone({
    // name: process.argv[3],
    // number: process.argv[4]
    // })

    // return phone.save()
    Phone.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
  })
//   .then(() => {
//     console.log('phone saved!')
//     return mongoose.connection.close()
//   })
//   .catch((err) => console.log(err))



