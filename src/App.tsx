import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { MouseEvent, useRef, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import './styles/main.scss'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const lenis = useLenis()

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const mainRef = useRef<HTMLElement>(null)
  const movingImageRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (isOpen) return

    const pos = Math.min(
      e.clientX -
        (movingImageRef.current?.getBoundingClientRect().width || 0) / 2,
      document.body.clientWidth -
        (movingImageRef.current?.getBoundingClientRect().width || 0) -
        60
    )
    gsap.to(movingImageRef.current, {
      x: Math.max(pos, 60),
      duration: 1.4,
      ease: 'power4.out'
    })
  }

  gsap.fromTo(
    movingImageRef.current,
    {
      x: windowWidth / 2 - (movingImageRef.current?.clientWidth || 0) / 2,
      y: 0,
      width: (32 * windowWidth) / 100,
      height: (16 * windowWidth) / 100
    },
    {
      y:
        mainRef.current?.clientHeight && mainRef.current?.clientHeight / 2 - 80,
      width: windowWidth - 60 * 2,
      height: (80 * windowHeight) / 100,
      ease: 'none',
      scrollTrigger: {
        trigger: mainRef.current,
        start: '10% 20%',
        end: '90% 80%',
        scrub: true,
        onUpdate: () => {
          if (isOpen) return
          gsap.to(movingImageRef.current, {
            x: Math.min(
              movingImageRef.current?.getBoundingClientRect().x || 0,
              document.body.clientWidth -
                (movingImageRef.current?.getBoundingClientRect().width || 0) -
                60
            )
          })
        }
      }
    }
  )

  const openPicture = () => {
    if (isOpen) {
      gsap.to(movingImageRef.current, {
        onStart: () => {
          setIsOpen(false)
          lenis.start()
        },
        top: '10%',
        x: windowWidth / 2 - (movingImageRef.current?.clientWidth || 0) / 2,
        width: (32 * windowWidth) / 100,
        height: (16 * windowWidth) / 100,
        borderRadius: 16,
        duration: 1.4,
        ease: 'power4.out'
      })
    } else {
      setIsOpen(true)
      gsap.to(movingImageRef.current, {
        onStart: () => {
          lenis.stop()
        },
        top: 0,
        x: 0,
        y: window.scrollY,
        width: windowWidth,
        height: windowHeight,
        borderRadius: 0,
        duration: 1.4,
        ease: 'power4.out'
      })
    }
  }

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
      <main ref={mainRef} onMouseMove={handleMouseMove}>
        <section>
          <h1>VUCKO</h1>
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eos
            nemo id autem, magnam temporibus deleniti molestiae expedita vel
            dolor, quibusdam incidunt nesciunt corporis eaque. Sint ullam
            dolores reprehenderit quia.
          </h3>
          <h3>
            Voluptatum vel dolore cumque consectetur excepturi quis quibusdam
            quia, fuga voluptatem ea modi facilis possimus atque provident hic
            praesentium sunt odit.
          </h3>
          <div
            ref={movingImageRef}
            className='moving-image'
            onClick={openPicture}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17 20'>
              <path
                fillRule='evenodd'
                d='M15.527 11.955 4.081 19.434A2 2 0 0 1 .987 17.76V2.8A2 2 0 0 1 4.08 1.127l11.446 7.48a2 2 0 0 1 0 3.348Z'
              />
            </svg>
            <img src='./img/plant.jpeg' alt='Plant behind glass' />
          </div>
        </section>
      </main>
    </ReactLenis>
  )
}

export default App
