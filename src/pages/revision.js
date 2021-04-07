import React, { useState, useEffect } from 'react'
import { dic } from '../db.json'
import './revision.css'
import SelectTags from '../comp/tags/select-tags'
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

  /**
   * When new tags added, select the new filter dic
   */
  useEffect(() => {
    setDic(getDicByTags(tags))
  }, [tags])

  return (
    <div>
      <SelectTags availableTags={allTags} selectTags={setTags}></SelectTags>

      <div>
        {selectedDic.map((d, i) => (
          <div key={i}>
            {d.fr} = {d.es}
          </div>
        ))}
      </div>
    </div>
  )
}
