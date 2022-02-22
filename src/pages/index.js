import React from 'react'
import '../styles/index.css'
import { AppProvider} from "./appState";
import Home from "./Home";

const Index = () => {
    return (
        <AppProvider className="container">
            <Home />
        </AppProvider>
    )
}

export default Index
