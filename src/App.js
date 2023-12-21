import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import "./App.css"

import ParticipantEntries from "./components/ParticipantEntries"
import RaceTrack from "./components/RaceTrack"
import RunningRaceContext from "./context/runningRaceContext"

const App = () => {
  const localStorageRunnersData = JSON.parse(localStorage.getItem("localStorageRunnersData"))
  const [runnersData, setRunnersData ] = useState(localStorageRunnersData !== null ? localStorageRunnersData : [])

  const onAddRunner = (data) => {
    setRunnersData(prevRunnersData => [...prevRunnersData, data])
  }

  const onDeleteRunner = (id) => {
    const filteredRunners = runnersData.filter(eachRunner => eachRunner.id !== id)
    setRunnersData(filteredRunners)
  }

  useEffect(() => {
    localStorage.setItem("localStorageRunnersData", JSON.stringify(runnersData))
  },)
  
  return(
    <RunningRaceContext.Provider value={{runnersData, onAddRunner, onDeleteRunner}}>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ParticipantEntries} />
          <Route exact path="/race-track" component={RaceTrack} />
        </Switch>
      </BrowserRouter>
    </RunningRaceContext.Provider>
)}

export default App
