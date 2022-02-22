import React, {useState} from 'react'
import {AppContext} from "./appState";

const JotObservation = () => {
    const {saveObservation, activeLoader} = React.useContext(AppContext)

    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [waterLevel, setWaterLevel] = useState('')
    const [plantHeight, setPlantHeight] = useState('')
    const [plantImage, setPlantImage] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        saveObservation({summary, description, plantImage, waterLevel, plantHeight})

        setSummary('')
        setDescription('')
        setPlantHeight('')
        setWaterLevel('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label> Plant growth image </label>
                <br/>
                <br/>
                <input
                    type={'file'}
                    onChange={(e) =>
                        setPlantImage(e.target.files[0])
                    }
                />
                <br/>
                <br/>
            </div>

            <div>
                <label> Today's Growth Summary </label>
                <br/>
                <br/>
                <input
                    onChange={({target}) => setSummary(target.value)}
                    className={'input'}
                    value={summary}
                    placeholder={"One line summary of today's growth"}
                />
            </div>
            <br/>

            <div>
                <label> Today's Height </label>
                <br/>
                <br/>
                <input
                    onChange={({target}) => setPlantHeight(target.value)}
                    className={'input'}
                    value={plantHeight}
                    type={"number"}
                    placeholder={"Measured height of plant today in numbers"}
                />
            </div>
            <br/>

            <div>
                <label> Level of Water Added Today </label>
                <br/>
                <br/>
                <input
                    onChange={({target}) => setWaterLevel(target.value)}
                    className={'input'}
                    value={waterLevel}
                    type={"number"}
                    placeholder={"Litres of water used to water plant today in number"}
                />
            </div>
            <br/>

            <div>
                <label> Jot Today's Growth </label>
                <br/>
                <br/>

                <textarea
                    style={{height: '100px'}}
                    onChange={({target}) => setDescription((target.value))}
                    className={'input'}
                    value={description}
                    placeholder="Write something about today's growth"/>
            </div>

            <br/>
            <button onClick={handleSubmit}>
                {activeLoader === 'submitLoader' ? 'Saving' : 'Save'} Today's Observation
            </button>
        </form>
    )
}

export default JotObservation
