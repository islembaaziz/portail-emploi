import React, { useState } from 'react';
import logo from '../assets/Portail-emploi.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { API } from '../constant';
import Spinner from '../components/shared/Spinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email.trim()) {
      setErrors((prevState) => ({ ...prevState, email: 'Email est obligatoire !' }));
      return;
    }
    if (!password.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Mot de passe esr obligatoire !',
      }));
      return;
    }
    try {
      dispatch(showLoading());
      const { data } = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem('token', data.token);
        toast.success('Connecté avec succès ');
        navigate('/');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Identifiant invalide, veuillez réessayer!');
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form className="h-full bg-neutral-200" onSubmit={handleSubmit}>
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    {/* <!-- Left column container--> */}
                    <div className="px-4 md:px-0 lg:w-6/12">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <img className="mx-auto w-80" src={logo} alt="logo" />
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            Trouvez votre voie vers le succès !
                          </h4>
                        </div>

                        <div>
                          <p className="mb-4">
                            Veuillez vous connecter à votre compte
                          </p>
                          {/* <!--Email input--> */}
                          <input
                            type="email"
                            placeholder=" Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors((prevState) => ({
                                ...prevState,
                                email: '',
                              }));
                            }}
                            name="email"
                            className="mb-4 rounded-md w-full border-solid border-2  border-gray-400 "
                          />
                           {errors.email && <p className="text-red-500">{errors.email}</p>}
                          {/* <!--Password input--> */}
                          <input
                            type="password"
                            placeholder=" Mot de passe"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors((prevState) => ({
                                ...prevState,
                                password: '',
                              }));
                            }}
                            name="password"
                            className={`mb-4 rounded-md w-full border-solid border-2 border-gray-400 ${
                              errors.password ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.password && <p className="text-red-500">{errors.password}</p>}
                          {/* <!--Submit button--> */}
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="submit"
                              style={{
                                background:
                                  'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                              }}
                            >
                              Se Connecter
                            </button>

                            {/* <!--Forgot password link--> */}
                            <a href="#!">Mot de passe oublié?</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right column container with background and description--> */}
                    <div
                      className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                      style={{
                        background:
                          'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                      }}
                    >
                      <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                          Trouvez votre voie vers le succès
                        </h4>
                        <p className="text-sm">
                          Dans le monde dynamique d'aujourd'hui, chaque clic
                          peut ouvrir une porte vers votre avenir professionnel.
                          Chez Portail d'emploi, notre mission est de vous
                          connecter aux opportunités qui correspondent à vos
                          compétences et à vos aspirations. Avec notre
                          plateforme conviviale, trouvez le job de vos rêves et
                          lancez-vous dans une nouvelle aventure passionnante.
                          N'attendez plus, votre carrière vous attend. Trouvez,
                          Postulez, Réussissez avec Portail d'emploi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
