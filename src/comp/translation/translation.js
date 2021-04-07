import React, { useEffect, useState, useRef } from 'react'
import './translation.css'
import {
  Grid,
  Paper,
  Input,
  FormHelperText,
  Typography,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import Attempt from '../attempt/attempt'
import { normalize, capitalize } from '../../services/utils.service'

export default function Translation({ word, changeWord }) {
  const [maxAttepmt, setMaxAttempt] = useState(3)
  const [allAttempt, setAllAttempt] = useState([])
  const [textInput, setInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [dontKnow, setDontKnow] = useState(false)
  const [nextWord, setNextWord] = useState(false)
  const btnEl = useRef(null)
  const inputEl = useRef(null)

  function isValid(trad, text) {
    const sp = trad.split('/')
    for (const s of sp) {
      if (normalize(s) === normalize(text)) return true
    }
    return false
  }

  useEffect(() => {
    setInput('')
  }, [allAttempt])

  useEffect(() => {
    if (allAttempt.length >= maxAttepmt) {
      setDontKnow(true)
    }
  }, [allAttempt])

  useEffect(() => {
    if (isCorrect) {
      btnEl.current.focus()
    }
  }, [isCorrect])
  useEffect(() => {
    if (nextWord) {
      changeWord()
      setNextWord(false)
      setDontKnow(false)
      setIsCorrect(false)
      setInput('')
      setAllAttempt([])
    }
    inputEl.current.focus()
  }, [nextWord])
  useEffect(() => {
    if (dontKnow) {
      setIsCorrect(true)
    }
  }, [dontKnow])

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
              <Typography variant="h3" align="center">
                {capitalize(word.fr)}{' '}
                {isCorrect ? ` - ${capitalize(word.es)}` : ''}
              </Typography>
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
                inputRef={inputEl}
                autoFocus={true}
                onChange={(e) => setInput(e.target.value)}
                disabled={isCorrect}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    if (textInput.trim().length === 0) {
                      setInput('')
                      return
                    }
                    if (isValid(word.es, textInput)) {
                      setAllAttempt([
                        ...allAttempt,
                        {
                          valid: true,
                          text: textInput,
                        },
                      ])
                      setIsCorrect(true)
                    } else {
                      setAllAttempt([
                        ...allAttempt,
                        {
                          valid: false,
                          text: textInput,
                        },
                      ])
                    }

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
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button
                  disabled={isCorrect}
                  onClick={() => {
                    setDontKnow(true)
                  }}
                >
                  No sé
                </Button>

                <Button
                  ref={btnEl}
                  disabled={!isCorrect}
                  onClick={() => setNextWord(true)}
                >
                  Próximo
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
