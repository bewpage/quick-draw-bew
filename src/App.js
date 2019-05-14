import React, {  useReducer} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Game from './Game';
import Header from "./Header";
import CssBaseline from '@material-ui/core/CssBaseline';
import * as tf from "@tensorflow/tfjs";

const GameContext = React.createContext({});

const model = tf.loadLayersModel("./model/model.json");
const initialPoints = 0;

const pointReducer = (pointState, action) => {
    switch (action.type) {
        case 'reset':
            return initialPoints;
        case 'increment':
            return pointState + 1;
        case 'decrement':
            return pointState - 1;
        default:
            return pointState;
    }

};

const App = () => {
    const [points, dispatchPoints] = useReducer(pointReducer, initialPoints);

    return (
        <>
            <CssBaseline />
            <Router basename={process.env.PUBLIC_URL}>
                <GameContext.Provider value={{ model, points, dispatchPoints }}>
                    <Header/>
                    <Route exact path='/' component={Home} />
                    <Route path='/game' component={Game} />
                </GameContext.Provider>
            </Router>
        </>
    )

};


export default App;
export { GameContext };
