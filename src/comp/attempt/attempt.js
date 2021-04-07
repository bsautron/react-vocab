import React from 'react'
import './attempt.css'
import { Close, Check } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'

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
