import React, { useRef, useEffect } from 'react'
import { Input, FormHelperText } from '@material-ui/core'

/**
 * The input for the translation
 * @param opt.value the value of the input
 * @param opt.disabled to disable the input text
 * @param opt.onChange the fn to apply for any change of the input
 * @param opt.onSubmit the fn to applay when submit
 */
export default function TranslationInput({
  value,
  disabled,
  onChange,
  onSubmit,
}) {
  /** the ref of the input for auto focus */
  const inputEl = useRef(null)

  /** When the input becoming available, focus on it */
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
