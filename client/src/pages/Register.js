import React, { useState } from 'react';
import logo from '../assets/Portail-emploi.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { API } from '../constant';
import Spinner from '../components/shared/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    adresse: '',
    role: 'Candidat',
  });
  const [errors, setErrors] = useState({});
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux state
  const { loading } = useSelector((state) => state.alerts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le prénom est obligatoire !';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est obligatoire !';
    if (!formData.email.trim()) newErrors.email = 'Email est obligatoire !';
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'Mot de passe est obligatoire et doit contenir au moins 6 caractères !';
    }
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est obligatoire !';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      dispatch(showLoading());
      const { data } = await axios.post(`${API}/auth/register`, formData);
      if (data.success) {
        dispatch(hideLoading());
        toast.success('Inscription réussie');
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.response?.data?.message || 'Erreur lors de l\'inscription, veuillez réessayer!');
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
                            Veuillez vous inscrire pour créer un compte
                          </p>
                          {/* <!--Name input--> */}
                          <input
                            type="text"
                            placeholder="Prénom"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            className="mb-4 rounded-md w-full border-solid border-2 border-gray-400"
                          />
                          {errors.name && <p className="text-red-500">{errors.name}</p>}

                          {/* <!--LastName input--> */}
                          <input
                            type="text"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                            className="mb-4 rounded-md w-full border-solid border-2 border-gray-400"
                          />
                          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

                          {/* <!--Email input--> */}
                          <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            className="mb-4 rounded-md w-full border-solid border-2 border-gray-400"
                          />
                          {errors.email && <p className="text-red-500">{errors.email}</p>}

                          {/* <!--Password input--> */}
                          <input
                            type="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            className={`mb-4 rounded-md w-full border-solid border-2 border-gray-400 ${
                              errors.password ? 'border-red-500' : ''
                            }`}
                          />
                          {errors.password && <p className="text-red-500">{errors.password}</p>}

                          {/* <!--Adresse input--> */}
                          <input
                            type="text"
                            placeholder="Adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            name="adresse"
                            className="mb-4 rounded-md w-full border-solid border-2 border-gray-400"
                          />
                          {errors.adresse && <p className="text-red-500">{errors.adresse}</p>}

                          {/* <!--Role input (hidden)--> */}
                          <input
                            type="hidden"
                            name="role"
                            value={formData.role}
                          />

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
                              S'inscrire
                            </button>
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

export default Register;
