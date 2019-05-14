import React, { useEffect, useState, useContext } from 'react';
import { predict } from "./helpers";
import { GameContext } from './App';
import { RoundContext } from './Game';
import { Grid, Typography } from "@material-ui/core";



const Prediction = ({ classes, theCanvas, model, labels, question }) => {
    let [prediction, setPrediction] = useState(""); // Sets default label to empty string.
    const { dispatchPoints } = useContext(GameContext);
    const { showNextRound } = useContext(RoundContext);

    // checking that canvas is empty or not
    const checkCanvas = (canvas) => {
      const context = canvas.getContext('2d');

      const pixelBuffer = new Uint32Array(
          context.getImageData(0, 0, canvas.width, canvas.height)
              .data
              .buffer
      );
      return !pixelBuffer.some(color => color !== 4294967295);
    };


    useEffect(() => {
        const timer = setInterval(() => {
            if(theCanvas.current === null || checkCanvas(theCanvas.current)){
                setPrediction('');
            } else {
                predict(theCanvas.current, model)
                    .then(prediction => {
                        setPrediction(prediction)
                    })
                    .catch(e => console.log('error: ', e))
            }
        }, 2000);
        return () => {
            clearInterval(timer)
        }
    });

    useEffect(() => {
        if(prediction === question){
            dispatchPoints({type: 'increment'});
            return showNextRound();
        }
    }, [prediction, dispatchPoints, showNextRound, question]);





    return (
        <Grid item xs >
            <Typography
                variant='subtitle1'
            >
                {prediction.length === 0 ?
                    (<p>Hey, Start to draw time is ticking</p>) :
                    (<p>I think this is ... <br/> <span>{prediction}</span></p>) }
            </Typography>
        </Grid>
    )
};

export default Prediction;