import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"

import "./index.css"

import RunningRaceContext from "../../context/runningRaceContext";

const ParticipantEntries = () => {
    const [ name, setName ] = useState("")
    const [ speed, setSpeed ] = useState("")
    const [ startTime, setStartTime ] = useState("")
    // const [runnersData, setRunnersData ] = useState([])
    

    const onChangeUsername = event => {
        setName(event.target.value)
    }
    
    const onChangeSpeed = event => {
        setSpeed(event.target.value)
    }

    const onChangeStartTime = event => {
        setStartTime(event.target.value)
    }
    

    const onSubmitRunner = (runnersData, onAddRunner) => {
        
        const newRunner = {
            id: uuidv4(),
            name,
            speed,
            startTime
        }

        if (runnersData.length < 10) {
            onAddRunner(newRunner)
            setName("")
            setSpeed("")
            setStartTime("")
        }

        if (runnersData.length === 10) {
            alert("Maximum Participants Added")
        }

    }


    return(
        <RunningRaceContext.Consumer>
            {value => {
                const { runnersData, onAddRunner, onDeleteRunner } = value 

                console.log("runnersData", runnersData)

                const onClickDeleteRunner = (id) => {
                    // const filteredRunners = runnersData.filter(eachRunner => eachRunner.id !== id)
                    // setRunnersData(filteredRunners)
                    onDeleteRunner(id)
                }

                return(
                    <div className="participant-entry-page">
                            <form className="input-field" >
                                <h1 className="input-field-title">RUNNER DETAILS</h1>
                                <p className="input-field-description">*You can add max 10 participants</p>
                                <label htmlFor="participantName" className="label-styles">Name</label>
                                <input id="participantName" className="input-styles" value={name}
                                onChange={onChangeUsername} />
                
                                <label htmlFor="speed" className="label-styles">Speed(km/h)</label>
                                <input id="speed" className="input-styles" value={speed} 
                                onChange={onChangeSpeed} />
                
                                <label htmlFor="startTime" className="label-styles">Start Time</label>
                                <input id="startTime" className="input-styles" value={startTime} onChange={onChangeStartTime} />
                                <button type="button" className="add-runner-btn" onClick={() => onSubmitRunner(runnersData, onAddRunner)}>+ Add Runner</button>
                            </form>
                
                            <div className="list-and-start-btn-container">
                                <div className="participants-list-container">
                                    <h1 className="participants-list-title">LIST OF PARTICIPANTS</h1>
                                    <div className="column-names-box">
                                        <p className="column-name">Name</p>
                                        <p className="column-name">Speed</p>
                                        <p className="column-name">StartTime</p>
                                        <p className="column-name">EndTime</p>
                                    </div>
                                    <ul className="runners-list-items-container">
                                        {runnersData.map(eachRunner => (
                                            <li key={eachRunner.id} className="runner-list-item">
                                                <p className="runner-name">{eachRunner.name}</p>
                                                <p className="runner-speed">{eachRunner.speed}</p>
                                                <p className="runner-start-time">{eachRunner.startTime}</p>
                                                <p style={{width: 40}}>-</p>
                                                <MdDelete size={20} style={{marginLeft: "auto", cursor: "pointer"}} onClick={() => onClickDeleteRunner(eachRunner.id)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                
                                    <button type="button" className="start-race-btn">
                                        <Link to="/race-track" style={{textDecoration: "none", color: "white"}}>Start Race <FaArrowRight style={{marginLeft: 6}} /> 
                                        </Link>
                                    </button>
                                
                            </div>
                
                            
                        </div>
                    )
            }}
        </RunningRaceContext.Consumer>
       
    )
}

export default ParticipantEntries