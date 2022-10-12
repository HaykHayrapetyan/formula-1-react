import './App.css';
import Seasons from './components/Seasons';
import Rankings from './components/Rankings';
import Switcher from './components/Switcher';
import { useEffect, useState } from "react";


const App = () => {

  const [seasons, setSeasons] = useState([2012, 2013, 2014])
  const [chosenSeason, setChosenSeason] = useState('2012')
  const [rankings, setRankings] = useState([])
  const [swPosition, setSwPosition] = useState(0)

  useEffect(() => {
    //setSeasons(seasonsMock)

    (async () => {
      try {
        const urlEnd = `/seasons`    
        const data = await fetchData(urlEnd)
        console.log('data', data)
        setSeasons(data);
      } catch(e){
        console.log(e)
      }
      
    })()    
  }, []) 

  useEffect(() => {
    (async () => {
      try {
        const rankingsType = (swPosition) ? 'drivers' : 'teams';
        const urlEnd = `/rankings/${rankingsType}?season=${chosenSeason}`    
        const data = await fetchData(urlEnd)
        console.log('data', data)
        setRankings(data);
      } catch (e) {
        console.log(e)
      }
    })()
    
  }, [swPosition, chosenSeason])

  const fetchData = async (param) => {
    
    return fetch(`https://api-formula-1.p.rapidapi.com${param}`, {
        "method": "GET",
        "headers": {
          // add you key here
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(({response}) => {
        return response;
    })
    .catch(err => {
        console.log(err);
    });
  }

  const seasonHandler = (e) => {
    setChosenSeason(e.currentTarget.innerText);
  }

  const switchHandler = (e) => {
    setSwPosition(+e.target.checked);
  }

  return (
    <div className='MainWrapper'>
      <img className='HeaderImage' src={"./race.jpg"} />
      <h1>Formula 1 Rankings</h1>
      <h2>Seasons</h2>
      <Seasons data={seasons} handler={seasonHandler}/>
      <h2>Rankings</h2>
      <Switcher handler={switchHandler} labelName={swPosition}/>
      <Rankings data={rankings} switchPosition={swPosition}/>
    </div>
  );
}

export default App;