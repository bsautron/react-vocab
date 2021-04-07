import React, { useState, useEffect } from 'react'
import { dic } from '../db.json'
import './revision.css'
import SelectTags from '../comp/tags/select-tags'
import Translation from '../comp/translation/translation'
import { Grid } from '@material-ui/core'

/**
 * Select word with mathing tags
 * @example
 * A
 * A/B
 * A/C
 *
 * input: A -> A A/B A/C
 * input: A/B -> A/B
 * input C -> --
 *
 * @param tags the list of possible tags
 */
function getDicByTags(tags) {
  return dic.filter((word) => {
    for (const wTag of word.tags) {
      for (const dTag of tags) {
        if (wTag === dTag) return true
        if (`${wTag}`.startsWith(dTag)) return true
      }
    }
    return false
  })
}

/**
 * Return all possible tags in the dic
 */
function getAllTags() {
  const tags = new Set()
  dic.forEach((word) => {
    for (const wTag of word.tags) {
      wTag.split('/').reduce((acc, subTag) => {
        if (acc.length === 0) {
          tags.add(subTag)
          return subTag
        } else {
          const tag = `${acc}/${subTag}`
          tags.add(tag)
          return tag
        }
      }, '')
    }
  })
  return [...tags.values()]
}

const allTags = getAllTags()

export default function PageRevisions() {
  /* The curent dic to use, filtred by tag */
  const [selectedDic, setDic] = useState([])
  /* The current tags selected for filtering the dic */
  const [tags, setTags] = useState([])
  /* The current word to translate */
  const [currentWord, setWord] = useState({})

  const getRandWord = (fromDic) =>
    fromDic.sort(() => Math.random() - 0.5)[0] || {}
  /**
   * When new tags added, select the new filter dic
   */

  function otherWord() {
    setWord(getRandWord(selectedDic))
  }
  useEffect(() => {
    setDic(getDicByTags(tags))
  }, [tags])

  useEffect(() => {
    otherWord()
  }, [selectedDic])

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Grid item>
        <SelectTags availableTags={allTags} selectTags={setTags}></SelectTags>
      </Grid>
      {selectedDic.length ? (
        <Grid item>
          <Translation word={currentWord} changeWord={otherWord}></Translation>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  )
}
