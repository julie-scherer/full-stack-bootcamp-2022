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
    
    async function handleSubmit(e){
        e.preventDefault(); // Prevent the event from refreshing the page
        let inputSeason = e.target.season.value;
        let inputRound = e.target.round.value;
        let race = await getRacerInfo(inputSeason,inputRound);
        buildstandingsTable(race);
        inputSeason.value = '';
        inputRound.value = '';
    }
    
    // Get racer data from API
    async function getRacerInfo(season, round) {
        const re = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/driverStandings.json`
        );
        const data = await re.json();
        console.log("data : ", data);
        // return data;
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    function buildstandingsTable(raceObj){
        let table = document.createElement('div');
        table.className = 'table';
        
        console.log("Creating table head fields...");
        
        // TABLE HEADER
        // - - - - - - - - - - - - - - - - - - - - - - - - - 
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
        
        let rowHead = document.createElement('tr');
        rowHead.append(positionHead);
        rowHead.append(pointsHead);
        rowHead.append(driverNameHead);
        rowHead.append(driverNationalityHead);
        rowHead.append(constructorHead);

        let tableHead = document.createElement('thead');
        tableHead.className = 'thead';
        tableHead.append(rowHead);

        table.append(tableHead);
        
        // TABLE BODY
        // - - - - - - - - - - - - - - - - - - - - - - - - - 
        // position, points, driver name, driver nationality, and constructor name
        let body = document.createElement('tbody');
        body.className = 'tbody';
        
        for (i in raceObj) {
            let row = document.createElement('tr');
            row.class = "row";
            
            let positionCol = document.createElement('th');
            positionCol.scope = "col";
            positionCol.innerHTML = raceObj[i].position;

            let pointsCol = document.createElement('td');
            pointsCol.scope = "col";
            pointsCol.innerHTML = raceObj[i].points;

            let nameCol = document.createElement('td');
            nameCol.scope = "col";
            nameCol.innerHTML = raceObj[i].Driver.givenName + ' ' + raceObj[i].Driver.familyName;
            
            let nationalityCol = document.createElement('td');
            nationalityCol.scope = "col";
            nationalityCol.innerHTML = raceObj[i].Constructors[0].nationality;

            let constructorIdCol = document.createElement('td');
            constructorIdCol.scope = "col";
            constructorIdCol.innerHTML = raceObj[i].Constructors[0].constructorId;

            columns = [positionCol, pointsCol, nameCol, nationalityCol, constructorIdCol];

            row.append(...columns);            
            table.append(row);
            body.append(row);
        }
        
        // Append table body to table
        table.append(body);

        // Create a column for the table
        let col = document.createElement('div');
        col.className = 'col';

        // Add the table to the column
        col.append(table);

        document.getElementById('standingsTable').append(col);
        
        }

    form.addEventListener('submit', handleSubmit);
    
}