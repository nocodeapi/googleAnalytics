require("dotenv").config();
const express = require("express");

//create express app
const app = express();

//port at which the server will run
const port = 4000;

let resources = {

    fetchMyAPI : async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews,users&startDate=30daysAgo&dimensions=date`
      );
      const result = await response.json();

      console.log(JSON.stringify(result[0]));

      this.setState({ totalView: result[0] });

      const datasets = [];
      result.forEach((element, key) => {
        const setData = {
          label: element.name,
          data: element.datasets
        };
        if (key === 0) {
          setData.borderColor = "red";
        }
        if (key === 1) {
          setData.borderColor = "green";
        }
        datasets.push(setData);
      });

      new Chart(myChartRef, {
        type: "line",
        data: {
          // Bring in data
          labels: result[0].labels,
          datasets
        },
        options: {
          // Customize chart options
        }
      });
    },

    fetchSource : async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews&startDate=30daysAgo&dimensions=source&orderBys=descending`
      );

      const result = await response.json();
      const jsonArrayObjs = _.zipObject(result[0].labels, result[0].datasets);

      this.setState({ source: result[0].data });
    },

    fetchPages: async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=pageviews&startDate=30daysAgo&dimensions=pagePath&orderBys=descending`
      );
      const result = await response.json();
      const jsonArrayObjs = _.zipObject(result[0].labels, result[0].datasets);
      this.setState({ pages: jsonArrayObjs });
    },

    fetchScreen : async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=deviceCategory&orderBys=descending`
      );
      const result = await response.json();
      const jsonArrayObjs = _.zipObject(result[0].labels, result[0].datasets);
      const allData = { data: jsonArrayObjs, total: result[0].totals };
      this.setState({ screens: { ...allData } });
    },

    fetchBrowser : async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=browser&orderBys=descending`
      );
      const result = await response.json();
      const jsonArrayObjs = _.zipObject(result[0].labels, result[0].datasets);
      const allData = { data: jsonArrayObjs, total: result[0].totals };
      this.setState({ browsers: { ...allData } });
    },

    fetchCountries: async () => {
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }?metrics=users&startDate=30daysAgo&dimensions=country&orderBys=descending`
      );
      const result = await response.json();
      const jsonArrayObjs = _.zipObject(result[0].labels, result[0].datasets);
      const allData = { data: jsonArrayObjs, total: result[0].totals };
      this.setState({ countries: { ...allData } });
    }

}

//create end point
app.get("/", (request, response) => {
  //send 'Hi, from Node server' to client
  response.send("Hi, from Node server");
});

//start server and listen for the request
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);

