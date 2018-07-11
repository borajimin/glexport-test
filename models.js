"use strict";

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
    dialect: 'postgres'
});

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

var Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
},{
  underscored: true
});

var Shipment = sequelize.define('shipment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    company_id: {
        type: Sequelize.INTEGER
    },
    international_transportation_mode: {
        type: Sequelize.STRING
    },
    international_departure_date: {
        type: Sequelize.DATE
    }
},{
  underscored: true
});

var Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    sku: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    company_id: {
        type: Sequelize.INTEGER
    }
},{
  underscored: true
});

var ShipPro = sequelize.define('shipment_product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    shipment_id: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    }
},{
  underscored: true
});

Shipment.belongsTo(Company);
Company.hasMany(Shipment);
Product.belongsTo(Company);
Company.hasMany(Product);
ShipPro.belongsTo(Shipment);
Shipment.hasMany(ShipPro);
ShipPro.belongsTo(Product);
Product.hasMany(ShipPro);



module.exports = {
    sequelize,
    Company,
    Shipment,
    Product,
    ShipPro
};
