import React, {useCallback} from 'react'
import Particles from 'react-tsparticles'
import {loadFull} from 'tsparticles'
import type {Engine} from 'tsparticles-engine'
import { optionsParticles } from './particlesOptions'
import LandingPage from '../Landing/Landing'

const Cover = () => {

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <div id='cover'>
      <Particles className='particlesCover' id='tsparticles' init={particlesInit} loaded={particlesLoaded} options={optionsParticles}/>
      <LandingPage/>
    </div>
  )
}

export default Cover