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

Plot.belongsToMany(Vegetable, {through: 'vegtable_plot'})
Vegetable.belongsToMany(Plot, {through: 'vegtable_plot'})
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})

Vegetable.create({
    name: 'Carrot',
    color: 'Orange',
    planted_on: Date.now()
}).then(Vegetable.create({
    name: 'Corn',
    color: 'Yellow',
    planted_on: Date.now()
})).then(Vegetable.create({
    name: 'Broccoli',
    color: 'Green',
    planted_on: Date.now()
})).catch(err =>{
    console.log('not a veggie')
})

module.exports = db