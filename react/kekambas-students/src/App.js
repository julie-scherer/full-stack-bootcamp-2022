import JokeAccordion from './components/JokeAccordion';
import Navbar from './components/Navbar';
import Students from './components/Students';

function App() {
    return (

        <div className="container">
            <Navbar />
            <JokeAccordion />
            <div className="border border-bottom w-50 mx-auto my-4"/>
            <Students />
        </div>

  );
}

export default App;
