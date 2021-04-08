import React from 'react'
import { Typography } from '@material-ui/core'
import { capitalize } from '../../services/utils.service'

/**
 * Display the word to translate and eventualy his translation
 * @param opt.word the text of the word to translate
 * @param opt.trad the text of translation of the word
 * @param opt.showTrad show the translation if true
 */
export default function TranslationTitle({ word, trad, showTrad }) {
  return (
    <Typography variant="h3" align="center">
      {capitalize(word)} {showTrad ? ` - ${capitalize(trad)}` : ''}
    </Typography>
  )
}
