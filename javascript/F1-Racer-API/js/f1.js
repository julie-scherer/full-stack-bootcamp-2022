console.log('This is f1.js')

/*
Using JavaScript's fetch() and the DOM, you are to update the f1.html and f1.js files to create a table of data using the F1 racer API 
(i.e. use "f1" as <series> in API call). I have attached a link to the documentation below. The Overview will show you how to make the API call. 

The table should display at least position, points, driver name, driver nationality, and constructor name. 
The table should dynamically populate the data when a "season" and "round" are specified within your form.
*/


    let form = document.getElementById('standingsForm');
    // console.log(form);
{
    // Get racer data from API
    async function getRacerInfo(raceSeason, raceRound) {
        const re = await fetch(
            `https://ergast.com/api/f1/${raceSeason}/${raceRound}/driverStandings.json`
        );
        const data = await re.json(); // Extracting data as a JSON Object from the response
        console.log("data : ", data);
        return data;
    }

    // create a function to handle submit event
    async function handleSubmit(e){
        e.preventDefault(); // Prevent the event from refreshing the page
        let inputSeason = e.target.raceSeason.value;
        let inputRound = e.target.raceRound.value;
        let race = await getRacerInfo(inputSeason,inputRound);
        buildstandingsTable(race);
        console.log("raceJSON : ", raceJSON);
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    function buildstandingsTable(raceJSON){
        let table = document.createElement('div')
        table.className = 'table';
        
        console.log("Creating table head fields...");
        // position, points, driver name, driver nationality, and constructor name

        let positionHead = document.createElement('th');
        positionHead.scope = "col";
        positionHead.innerHTML = "Position";
        
        let pointsHead = document.createElement('th');
        pointsHead.scope = "col";
        pointsHead.innerHTML = "Points";
        
        let driverNameHead = document.createElement('th');
        driverNameHead.scope = "col";
        driverNameHead.innerHTML = "Driver";
        
        let driverNationalityHead = document.createElement('th');
        driverNationalityHead.scope = "col";
        driverNationalityHead.innerHTML = "Nationality";
        
        let constructorHead = document.createElement('th');
        constructorHead.scope = "col";
        constructorHead.innerHTML = "Constructor";
        
        console.log("Append table head fields to table row...");
        let tableRowHead = document.createElement('tr');
        tableRowHead.append(positionHead);
        tableRowHead.append(pointsHead);
        tableRowHead.append(driverNameHead);
        tableRowHead.append(driverNationalityHead);
        tableRowHead.append(constructorHead);

        console.log("Append table row to table head...");
        let tableHead = document.createElement('thead');
        tableHead.className = 'thead';
        tableHead.append(tableHeadRow);

        console.log("Append table head to table...");
        table.append(tableHead);
        
        // - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Create table body

        let tableRow = document.createElement('tr');
        console.log(racerData)
        
        console.log("Creating table body fields...");
        // position, points, driver name, driver nationality, and constructor name

        let racerData = raceJSON.MRData.StandingsTable.StandingsLists[0].DriverStandings;   // in python: driver_json.get("MRData").get("StandingsTable").get("StandingsLists")[0].get("DriverStandings")
        // for (r = 0; r < racerData.length; r++) {
        for (r in racerData) {
            let position = document.createElement('td');
            position.scope = "col";
            position.innerHTML = racerData[r].position;

            let points = document.createElement('td');
            points.scope = "col";
            points.innerHTML = racerData[r].points;

            let name = document.createElement('td');
            name.scope = "col";
            name.innerHTML = racerData[r].Constructors.name;
            
            let nationality = document.createElement('td');
            nationality.scope = "col";
            nationality.innerHTML = racerData[r].Constructors.nationality;

            let constructorId = document.createElement('td');
            constructorId.scope = "col";
            constructorId.innerHTML = racerData[r].Constructors.constructorId;

            // Append table data to table row
            rowData = [position,points,name,nationality,constructorId];
            tableRow.append(rowData);
            
        }
        
        // Append table rows to table body
        let tableBody = document.createElement('tbody');
        tableBody.className = 'tbody';
        tableBody.append(tableRow);

        // Append table body to table
        table.append(tableBody);

        // Create a column for the table
        let col = document.createElement('div');
        col.className = 'col';

        // Add the table to the column
        col.append(table);

        document.getElementById('standingsTable').append(col);
        
        }

    form.addEventListener('submit', handleSubmit);
    
    }