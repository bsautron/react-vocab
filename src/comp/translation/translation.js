import React, { useEffect, useState } from 'react'
import './translation.css'
import { Grid, Paper } from '@material-ui/core'
import AttemptList from '../attempt/attempt-list'
import { normalize } from '../../services/utils.service'
import FinishGrpBtn from '../finish-grp-btn/finish-grp-btn'
import TranslationInput from './translation-input'
import TranslationTitle from './translation-title'

/**
 * Check if the givving text correspond to the real trad
 * @param trad the real traduction - can be several possible trad if separated by '/'
 * @param text the proposal
 */
function isValid(trad, text) {
  const sp = trad.split('/')
  for (const s of sp) {
    if (normalize(s) === normalize(text)) return true
  }
  return false
}
/**
 * The entiere card for the translation of one word
 * @param opt.word all information about the word
 * @param opt.changeWord the fn to applay we need the change word
 */
export default function Translation({ word, changeWord }) {
  /** the array of attempts for the word */
  const [attempts, setAttempts] = useState([])
  /** use for shoing the traduction of the word */
  const [showTrad, setDisplayTrad] = useState(false)
  /** if the use don't know the trad */
  const [dontKnow, setDontKnow] = useState(false)
  /** when we are ready to change word  */
  const [goToChange, letsGoToChange] = useState(false)
  /** the input of the proposal trad by the use */
  const [textInput, setInput] = useState('')

  /**
   * Push the attempt to the list of all attempts
   * @param valid if the attempt is correct
   * @param wordAttempt the text of the attempt
   */
  const pushAttempt = (valid, wordAttempt) => {
    setAttempts([
      ...attempts,
      {
        valid,
        text: wordAttempt,
      },
    ])
    setDisplayTrad(valid)
  }

  /** When a new attempt appear, clear the input */
  useEffect(() => {
    setInput('')
  }, [attempts])

  /**
   * When we are triggering the changing word, clear all and all the changeWord from the parent
   * Triggered when use click on Next
   */
  useEffect(() => {
    if (goToChange) {
      letsGoToChange(false)
      setDontKnow(false)
      setDisplayTrad(false)
      setAttempts([])
      setInput('')
      changeWord()
    }
  }, [goToChange])

  /**
   * Show the traduction
   * we show trad when:
   * - the user click on don't know
   * - the user reach the attpemt limit
   * - the last push attempt is valid
   */
  useEffect(() => {
    if (dontKnow) {
      setDisplayTrad(true)
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
                showTrad={showTrad}
              />
            </Grid>
            <Grid item className="translation-attempts">
              <AttemptList
                maxAttepmt={3}
                attempts={attempts}
                onReachLimit={() => setDontKnow(true)}
              ></AttemptList>
            </Grid>
            <Grid item className="translation-input">
              <TranslationInput
                value={textInput}
                onChange={(e) => setInput(e.target.value)}
                disabled={showTrad}
                onSubmit={(propal) => {
                  pushAttempt(isValid(word.es, propal), propal)
                }}
              ></TranslationInput>
              <FinishGrpBtn
                onDontKnow={() => setDontKnow(true)}
                onNext={() => letsGoToChange(true)}
                readyForNext={showTrad}
              ></FinishGrpBtn>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
