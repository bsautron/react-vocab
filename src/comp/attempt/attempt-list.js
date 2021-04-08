import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import Attempt from './attempt'

export default function AttemptList({ maxAttepmt, attempts, onReachLimit }) {
  useEffect(() => {
    if (attempts.length >= maxAttepmt) {
      onReachLimit()
    }
  }, [attempts])
  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      {Array.from({ length: maxAttepmt }).map((_, i) => {
        return (
          <Grid item>
            <Attempt
              hidden={!attempts[i]}
              text={(attempts[i] || {}).text}
              valid={(attempts[i] || {}).valid}
            ></Attempt>
          </Grid>
        )
      })}
    </Grid>
  )
}
