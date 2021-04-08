import React, { useRef, useEffect } from 'react'
import { Input, FormHelperText } from '@material-ui/core'

import { normalize, capitalize } from '../../services/utils.service'

export default function TranslationInput({
  value,
  onChange,
  disabled,
  onSubmit,
}) {
  const inputEl = useRef(null)

  useEffect(() => {
    if (!disabled) {
      inputEl.current.focus()
    }
  }, [disabled])
  return (
    <div>
      <Input
        inputRef={inputEl}
        autoFocus={true}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault()
            if (value.trim().length !== 0) {
              onSubmit(value)
            }
          }
        }}
        fullWidth={true}
        aria-describedby="standard-trans-helper-text"
        inputProps={{
          'aria-label': 'traduccion',
        }}
      />
      <FormHelperText id="standard-trans-helper-text">
        Traducción
      </FormHelperText>
    </div>
  )
}
