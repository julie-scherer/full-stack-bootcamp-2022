import React, { Component } from 'react'

export default class RacersClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            racers: [],
            season: 2022,
            round: 1
        }
    }

    componentDidMount(){
        fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
            .then(res => res.json())
            .then(data => {
                    let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    this.setState({racers:racerStandings})
                }
            )
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.round !== this.state.round || prevState.season !== this.state.season){
            fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
                .then(res => res.json())
                .then(data => {
                        let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                        this.setState({racers:racerStandings})
                    }
                )
        }
    }

    handleRacerSubmit = (e) => {
        // Prevent default of refreshing page
        e.preventDefault();
        let newSeason = e.target.season.value;
        let newRound = e.target.round.value;
        this.setState({
            season: newSeason,
            round: newRound
        })
    }

    render() {
        let tableHeaders = ['#', 'First', 'Last', 'Points', 'Wins', 'Nationality', 'Constructor']
        return (
            <div className='row py-3'>
                <h4 className="text-center">Driver Standings</h4>
                <form onSubmit={this.handleRacerSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <input type="text" className='form-control' name="season" placeholder='Enter Season' />
                        </div>
                        <div className="col-12 col-md-6">
                            <input type="text" className='form-control' name="round" placeholder='Enter Round' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="submit" value="Submit" className="btn btn-primary w-100" />
                        </div>
                    </div>
                </form>
                { this.state.racers.length ? (
                    <table className='table table-primary table-striped mt-3'>
                    <thead>
                        <tr>
                            {tableHeaders.map((th, i) => <th key={i}>{th}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.racers.map((racer, idx) => {   
                                return (<tr key={idx}>
                                    <th>{racer.position}</th>
                                    <td>{racer.Driver.givenName}</td>
                                    <td>{racer.Driver.familyName}</td>
                                    <td>{racer.points}</td>
                                    <td>{racer.wins}</td>
                                    <td>{racer.Driver.nationality}</td>
                                    <td>{racer.Constructors[0].name}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                ) : (null)}
                
            </div>
        )
    }
}
