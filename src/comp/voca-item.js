import React, { useState } from 'react'
import './voca-item.css'

export default function VocaItem(props) {
  const [status, setStatus] = useState(null)
  const [inputText, setInputText] = useState('')
  const verify = (e) => {
    e.preventDefault()
    if (
      inputText ===
      props.item.es.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    ) {
      setStatus(true)
      setInputText('')
    } else {
      setStatus(false)
    }
  }
  const clear = () => {
    setStatus(null)
    setInputText('')
  }
  const selectNewOne = () => {
    clear()
    props.selectNewOne()
  }
  return (
    <div>
      <span className={'voca-fr' + (status === false ? ' bad' : '')}>
        {props.item.fr[0].toUpperCase() + props.item.fr.slice(1)}
      </span>
      <form id="vocab" onSubmit={verify}>
        {status !== true && (
          <input
            className={'voca-input' + (status === false ? ' bad' : '')}
            type="text"
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></input>
        )}
      </form>

      {status === true && (
        <span className="voca-msg good">{props.item.es}</span>
      )}
    </div>
  )
}
