import React from "react";
import {createClient} from "@supabase/supabase-js";

const supabaseClient = createClient(process.env.GATSBY_SUPABASE_URL, process.env.GATSBY_SUPABASE_KEY)

const initialState = {
    allGrowthObservations: [],
    activeLoader: '',
    homeView: { isJottingObservation: false },
    uploadPlantImage: () => {},
    setHomeView: () => {},
    saveObservation: () => {},
    fetchObservations: () => {},
    dispatch: () => {},
}

export const AppContext = React.createContext(initialState)

const reducer = (state, action) => {
    switch (action.type) {
        case "SAVE_FETCHED_OBSERVATIONS":
            return {
                ...state,
                allGrowthObservations: action.payload,
            };
        case "HANDLE_LOADER":
            return {
                ...state,
                activeLoader: action.payload
            }
        case "HANDLE_HOME_VIEW":
            return {
                ...state,
                homeView: {
                    isJottingObservation: action.payload
                }
            }
        default:
            return state;
    }
};

export const AppProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const saveObservation = async ({summary, description, plantImage, plantHeight, waterLevel}) => {
        dispatch({type: 'HANDLE_LOADER', payload: 'submitLoader'})

        try {
            const {data: new_observation, error} = await supabaseClient
                .from('observations')
                .insert([
                    {
                        summary,
                        description,
                        plant_height: plantHeight,
                        water_level: waterLevel
                    },
                ])

            if (error) {
                console.error(error)
                return
            }

            if (plantImage) {
                await uploadPlantImage(plantImage, new_observation[0].id)
            }

            dispatch({
                type: 'SAVE_FETCHED_OBSERVATIONS',
                payload: [...new_observation, ...state.allGrowthObservations]
            })

            setHomeView(!state.homeView.isJottingObservation)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchObservations = async () => {
        dispatch({type: 'HANDLE_LOADER', payload: 'homeLoader'})

        let {data: plant_observations, error} =
            await supabaseClient
                .from('observations')
                .select('*')

        if (error) console.error(`Error fetching observations: ${error}`)

        dispatch({type: 'SAVE_FETCHED_OBSERVATIONS', payload: plant_observations})
        dispatch({type: 'HANDLE_LOADER', payload: ''})
    }

    const setHomeView = (newView) => dispatch({type: 'HANDLE_HOME_VIEW', payload: newView})

    const uploadPlantImage = async (file, observationId) => {
        try {
            const {data: uploadData, error: uploadError} = await supabaseClient.storage
                .from('gatsby-plant-bucket')
                .upload(`${file.name}`, file)

            if (uploadError) {
                console.error(uploadError)
                return
            }

            const { error: updateError} = await supabaseClient
                .from('observations')
                .update({image_url: `${process.env.GATSBY_SUPABASE_URL}/storage/v1/object/public/${uploadData.Key}`})
                .eq('id', observationId)

            if (updateError) {
                console.error(`Image update failed: ${updateError}`)
            }

        } catch (e) {
            console.log(e)
        }

        dispatch({
            type: 'HANDLE_LOADER', payload: null
        })
    }

    return (
        <AppContext.Provider value={{
            ...state,
            dispatch,
            saveObservation,
            fetchObservations,
            setHomeView,
            uploadPlantImage
        }}>
            {children}
        </AppContext.Provider>

    )
}
