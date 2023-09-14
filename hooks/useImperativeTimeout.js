import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const useImperativeTimeout = (callback, delay) => {
  const timeoutId = useRef(null)
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // this handle clears the timeout
  const clear = useCallback(() => {
    clearTimeout(timeoutId.current)
  }, [])
  // this handle sets our timeout
  const set = useCallback(() => {
    // but clears the old one first
    clear()
    timeoutId.current = setTimeout(() => {
      savedCallback.current()
    }, delay)
  }, [clear, delay])

  // also, clear the timeout on unmount
  useEffect(() => clear, [clear])

  return { set, clear }
}

export default useImperativeTimeout
