import { ReactLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import { MouseEvent, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import './styles/main.scss'

CustomEase.create('hardEase', '.2,0,0,1')

const App = () => {
	const movingImageRef = useRef<HTMLDivElement>(null)
	const { ref: resizeObserverRef, width: movingImageWidth = 0 } =
		useResizeObserver<HTMLDivElement>()

	const handleMouseMove = (e: MouseEvent) => {
		const pos = Math.min(
			e.clientX,
			document.body.clientWidth - movingImageWidth - 60
		)
		gsap.to(movingImageRef.current, {
			x: Math.max(pos, 60),
			duration: 1.4,
			ease: 'power4'
		})
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
			<main onMouseMove={handleMouseMove}>
				<section>
					<h1>VUCKO</h1>
					<div ref={movingImageRef} className='moving-image'>
						<img
							ref={resizeObserverRef}
							src='/img/plant.jpg'
							alt='Plant behind glass'
						/>
					</div>
				</section>
			</main>
		</ReactLenis>
	)
}

export default App
