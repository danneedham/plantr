const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr',{})

const Gardener = db.define('gardeners', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
})

const Plot = db.define('plots', {
    size: {
        type: Sequelize.INTEGER
    },
    shaded: {
        type: Sequelize.BOOLEAN
    }
})

const Vegetable = db.define('vegetables', {
    name: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    planted_on: {
        type: Sequelize.DATE
    }
})

Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})
// Plot.belongsTo(Gardener, {as: 'gardenerId'})
// Gardener.hasOne(Plot)

const PlotVegetable = db.model("vegetable_plot");

Vegetable.create({
    name: 'Carrot',
    color: 'Orange',
    planted_on: Date.now()
}).then((vegetable) => {
    return Gardener.create({
        name: 'Bob',
        age: '30',
        favoriteVegetableId: vegetable.id
    })
}).then((gardener) => {
    return Plot.create({
        size: 2,
        shaded: true
    })
}).then((plot) => {
    return PlotVegetable.create({
        plotId: plot.id,
        vegetableId: carrot.id
    })
}).catch(err => {
    console.log("something went wrong")
})

// Vegetable.create({
//     name: 'Carrot',
//     color: 'Orange',
//     planted_on: Date.now()
// }).then(Vegetable.create({
//     name: 'Corn',
//     color: 'Yellow',
//     planted_on: Date.now()
// })).then(Vegetable.create({
//     name: 'Broccoli',
//     color: 'Green',
//     planted_on: Date.now()
// })).catch(err =>{
//     console.log('not a veggie')
// })

// Gardener.create({
//     name: 'Bob',
//     age: '30',
//     favoriteVegetableId: Vegetable.id
// }).then(Gardener.create({
//     name: 'Jim',
//     age: '40',
//     favoriteVegetableId: Vegetable.id
// })).then(Gardener.create({
//     name: 'Guy',
//     age: '50',
//     favoriteVegetableId: Vegetable.id
// })).catch(err => {
//     console.log('something went wrong')
// })

module.exports = db