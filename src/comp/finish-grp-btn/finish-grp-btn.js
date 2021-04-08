import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

/**
 * Display the btn when the user dont know the translation and want to change word
 * @param opt.readyForNext Switch between dont know and next btn
 * @param opt.onDontKnow the fn to apply when the user don't know
 * @param opt.onNext the fn to apply when whant to change word
 */
export default function FinishGrpBtn({ readyForNext, onDontKnow, onNext }) {
  /** the ref of the next btn */
  const btnEl = useRef(null)

  /** When the we are ready for clickin the next btn, focus on it */
  useEffect(() => {
    btnEl.current.focus()
  }, [readyForNext])

  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button disabled={readyForNext} onClick={onDontKnow}>
        No sé
      </Button>

      <Button ref={btnEl} disabled={!readyForNext} onClick={onNext}>
        Próximo
      </Button>
    </ButtonGroup>
  )
}
