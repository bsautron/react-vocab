import React from 'react'
import { Button } from '@material-ui/core'
import './auto-complete.css'

/**
 * Display a list of autocomplete when they have items
 * @param opt.list the list to display for selection of the autocomplete
 * @param opt.onClick the fn to applay when click on each item
 */
export default function AutoCompleteList({ list, onClick }) {
  return (
    <div className="tags-autocomplete">
      {list.map((item, i) => {
        return (
          <Button key={i} onClick={() => onClick(item)} color="primary">
            {item}
          </Button>
        )
      })}
    </div>
  )
}
