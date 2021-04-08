import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
export default function FinishGrpBtn({ readyForNext, onDontKnow, onNext }) {
  const btnEl = useRef(null)

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
