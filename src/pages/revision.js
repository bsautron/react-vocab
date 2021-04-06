import React, { useState, useEffect } from 'react'
import { dic } from '../db.json'
import {
  InputAdornment,
  FormControl,
  Button,
  TextField,
  Icon,
} from '@material-ui/core'
import './revision.css'
import { LocalOffer, Close } from '@material-ui/icons'

const availableTagsColors = [
  { bg: '#78281F', fg: '#F4F6F7' },
  { bg: '#145A32', fg: '#F4F6F7' },
  { bg: '#873600', fg: '#F4F6F7' },
  { bg: '#6C3483', fg: '#F4F6F7' },
  { bg: '#3498DB', fg: '#F4F6F7' },
]

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
    for (const wTag of word.tags)
      for (const dTag of tags) {
        if (wTag === dTag) return true
        if (`${wTag}`.startsWith(dTag)) return true
      }
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

function selectColorFromTag(tag) {
  return availableTagsColors[tag.length % availableTagsColors.length]
}

const allTags = getAllTags()

function PageRevisions() {
  /* This is all the current selected tags, used for update the dic */
  const [selectedTags, setTags] = useState([])
  /* Used only for pushing in the tag list after clicking to a tag */
  const [lastTagSelected, setLastTag] = useState()
  /* The last tag delted, used for pulling tag form tag list */
  const [lastTagDelected, setDeletedTag] = useState()
  /* The curent dic to use, filtred by tag */
  const [selectedDic, setDic] = useState([])
  /* The text inside the input for choosing tag */
  const [textInputTag, setInputTag] = useState('')
  /* The autocomplete linsting tags from the input text */
  const [listingTags, setListingTags] = useState([])

  /**
   * When new tags added, select the new filter dic
   */
  useEffect(() => {
    setDic(getDicByTags(selectedTags))
    if (lastTagSelected) setInputTag('')
  }, [selectedTags, lastTagSelected])

  /**
   * When the input text for tag change
   * update the listing of auto complet
   * And clear the text tag input (close the autocomplete)
   */
  useEffect(() => {
    const newListing = allTags.filter((generalTag) => {
      if (textInputTag.length >= 2) return generalTag.includes(textInputTag)
    })
    setListingTags(newListing)
  }, [textInputTag])

  /**
   * When the click to a tag
   * after the lastTagSelected setted
   * use this effet to push in the array of tag
   */
  useEffect(() => {
    if (lastTagSelected) setTags([lastTagSelected, ...selectedTags].sort())
  }, [lastTagSelected])

  /**
   * When click on existing tag
   * remove it in the tag list
   */
  useEffect(() => {
    if (lastTagDelected)
      setTags(selectedTags.filter((tag) => tag !== lastTagDelected))
  }, [lastTagDelected])

  return (
    <div>
      <FormControl id="formTags" noValidate autoComplete="off">
        <TextField
          autoFocus
          label="Theme"
          value={textInputTag}
          onChange={(e) => setInputTag(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalOffer />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      {selectedTags.map((t, i) => {
        const colors = selectColorFromTag(t)
        return (
          <div class="button-tag">
            <Button
              key={i}
              variant="contained"
              color="primary"
              onClick={(e) => setDeletedTag(t)}
              endIcon={<Close />}
              labelStyle={{
                color: colors.fg,
              }}
              style={{
                backgroundColor: colors.bg,
              }}
            >
              {t}
            </Button>
          </div>
        )
      })}
      <div class="tags-autocomplete">
        {listingTags.map((l, i) => {
          return (
            <Button key={i} onClick={() => setLastTag(l)} color="primary">
              {l}
            </Button>
          )
        })}
      </div>

      <div>
        {selectedDic.map((d) => (
          <div>
            {d.fr} = [{d.tags.join(' , ')}]
          </div>
        ))}
      </div>
    </div>
  )
}

export default PageRevisions
