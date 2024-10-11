import React from 'react'
import logo from '../assets/logo.svg';
import { ArrowRight } from 'lucide-react';
import congratsIcon from '../assets/congrats.svg';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className='h-screen px-8 py-20 bg-myCustomColor-primaryC'>
        <img src={logo} alt="Logo" />

        <h1 className='font-bold text-2xl text-white py-10'>Félicitations, votre compte est créé !</h1>

        <img src={congratsIcon} alt="Félicitations" className='mx-auto'/>

        <section className='text-white'>
          <h2 className='text-lg my-10 font-bold'>Bienvenue sur AssistaVie, votre compagnon de santé</h2>

          <p className='mb-14 '>
          Je suis ici pour vous accompagner chaque jour, que ce soit pour répondre à vos questions, vous rappeler de prendre vos médicaments, ou vous aider en cas d&apos;urgence. Si jamais vous avez un souci de santé, je suis là pour vous guider et contacter la bonne personne, que ce soit un proche, une infirmière, ou les secours.
          </p>
        </section>

        <Link to ='/home' className='bg-white text-myCustomColor-primaryC px-3 py-2 rounded-md flex gap-3 justify-center items-center w-fit font-semibold'>
          <p>Je me lance</p>
          <ArrowRight />
        </Link>
    </div>
  )
}

export default WelcomePage