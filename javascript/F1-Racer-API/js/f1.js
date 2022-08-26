console.log('This is f1.js')

/*
Using JavaScript's fetch() and the DOM, you are to update the f1.html and f1.js files to create a table of data using the F1 racer API 
(i.e. use "f1" as <series> in API call). I have attached a link to the documentation below. The Overview will show you how to make the API call. 

The table should display at least position, points, driver name, driver nationality, and constructor name. 
The table should dynamically populate the data when a "season" and "round" are specified within your form.
*/

{
  let form = document.getElementById('standingsForm');
  console.log(form);

  // create a function to handle submit event
  async function handleSubmit(e){
      e.preventDefault(); // Prevent the event from refreshing the page
      let inputSeason = e.target.season.value;
      let inputRound = e.target.round.value;
      let race = getRaceInfo(inputSeason,inputRound);
      buildstandingTable(race);
      console.log("raceJSON : ", raceJSON);
  }

  async function getRaceInfo(season, round) {
      const re = await fetch(
          `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`
      );
      const data = await re.json(); // Extracting data as a JSON Object from the response
      console.log("data : ", data);
      return data;
  }

  function buildstandingTable(raceJSON){
      // let table = document.createElement('div');
      // table.className = 'table';
      // console.log("table created")

      // create thead
      // position, points, driver name, driver nationality, and constructor name
      let tableHead = document.createElement('thead');
      tableHead.className = 'thead';
      console.log("tableHead created");

      let tableRowHead = document.createElement('tr');
      console.log("table row created");

      console.log("Start creating th fields...");
      let positionHead = document.createElement('th');
      positionHead.scope = "col";
      positionHead.innerHTML = "Position";
      tableRowHead.append(positionHead);

      let pointsHead = document.createElement('th');
      pointsHead.scope = "col";
      pointsHead.innerHTML = "Points";
      tableRowHead.append(pointsHead);

      let driverNameHead = document.createElement('th');
      driverNameHead.scope = "col";
      driverNameHead.innerHTML = "Driver";
      tableRowHead.append(driverNameHead);

      let driverNationalityHead = document.createElement('th');
      driverNationalityHead.scope = "col";
      driverNationalityHead.innerHTML = "Nationality";
      tableRowHead.append(driverNationalityHead);

      let constructorHead = document.createElement('th');
      constructorHead.scope = "col";
      constructorHead.innerHTML = "Constructor";
      tableRowHead.append(constructorHead);
      
      console.log("Stop creating th fields...");
      tableHead.append(tableHeadRow);
      table.append(tableHead);
      console.log("tableHead appended to table");

      // create tbody
      let tableBody = document.createElement('tbody');
      tableBody.className = 'tbody';

      let tableRow = document.createElement('tr');
      let racerData = raceJSON.MRData.StandingsTable.StandingsLists[0].DriverStandings;   // python: driver_json.get("MRData").get("StandingsTable").get("StandingsLists")[0].get("DriverStandings")
      console.log(racerData)
      for (r = 0; r < racerData.length; r++) {
          let tableData = document.createElement('td');
          tableData.scope = "col";
          tableData.innerHTML = racerData[r].position;
          tableRow.append(tableData);
          tableBody.append(tableRow);
      }
      

      table.append(tableHead);
      table.append(tableBody);

      // Create a column for the row
      let col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-3';

      // Add the card as a child to the column
      col.append(table);

      document.getElementById('standingTable').append(col);
      
    }

  form.addEventListener('submit', handleSubmit);
  
}