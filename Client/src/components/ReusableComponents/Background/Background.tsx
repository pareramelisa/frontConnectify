import React, {useCallback} from 'react'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles'
import type { Engine} from 'tsparticles-engine'
import { optionsParticles } from '../../Cover/particlesOptions'


const Background = () => {

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <div   id='cover'
    style={{
      position: 'fixed',  // Fija la posición del fondo
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,  // Establece un índice Z negativo para colocar el fondo por debajo
    }}
  >
      <Particles className='particlesCover' id='tsparticles' init={particlesInit} loaded={particlesLoaded} options={optionsParticles}/>
      
    </div>
  )
}

export default Background