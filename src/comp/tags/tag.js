import React from 'react'
import { Chip } from '@material-ui/core'
import './tag.css'

export default function Tag({ text, onClick }) {
  return (
    <div className="button-tag">
      <Chip label={text} color="primary" onDelete={(e) => onClick(e)} />
    </div>
  )
}
