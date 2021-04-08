import React, { useEffect, useState, useRef } from 'react'
import './translation.css'
import {
  Grid,
  Paper,
  Input,
  FormHelperText,
  Typography,
} from '@material-ui/core'
import AttemptList from '../attempt/attempt-list'
import { normalize, capitalize } from '../../services/utils.service'
import FinishGrpBtn from '../finish-grp-btn/finish-grp-btn'
import TranslationInput from './translation-input'
import TranslationTitle from './translation-title'

export default function Translation({ word, changeWord }) {
  const [allAttempt, setAllAttempt] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [dontKnow, setDontKnow] = useState(false)
  const [nextWord, setNextWord] = useState(false)
  const [textInput, setInput] = useState('')

  function isValid(trad, text) {
    const sp = trad.split('/')
    for (const s of sp) {
      if (normalize(s) === normalize(text)) return true
    }
    return false
  }
  const pushAttempt = (valid, wordAttempt) => {
    setAllAttempt([
      ...allAttempt,
      {
        valid,
        text: wordAttempt,
      },
    ])
    setIsCorrect(valid)
  }

  useEffect(() => {
    setInput('')
  }, [allAttempt])

  useEffect(() => {
    if (isCorrect) {
    }
  }, [isCorrect])
  useEffect(() => {
    if (nextWord) {
      changeWord()
      setNextWord(false)
      setDontKnow(false)
      setIsCorrect(false)
      setAllAttempt([])
      setInput('')
    }
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
        <Paper elevation={2}>
          <Grid
            className="translation-area"
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <Grid item className="translation-fr">
              <TranslationTitle
                word={word.fr}
                trad={word.es}
                showTrad={isCorrect}
              />
            </Grid>
            <Grid item className="translation-attempts">
              <AttemptList
                maxAttepmt={3}
                attempts={allAttempt}
                onReachLimit={() => setDontKnow(true)}
              ></AttemptList>
            </Grid>
            <Grid item className="translation-input">
              <TranslationInput
                value={textInput}
                onChange={(e) => setInput(e.target.value)}
                disabled={isCorrect}
                onSubmit={(propal) => {
                  pushAttempt(isValid(word.es, propal), propal)
                }}
              ></TranslationInput>
              <FinishGrpBtn
                onDontKnow={() => setDontKnow(true)}
                onNext={() => setNextWord(true)}
                readyForNext={isCorrect}
              ></FinishGrpBtn>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
