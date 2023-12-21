import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

import "./index.css"

const RaceTrack = (props) => {

    const localStorageRunnersData = JSON.parse(localStorage.getItem("localStorageRunnersData"))
    
    const [ minutes, setMinutes ] = useState("01")
    const [ seconds, setSeconds ] = useState("00")
    const [ resultList, setResultList ] = useState([])

    useEffect(() => {
        const timerId = setInterval(() => {

            if (seconds === "00") {
                let updateMinutes
                if (seconds === "00") {
                    updateMinutes = parseInt(minutes) - 1
                } else {
                    updateMinutes = parseInt(minutes)
                }

                const getMinutes = updateMinutes > 9 ? updateMinutes : `0${updateMinutes}`
                setMinutes(getMinutes)
                setSeconds("05")
            } else {
                let updateSeconds = parseInt(seconds) - 1 
                let getSeconds = updateSeconds > 9 ? updateSeconds : `0${updateSeconds}`
                setSeconds(getSeconds)
            }
        }, 1000)

        if (minutes === "00" && seconds=== "00") {
            clearInterval(timerId)
        }

        return () => {
            clearInterval(timerId)
        }

    })

    var displayUI = () => ( 
        <div className='middle-ground'>
            <div className='timer-container'>
                <h1 className="elapsed-time">Elapsed Time</h1>
                <h1 className="time">{minutes}:{seconds}</h1>
            </div>
            <p className="track-length-text">Track length 400m</p>
        </div>
    )

    let height = 220
    let width = 460
    let borderRadius = 140
    for (let i=0; i < localStorageRunnersData.length; i++) {

        const updatedUI =  (
            <div className='tract-styles' style={{height: height, width: width, backgroundColor: "#F1EAFF", borderStyle: "solid", borderColor: "white", borderWidth: 4, margin: 10, borderRadius: borderRadius}}>
                {displayUI()}
            </div>
        )

        displayUI = () => updatedUI
        
        height += 45
        width += 45
        borderRadius += 45

    }

    useEffect(() => {
        const speedList = []
        

        const participantsResults = []
    
        for (let eachObj of localStorageRunnersData) {
            speedList.push(eachObj.speed)
        }

        const sortedList = speedList.sort().reverse()
        
        for (let eachSpeed of sortedList) {
            console.log(sortedList)
            const findParticipant = localStorageRunnersData.find(function(eachItem) {
                if (eachItem.speed === eachSpeed) {
                    return true
                } else {
                    return false
                }
            })

            participantsResults.push(findParticipant)
        }

        console.log(participantsResults)

        setResultList(participantsResults)
        
    }, [])

    const onClickBackToHomeBtn = () => {
        const { history } = props
        history.replace("/")
    }

    const onClickRestartRaceBtn = () => {
        localStorage.removeItem("localStorageRunnersData")
        const { history } = props
        history.replace("/")
    }

    let endTime = 20

    if (minutes === "00" && seconds === "00") {
        return(
            <div className='race-track-container'>
                <div className='game-result' >
                    <h1 className='score-board-title'>SCORE BOARD</h1>
                    <div className='score-board-columns'>
                        <p>Position</p>
                        <p>Name</p>
                        <p>Speed</p>
                        <p>Start Time</p>
                        <p>End Time</p>
                    </div>
                    <ul className='participant-result-item-container'>
                        {resultList.map((eachParticipant, index) => { 
                            endTime += 10
                            return(
                            <li key={eachParticipant.id} className='participant-result-item' >
                                <p className='result-column-position'>{index + 1}</p>
                                <p className='result-column-name'>{eachParticipant.name}</p>
                                <p className='result-column-speed'>{eachParticipant.speed}</p>
                                <p className='result-column-start-time'>{eachParticipant.startTime}</p>
                                <p className='result-column-end-time'>{parseInt(eachParticipant.startTime) + endTime}</p>
                            </li>
                        )})

                        }

                        
                    </ul>

                    <div className='participant-board-buttons'>
                        <button type="button" className='back-to-home-btn' onClick={onClickBackToHomeBtn}>
                            <FaArrowLeft style={{marginRight: 5}} /> Back to Home
                        </button>
                        <button type="button" className='restart-race-btn' onClick={onClickRestartRaceBtn}>
                            Restart Race <MdOutlineRestartAlt size={20}  style={{marginLeft: 5}}/> </button>
                    </div>
                    
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className="race-track-container">
                {displayUI()}
            </div>
        );
    }

    
           
}

export default RaceTrack