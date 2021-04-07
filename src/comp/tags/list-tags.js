import React from 'react'
import Tag from './tag'

/**
 * Display the list of tag
 * @param opt.tags the list of tag to display
 * @param opt.onClick the fn to apply when click on the the tag
 */
export default function ListTag({ tags, onClick }) {
  return (
    <div>
      {tags.map((tag, i) => {
        return <Tag key={i} onClick={() => onClick(tag)} text={tag}></Tag>
      })}
    </div>
  )
}
