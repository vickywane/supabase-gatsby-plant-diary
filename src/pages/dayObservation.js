import React from 'react'

const DayObservation = ({data}) => {
    const {summary, description, image_url, created_at, plant_height, water_level} = data

    return (
        <li className={"list-container"}>
            <div className={'align-center'}>
                <div className={'list-image-container'}>
                    <img className={'summary-img'} alt={summary} src={image_url}/>
                </div>
            </div>

            <div className={'list-content'}>
                <p className={'title'}>{summary}</p>
                <hr/>
                <p style={{color: 'grey'}}>Observation taken on {new Date(created_at).toLocaleDateString()}</p>
                <p style={{color: 'grey'}}>
                    <b>{water_level}L</b> water of added, <b>{plant_height}</b>CM of height measured.
                </p>

                <p> {description} </p>
            </div>
        </li>
    )
}

export default DayObservation
