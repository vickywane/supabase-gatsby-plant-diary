import React, {useContext, useEffect} from 'react'
import '../styles/index.css'
import DayObservation from "./dayObservation";
import JotObservation from "./jotObservation";
import {AppContext} from "./appState";

const Home = () => {
    const {activeLoader, fetchObservations, allGrowthObservations, setHomeView, homeView} = useContext(AppContext)

    useEffect(() => {
        fetchObservations()
    }, [])

    return (
        <div>
            <div className={'hero-container'}>
                <h1> My Plant Diary </h1>
                <p> A diary about my dear plant.</p>
            </div>

            <div className="align-center">
                <div className="content-ctn">

                    <div className="flex-between">
                        <div>
                            <p> {allGrowthObservations.length} Observations Found</p>
                        </div>

                        <div>
                            <button onClick={() => setHomeView(!homeView.isJottingObservation)}>
                                {homeView.isJottingObservation ? 'View All Progress' : 'Jot An Observation'}
                            </button>
                        </div>
                    </div>
                    <hr/>

                    {
                        !homeView.isJottingObservation
                            ?
                            <div>
                                {
                                    activeLoader === 'homeLoader' ?
                                        <p> Loading Observations ... </p> : allGrowthObservations.length < 1 ?
                                            <p style={{textAlign: 'center'}}>No observations found. <br/> Click the <b>Jot
                                                An Observation</b> button to get started.</p>
                                            : (
                                                <ul>
                                                    {
                                                        allGrowthObservations.map((data, index) => <DayObservation key={index} data={data}/>)
                                                    }
                                                </ul>
                                            )
                                }

                            </div>
                            :
                            <JotObservation/>
                    }

                </div>
            </div>
        </div>

    )
}

export default Home
