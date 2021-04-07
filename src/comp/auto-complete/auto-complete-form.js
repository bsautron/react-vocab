import React from 'react'
import { InputAdornment, FormControl, TextField } from '@material-ui/core'
import { LocalOffer } from '@material-ui/icons'
import './auto-complete.css'

/**
 * The form and the input of search
 * @param opt.label the label of the form
 * @param opt.value the value of the input
 * @param opt.onChange the fn when the input text change (use for perciste the input)
 */
export default function AutoCompleteForm({ label, value, onChange }) {
  return (
    <FormControl id="formTags" noValidate autoComplete="off">
      <TextField
        autoFocus
        label={label}
        value={value}
        onChange={onChange}
        InputProps={{
          /** TODO: Should be in paramater */
          startAdornment: (
            <InputAdornment position="start">
              <LocalOffer />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  )
}
