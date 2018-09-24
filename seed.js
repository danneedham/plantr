const db = require('./models.js')
const seed = db.sync({force: true}).then(() => {
    console.log('db synced!')
    db.close()
}).catch(err => {
    console.log(err)
    db.close()
}) 

Vegetable.create({
    name: 'Carrot',
    color: 'Orange',
    planted_on: Date.now()
})