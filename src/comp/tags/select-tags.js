import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

/**
 * The selection of tags
 * @param opt.availableTags all available tags for autocomplete
 * @param opt.selectTags the fn for select tag in the parent component
 */
export default function SelectTags({ availableTags, selectTags }) {
  return (
    <div>
      <Autocomplete
        multiple
        id="vocab-tags"
        limitTags={3}
        options={availableTags}
        groupBy={(tag) => tag.split('/')[0]}
        renderOption={(tag) => {
          const sp = tag.split('/')
          if (sp.length === 1) return 'todo'
          else {
            sp.shift()
            return sp.join('/')
          }
        }}
        onChange={(_, value) => selectTags(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Lista de temas"
            placeholder="Tema"
          />
        )}
      />
    </div>
  )
}
