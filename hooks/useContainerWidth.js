import { useLayoutEffect, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

const useContainerWidth = containerRef => {
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    setContainerWidth(containerRef.current.getBoundingClientRect().width)
  }, [containerRef])

  useResizeObserver(containerRef, entry => setContainerWidth(entry.contentRect.width))

  return containerWidth
}

export default useContainerWidth
