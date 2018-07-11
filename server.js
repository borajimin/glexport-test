const express = require('express');
const { Company, Shipment, Product, ShipPro } = require('./models');
const app = express();
let query = {where: {}, include:[]}
let data = {records:[]};
//POSSIBLE QUERIES: company_id, international_transportation_mode,
//international_departure_date, direction, page, per
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/v1/shipments', (req, res) => {
  ShipPro.findAll({
    include: [
      {
        model: Product
      },
      {
        model: Shipment
      }
    ]
  })
  .then((shipPros) => {
    let shipment = [];
    let product = [];
    shipPros.forEach((shipPro) => {
      if(shipPro.dataValues.shipment.dataValues.company_id === parseInt(req.query.company_id)){
        shipment.push(shipPro.dataValues.shipment.dataValues);
      }
      console.log("dataValues",shipPro.dataValues.product.dataValues.company_id);
      console.log("req.query",req.query.company_id);
      if(shipPro.dataValues.product.dataValues.company_id === parseInt(req.query.company_id)){
        product.push(shipPro.dataValues.product.dataValues);
      }
    });
    console.log(shipment);
    console.log(product);
    res.json(data);
  })
  .catch((e) => {
    console.log(e);
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
