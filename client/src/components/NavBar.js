import React from 'react';
import logo from '../assets/Portail-emploi.png';

const NavBar = () => {
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: 'about', label: 'About' },
  
  ];

  // Check if user token exists in localStorage
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  return (
    <nav className="flex fixed top-0 left-0 w-full  z-50 flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="/">
            <img className="max-w-72" src={logo} alt="TE Logo" loading="lazy" />
          </a>
        </div>
        <ul className="flex-1 flex gap-12 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className=" hover:text-orange-600 text-xl">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div>
          {isLoggedIn ? (
            <a href="/dashboard">
              <button
                type="button"
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
                className="me-3 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none "
              >
                Dashboard
              </button>
            </a>
          ) : (
            <a href="/login">
              <button
                type="button"
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
                className="me-3 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none "
              >
                Se Connecter
              </button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
