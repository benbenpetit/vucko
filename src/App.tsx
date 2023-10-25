import { ReactLenis } from '@studio-freight/react-lenis'
import { useEffect, useState } from 'react'
import './styles/main.scss'

const App = () => {
  const [mouseX, setMouseX] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <ReactLenis root>
      <header>
        <a href='#'>
          <span>VUCKO</span>
          <sup>TM</sup>
        </a>
        <span className='date'>Toronto, Canada</span>
        <nav>
          <ul>
            <li>Projets,</li>
            <li>Approach,</li>
            <li>About,</li>
            <li>Contact</li>
          </ul>
        </nav>
        <span className='point' />
      </header>
      <main>
        <section>
          <h1>VUCKO</h1>
          <div className='moving-image' style={{ left: mouseX }}>
            <img src='/img/plant.jpg' alt='Plant behind glass' />
          </div>
        </section>
      </main>
    </ReactLenis>
  )
}

export default App
