import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const FormComponent = ({
  title,
  fields,
  initialValues,
  onSubmit,
  submitButtonLabel,
  onClose,
}) => {
  const [formValues, setFormValues] = useState(initialValues || {});

  useEffect(() => {
    setFormValues(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 relative w-full max-w-md">
        <XMarkIcon
          onClick={onClose}
          className="h-8 w-8 absolute top-6 right-8 text-red-600"
        />
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="mb-1 text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.enum ? (
                <select
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                >
                  {field.enum.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-md"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {submitButtonLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
