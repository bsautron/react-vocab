import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Attempt from './attempt'

/**
 * Display the list of attemps
 * @param opt.maxAttempt the maximum attempts for a translation
 * @param opt.attempts the list of attempt to display
 * @param opt.attempts the fn to apply when the limit if attempts is reached
 */
export default function AttemptList({ maxAttepmt, attempts, onReachLimit }) {
  /** When a new attempt appear, check if we reach the limit */
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
