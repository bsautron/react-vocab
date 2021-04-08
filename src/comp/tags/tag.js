import React from 'react'
import { Chip } from '@material-ui/core'
import './tag.css'

export default function Tag({ text, onClick }) {
  return (
    <div className="button-tag">
      <Chip
        label={text}
        variant="outlined"
        color="secondary"
        onDelete={(e) => onClick(e)}
      />
    </div>
  )
}
