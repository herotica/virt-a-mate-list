import Papa from "papaparse";
import fs from "fs";

const sheetsID = "1SBUy8k6ZwkCKgMW0lutZE30p4SD0Ni6xxo85QvYg_ig";
const sheetName = "data";
const csvlink = `https://docs.google.com/spreadsheets/d/${sheetsID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

const path = './src/data.json';

try {
  //read .csv file on a server
  const res = await fetch(csvlink, {
    method: "get",
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  });

  if (res.status === 200) {
    const csvData = await res.text();
    var data = Papa.parse(csvData);

    const dataNoHeader = data.data.slice(1);

    const dataAsJSON = dataNoHeader.map((key) => ({
      hubName: key[0],
      creator: key[1],
      link: key[7],
      normalName: key[2],
      normalDescription: key[3],
      faceReview: key[4],
      bodyReview: key[5],
      miniImage: key[6],
      paid: key[8]
    }));

    fs.writeFile(path, JSON.stringify(dataAsJSON, null, 2), (error) => {
      if (error) {
        console.log("An error has occurred ", error);
        return;
      }
      console.log("Data written successfully to disk");
    });
    
  } else {
    console.log(`Error code ${res.status}`);
  }
} catch (err) {
  console.log(err);
}
