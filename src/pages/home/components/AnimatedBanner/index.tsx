import { MouseEvent, MouseEventHandler } from 'react'
import styles from './index.module.scss'

const AnimatedBanner = () => {
  const createStar = (x: number, y: number) => {
    const star = document.createElement('div')
    star.className = styles.star
    star.style.left = `${x}px`
    star.style.top = `${y}px`
    star.style.animationDuration = `${Math.random() * 1 + 0.6}s`

    document.body.appendChild(star)

    star.addEventListener('animationend', () => {
      star.remove()
    })
  }

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const x = event.clientX
    const y = event.clientY

    const numberOfStars = 5
    for (let i = 0; i < numberOfStars; i++) {
      createStar(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10)
    }
  }

  return <div className={styles.banner} onMouseMove={onMouseMove} />
}

export default AnimatedBanner
