import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Spinner from './shared/Spinner';

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import Card from './shared/Card';
import axios from 'axios';
import { API } from '../constant';

const Filter = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('latest'); // Default sort option
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const perPage = 5;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterValue, isChecked) => {
    if (isChecked) {
      setSelectedFilters([...selectedFilters, filterValue]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterValue)
      );
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/job/get-job`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sort: sortOption,
            workType: selectedFilters.join(','), // Pass selected filters as a comma-separated string
            search: searchQuery, // Add search query parameter
            page: currentPage,
            limit: perPage,
          },
        });
        setJobs(response.data.jobs);
        setNumOfPages(response.data.numOfPage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs data:', error);
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 300); // debounce time in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [sortOption, selectedFilters, searchQuery, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortOptions = [
    { name: 'Latest', value: 'latest' },
    { name: 'Oldest', value: 'oldest' },
    { name: 'A-Z', value: 'a-z' },
    { name: 'Z-A', value: 'z-a' },
  ];

  const filters = [
    {
      id: 'Categorie',
      name: 'Categorie',
      options: [
        { name: 'Temps plein', label: 'Temps plein', value: 'temps-plein' },
        {
          name: 'Temps partiel',
          label: 'Temps partiel',
          value: 'temps-partiel',
        },
        {
          name: 'Emplois saisonniers',
          label: 'Emplois saisonniers',
          value: 'emplois-saisonnier',
        },
        {
          name: 'Emplois à distance',
          label: 'Emplois à distance',
          value: 'emplois-distance',
        },
        { name: 'Stages', label: 'Stages', value: 'stage' },
      ],
    },
  ];

  return (
    <div name="offres" className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Nos offres
            </h1>
            <div className="mt-4 mb-8">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-300"
              />
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <button
                              onClick={() => setSortOption(option.value)}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={selectedFilters.includes(
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}

              <div className="lg:col-span-3">
                <div className=" mt-16 justify-center">
                  {loading ? (
                    <Spinner />
                  ) : (
                    jobs.map((job) => <Card key={job._id} job={job} />)
                  )}
                </div>
                <div className="flex justify-center mt-8">
                  {[...Array(numOfPages).keys()].map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page + 1)}
                      className={`mx-1 px-3 py-1 border font-bold rounded-md ${
                        currentPage === page + 1 ? 'bg-gradient-to-r from-orange-500 via-red-600 to-purple-700 text-white font-bold rounded-md' : ''
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Filter;
