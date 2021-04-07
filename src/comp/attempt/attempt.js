import React from 'react'
import './attempt.css'
import { Close, Check } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'

export default function Attempt({ valid, hidden, text }) {
  if (hidden === true) {
    return <div className="attempt hidden"></div>
  }
  return (
    <div className="attempt">
      {valid === true ? <Check /> : <Close />}
      <Typography>{text}</Typography>
    </div>
  )
}
