import React from 'react'
import './attempt.css'
import { Close, Check } from '@material-ui/icons'
import { Grid } from '@material-ui/core'

/**
 * Display an attempt, green if it's valid, red otherwise
 * @param opt.valid if the attempt is valid or not
 * @param opt.hidden hide the attempt and keep the reserved space in the page
 * @param opt.text the text of the attempt
 */
export default function Attempt({ valid, hidden, text }) {
  if (hidden === true) {
    return <div className="attempt hidden"></div>
  }
  return (
    <div className="attempt">
      <Grid
        className={valid === true ? 'attempt-valid' : 'attempt-unvalid'}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>{valid === true ? <Check /> : <Close />}</Grid>
        <Grid item className="attempt-text">
          {text}
        </Grid>
      </Grid>
    </div>
  )
}
