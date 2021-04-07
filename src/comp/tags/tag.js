import React from 'react'
import { Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import './tag.css'

export default function Tag({ text, onClick }) {
  return (
    <div className="button-tag">
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => onClick(e)}
        endIcon={<Close />}
      >
        {text}
      </Button>
    </div>
  )
}
