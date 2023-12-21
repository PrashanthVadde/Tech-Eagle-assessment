import React from "react" 



const RunningRaceContext = React.createContext({
    runnersData: [],
    onAddRunner: () => {},
    onDeleteRunner: () => {}
})

export default RunningRaceContext