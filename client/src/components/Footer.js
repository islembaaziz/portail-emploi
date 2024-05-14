import React from 'react';
import logo from '../assets/Portail-emploi.png'

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col items-center bg-zinc-50 text-center mt-16 text-surface lg:text-left">
        <div className="container p-6">
          <div className="grid gap-4 items-center lg:grid-cols-2">
            <div className="mb-6 md:mb-0">
                <img src={logo} alt="" />
            </div>

            <div className="mb-6 md:mb-0">
              <h5 className="mb-2 font-medium uppercase">
                Explorez, postulez, réussissez.
              </h5>

              <p className="mb-4">
                Dans le monde dynamique d'aujourd'hui, chaque clic peut ouvrir
                une porte vers votre avenir professionnel. Chez Portail
                d'emploi, notre mission est de vous connecter aux opportunités
                qui correspondent à vos compétences et à vos aspirations. Avec
                notre plateforme conviviale, trouvez le job de vos rêves et
                lancez-vous dans une nouvelle aventure passionnante. N'attendez
                plus, votre carrière vous attend. Trouvez, Postulez, Réussissez
                avec Portail d'emploi.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-black/5 p-4 text-center">
          © 2024 Copyright :
          <a className='text-blue-500' href="https://islembaaziz.netlify.app/"> Baaziz Islem</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
