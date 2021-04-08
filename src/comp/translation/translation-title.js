import React from 'react'
import { Typography } from '@material-ui/core'
import { normalize, capitalize } from '../../services/utils.service'

export default function TranslationTitle({ word, trad, showTrad }) {
  return (
    <Typography variant="h3" align="center">
      {capitalize(word)} {showTrad ? ` - ${capitalize(trad)}` : ''}
    </Typography>
  )
}
