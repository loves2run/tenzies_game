import { useWindowSize } from "@react-hook/window-size"
import Confetti from 'react-confetti'

export default function ConfettiComp() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}