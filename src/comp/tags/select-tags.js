import React, { useState, useEffect } from 'react'
import AutoCompleteList from '../auto-complete/auto-complete-list'
import AutoCompleteForm from '../auto-complete/auto-complete-form'
import ListTag from './list-tags'

export default function SelectTags({ availableTags, selectTags }) {
  /* This is all the current selected tags, used for update the dic */
  const [selectedTags, setTags] = useState(['ropa'])
  /* Used only for pushing in the tag list after clicking to a tag */
  const [lastTagSelected, setLastTag] = useState()
  /* The last tag delted, used for pulling tag form tag list */
  const [lastTagDelected, setDeletedTag] = useState()
  /* The curent dic to use, filtred by tag */
  /* The text inside the input for choosing tag */
  const [textInputTag, setInputTag] = useState('')
  /* The autocomplete linsting tags from the input text */
  const [listingTags, setListingTags] = useState([])

  /**
   * When new tags added, select the new filter dic
   */
  useEffect(() => {
    if (lastTagSelected) setInputTag('')
    selectTags(selectedTags)
  }, [selectedTags, lastTagSelected])

  /**
   * When the input text for tag change
   * update the listing of auto complet
   * And clear the text tag input (close the autocomplete)
   */
  useEffect(() => {
    const newListing = availableTags.filter((generalTag) => {
      const searchTag = textInputTag.toLocaleLowerCase()
      if (searchTag.length >= 2) return generalTag.includes(searchTag)
      return false
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
      <AutoCompleteForm
        label="Theme"
        value={textInputTag}
        onChange={(e) => setInputTag(e.target.value)}
      ></AutoCompleteForm>
      <ListTag tags={selectedTags} onClick={setDeletedTag}></ListTag>
      <AutoCompleteList
        list={listingTags}
        onClick={setLastTag}
      ></AutoCompleteList>
    </div>
  )
}
