import React, { useEffect, useState } from 'react'
import './translation.css'
import {
  Grid,
  Paper,
  Input,
  FormHelperText,
  FormControl,
} from '@material-ui/core'
import Attempt from '../attempt/attempt'

export default function Translation({ word }) {
  const [maxAttepmt, setMaxAttempt] = useState(3)
  const [currentAttempt, setCurrentAttempt] = useState(-1)
  const [allAttempt, setAllAttempt] = useState([])
  const [textInput, setInput] = useState('')

  useEffect(() => {
    setInput('')
  }, [allAttempt])
  return (
    <Grid
      className="translation-area"
      container
      direction="column"
      justify="center"
      alignItems="stretch"
    >
      <Grid item>
        <Paper elevation={3}>
          <Grid
            className="translation-area"
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <Grid item className="translation-fr">
              {word.fr}
            </Grid>
            <Grid item className="translation-attempts">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
              >
                {Array.from({ length: maxAttepmt }).map((_, i) => {
                  return (
                    <Grid item>
                      <Attempt
                        hidden={!allAttempt[i]}
                        text={(allAttempt[i] || {}).text}
                        valid={(allAttempt[i] || {}).valid}
                      ></Attempt>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item className="translation-input">
              <Input
                value={textInput}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    setAllAttempt([
                      ...allAttempt,
                      {
                        valid: false,
                        text: textInput,
                      },
                    ])
                    ev.preventDefault()
                  }
                }}
                fullWidth={true}
                aria-describedby="standard-trans-helper-text"
                inputProps={{
                  'aria-label': 'traduccion',
                }}
              />
              <FormHelperText id="standard-trans-helper-text">
                Traducción
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
