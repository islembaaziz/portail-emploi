import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../constant';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Spinner from '../components/shared/Spinner';
import logo from '../assets/logo512.png';

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
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email est obligatoire !',
      }));
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
      const { data } = await axios.post(`${API}/auth/admin-login`, {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        console.log(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Connecté avec succès ');
        navigate('/dashboard');
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response && error.response.status === 403) {
        toast.error('Non autorisé à se connecter');
      } else {
        toast.error('Identifiant invalide, veuillez réessayer!');
      }
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
            >
              <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
              Portail d'emploi
            </a>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Connectez-vous à votre compte administrateur
                </h1>
                <form  onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Votre email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prevState) => ({
                          ...prevState,
                          email: '',
                        }));
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="nom@email.com"
                    />
                     {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                          )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prevState) => ({
                          ...prevState,
                          password: '',
                        }));
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    {errors.password && (
                            <p className="text-red-500">{errors.password}</p>
                          )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Se connecter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
