const express = require('express');
const app = express();
const menuRoutes = require('./src/Routes/MenuRouter');
const kitchenRoutes = require('./src/Routes/KitchenRouter');
const reportRoutes = require('./src/Routes/ReportRouter');
const fs = require('fs');
const dotenv = require('dotenv');
const errorConstants = require('./src/errorConstants');
dotenv.config();

app.use(express.json());
app.use('/menu', menuRoutes);
app.use('/kitchen', kitchenRoutes);
app.use('/report', reportRoutes);


//404 errors handler 
app.use((req, res) => {
  res.status(errorConstants.statusNotFound).send(returnErrorFiles(errorConstants.notFoundResposePath));
});

returnErrorFiles = (path) => {
  const file = fs.readFileSync(path, 'utf8');

  return file.toString();
}

app.listen(process.env.PORT, () => console.log("Aplication Started On Port: " + process.env.PORT));
