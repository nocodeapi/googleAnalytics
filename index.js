require("dotenv").config();
const   express = require("express"),
        axios = require('axios'),
        hbs = require('hbs');

//create express app
const app = express();
app.set('view engine', 'hbs');

//port at which the server will run
const port = 4000;

let results = {

    fetchMyAPI : async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews,users&startDate=30daysAgo&dimensions=date`
      );
      return response.data;
    },

    fetchSource : async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews&startDate=30daysAgo&dimensions=source&orderBys=descending`
      );

      return response.data;
    },

    fetchPages: async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews&startDate=30daysAgo&dimensions=pagePath&orderBys=descending`
      );

      return response.data;
    },

    fetchScreen : async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=deviceCategory&orderBys=descending`
      );

      return response.data;
    },

    fetchBrowser : async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=browser&orderBys=descending`
      );

      return response.data;
    },

    fetchCountries: async () => {
      const response = await axios.get(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=country&orderBys=descending`
      );

      return response.data;
    }

}

//create end point
app.get("/", async (req,res) => {
  //send 'Hi, from Node server' to client
  let analyticsData = await Promise.all([
      results.fetchMyAPI(),
      results.fetchSource(),
      results.fetchPages(),
      results.fetchScreen(),
      results.fetchBrowser(),
      results.fetchCountries()
  ]);

  console.log(analyticsData);

  res.render('index.hbs', {data: analyticsData});
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

