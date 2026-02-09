import React, { useState, useEffect, useCallback, useReducer, useMemo, useRef, createContext, useContext } from 'react';
import { AlertCircle, CheckCircle2, Plus, Trash2, Settings, Eye, Code, Save, RefreshCw } from 'lucide-react';

// ============================================================================
// VALIDATION ENGINE
// ============================================================================

const VALIDATORS = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0 ? null : 'This field is required';
    return value?.toString().trim() ? null : 'This field is required';
  },
  email: (value) => {
    if (!value) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address';
  },
  minLength: (value, min) => {
    if (!value) return null;
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },
  maxLength: (value, max) => {
    if (!value) return null;
    return value.length <= max ? null : `Must not exceed ${max} characters`;
  },
  pattern: (value, regex, message) => {
    if (!value) return null;
    return new RegExp(regex).test(value) ? null : message || 'Invalid format';
  },
  min: (value, min) => {
    if (!value && value !== 0) return null;
    return Number(value) >= min ? null : `Must be at least ${min}`;
  },
  max: (value, max) => {
    if (!value && value !== 0) return null;
    return Number(value) <= max ? null : `Must not exceed ${max}`;
  },
  custom: (value, validatorFn) => {
    if (!validatorFn) return null;
    try {
      return validatorFn(value);
    } catch (error) {
      return 'Validation error';
    }
  }
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// Advanced form state management with validation
const useFormValidation = (schema, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const validateField = useCallback((fieldId, value, fieldConfig) => {
    if (!fieldConfig.validations) return null;

    for (const validation of fieldConfig.validations) {
      const validator = VALIDATORS[validation.type];
      if (!validator) continue;

      const error = validator(value, validation.value, validation.message);
      if (error) return error;
    }

    return null;
  }, []);

  const validateAllFields = useCallback(() => {
    const newErrors = {};
    
    schema.fields.forEach(field => {
      const error = validateField(field.id, values[field.id], field);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema.fields, values, validateField]);

  const handleChange = useCallback((fieldId, value) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Validate on change if field has been touched or form has been submitted
    if (touched[fieldId] || submitCount > 0) {
      const field = schema.fields.find(f => f.id === fieldId);
      const error = validateField(fieldId, value, field);
      setErrors(prev => ({
        ...prev,
        [fieldId]: error
      }));
    }
  }, [touched, submitCount, schema.fields, validateField]);

  const handleBlur = useCallback((fieldId) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    const field = schema.fields.find(f => f.id === fieldId);
    const error = validateField(fieldId, values[fieldId], field);
    setErrors(prev => ({
      ...prev,
      [fieldId]: error
    }));
  }, [values, schema.fields, validateField]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setSubmitCount(prev => prev + 1);
    setIsValidating(true);

    const isValid = validateAllFields();

    if (isValid && onSubmit) {
      await onSubmit(values);
    }

    setIsValidating(false);
    return isValid;
  }, [values, validateAllFields]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitCount(0);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isValidating,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    isValid: Object.keys(errors).length === 0
  };
};

// Local storage persistence hook
const useFormPersistence = (key, schema) => {
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setSavedData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }, [key]);

  const saveForm = useCallback((values) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        values,
        timestamp: Date.now(),
        schemaVersion: schema.version || '1.0'
      }));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [key, schema.version]);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(key);
    setSavedData(null);
  }, [key]);

  return { savedData, saveForm, clearSaved };
};

// Debounce hook for auto-save
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// ============================================================================
// FORM SCHEMA CONTEXT
// ============================================================================

const FormContext = createContext(null);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

// ============================================================================
// DYNAMIC FORM COMPONENTS
// ============================================================================

const FormField = ({ field, value, error, touched, onChange, onBlur }) => {
  const inputId = `field-${field.id}`;
  const errorId = `${inputId}-error`;
  const descId = field.description ? `${inputId}-desc` : undefined;

  const commonProps = {
    id: inputId,
    name: field.id,
    value: value || '',
    onChange: (e) => onChange(field.id, e.target.value),
    onBlur: () => onBlur(field.id),
    'aria-invalid': touched && error ? 'true' : 'false',
    'aria-describedby': [descId, touched && error ? errorId : null].filter(Boolean).join(' ') || undefined,
    required: field.validations?.some(v => v.type === 'required'),
    className: `w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 
                ${touched && error 
                  ? 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-4 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}
                outline-none`
  };

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return <input type={field.type} {...commonProps} placeholder={field.placeholder} />;
      
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 4}
            placeholder={field.placeholder}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id={inputId}
              name={field.id}
              checked={value || false}
              onChange={(e) => onChange(field.id, e.target.checked)}
              onBlur={() => onBlur(field.id)}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-blue-600 
                         focus:ring-4 focus:ring-blue-100 transition-all"
              aria-invalid={touched && error ? 'true' : 'false'}
              aria-describedby={touched && error ? errorId : undefined}
            />
            <label htmlFor={inputId} className="text-gray-700 flex-1 cursor-pointer">
              {field.label}
              {field.validations?.some(v => v.type === 'required') && (
                <span className="text-red-500 ml-1" aria-label="required">*</span>
              )}
            </label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-3" role="radiogroup" aria-labelledby={inputId}>
            {field.options?.map(opt => (
              <div key={opt.value} className="flex items-center gap-3">
                <input
                  type="radio"
                  id={`${inputId}-${opt.value}`}
                  name={field.id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  onBlur={() => onBlur(field.id)}
                  className="w-5 h-5 border-2 border-gray-300 text-blue-600 
                             focus:ring-4 focus:ring-blue-100 transition-all"
                />
                <label htmlFor={`${inputId}-${opt.value}`} className="text-gray-700 cursor-pointer">
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div className="space-y-2">
      {field.type !== 'checkbox' && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-800">
          {field.label}
          {field.validations?.some(v => v.type === 'required') && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
      )}
      
      {field.description && (
        <p id={descId} className="text-sm text-gray-600 -mt-1">{field.description}</p>
      )}
      
      {renderInput()}
      
      {touched && error && (
        <div id={errorId} className="flex items-center gap-2 text-red-600 text-sm" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// DYNAMIC FORM RENDERER
// ============================================================================

const DynamicForm = ({ schema, onSubmit, showPersistence = true }) => {
  const {
    values,
    errors,
    touched,
    isValidating,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues
  } = useFormValidation(schema);

  const { savedData, saveForm, clearSaved } = useFormPersistence(`form-${schema.id}`, schema);
  const debouncedValues = useDebounce(values, 1000);
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (showPersistence && Object.keys(debouncedValues).length > 0) {
      saveForm(debouncedValues);
    }
  }, [debouncedValues, saveForm, showPersistence]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = await handleSubmit(async (data) => {
      if (onSubmit) {
        await onSubmit(data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        if (showPersistence) clearSaved();
      }
    });
  };

  const loadSavedData = () => {
    if (savedData?.values) {
      setValues(savedData.values);
    }
  };

  const errorSummary = useMemo(() => {
    return Object.entries(errors).filter(([key]) => touched[key]);
  }, [errors, touched]);

  return (
    <div className="space-y-6">
      {/* Error Summary */}
      {errorSummary.length > 0 && (
        <div 
          className="bg-red-50 border-2 border-red-500 rounded-lg p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-2">
                Please fix the following errors:
              </h3>
              <ul className="space-y-1 text-sm text-red-800">
                {errorSummary.map(([fieldId, error]) => {
                  const field = schema.fields.find(f => f.id === fieldId);
                  return (
                    <li key={fieldId}>
                      <a 
                        href={`#field-${fieldId}`}
                        className="underline hover:text-red-900"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`field-${fieldId}`)?.focus();
                        }}
                      >
                        {field?.label}: {error}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div 
          className="bg-green-50 border-2 border-green-500 rounded-lg p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-900">Form submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Saved Data Notice */}
      {showPersistence && savedData && (
        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Saved progress found</p>
                <p className="text-sm text-blue-800">
                  Last saved {new Date(savedData.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={loadSavedData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors font-medium text-sm"
            >
              Restore
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
        {schema.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={values[field.id]}
            error={errors[field.id]}
            touched={touched[field.id]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isValidating}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                       transform hover:scale-105 active:scale-95"
          >
            {isValidating ? 'Submitting...' : 'Submit Form'}
          </button>
          
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg 
                       font-semibold hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================================================
// SCHEMA BUILDER (ADMIN PANEL)
// ============================================================================

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Buttons' }
];

const VALIDATION_TYPES = [
  { value: 'required', label: 'Required', hasValue: false },
  { value: 'email', label: 'Email Format', hasValue: false },
  { value: 'minLength', label: 'Min Length', hasValue: true },
  { value: 'maxLength', label: 'Max Length', hasValue: true },
  { value: 'min', label: 'Min Value', hasValue: true },
  { value: 'max', label: 'Max Value', hasValue: true },
  { value: 'pattern', label: 'Pattern (Regex)', hasValue: true }
];

const FieldEditor = ({ field, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addValidation = () => {
    onUpdate({
      ...field,
      validations: [...(field.validations || []), { type: 'required', value: '' }]
    });
  };

  const updateValidation = (index, updates) => {
    const validations = [...(field.validations || [])];
    validations[index] = { ...validations[index], ...updates };
    onUpdate({ ...field, validations });
  };

  const removeValidation = (index) => {
    const validations = [...(field.validations || [])];
    validations.splice(index, 1);
    onUpdate({ ...field, validations });
  };

  const addOption = () => {
    onUpdate({
      ...field,
      options: [...(field.options || []), { value: '', label: '' }]
    });
  };

  const updateOption = (index, key, value) => {
    const options = [...(field.options || [])];
    options[index] = { ...options[index], [key]: value };
    onUpdate({ ...field, options });
  };

  const removeOption = (index) => {
    const options = [...(field.options || [])];
    options.splice(index, 1);
    onUpdate({ ...field, options });
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900">{field.label || 'Untitled Field'}</h3>
            <p className="text-sm text-gray-600">{FIELD_TYPES.find(t => t.value === field.type)?.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <span className="text-gray-400">{isExpanded ? '−' : '+'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t-2 border-gray-200 space-y-4 bg-gray-50">
          {/* Basic Field Properties */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Field ID</label>
              <input
                type="text"
                value={field.id}
                onChange={(e) => onUpdate({ ...field, id: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                placeholder="fieldId"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Field Type</label>
              <select
                value={field.type}
                onChange={(e) => onUpdate({ ...field, type: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
              >
                {FIELD_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => onUpdate({ ...field, label: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
              placeholder="Field Label"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={field.description || ''}
              onChange={(e) => onUpdate({ ...field, description: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
              placeholder="Optional description"
            />
          </div>

          {(field.type === 'text' || field.type === 'email' || field.type === 'textarea') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Placeholder</label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => onUpdate({ ...field, placeholder: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                placeholder="Placeholder text"
              />
            </div>
          )}

          {/* Options for select/radio */}
          {(field.type === 'select' || field.type === 'radio') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Options</label>
                <button
                  type="button"
                  onClick={addOption}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Add Option
                </button>
              </div>
              <div className="space-y-2">
                {field.options?.map((opt, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={opt.value}
                      onChange={(e) => updateOption(idx, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => updateOption(idx, 'label', e.target.value)}
                      placeholder="Label"
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Validations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">Validations</label>
              <button
                type="button"
                onClick={addValidation}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                Add Validation
              </button>
            </div>
            <div className="space-y-2">
              {field.validations?.map((validation, idx) => {
                const validationType = VALIDATION_TYPES.find(v => v.value === validation.type);
                return (
                  <div key={idx} className="flex gap-2">
                    <select
                      value={validation.type}
                      onChange={(e) => updateValidation(idx, { type: e.target.value })}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                    >
                      {VALIDATION_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {validationType?.hasValue && (
                      <input
                        type="text"
                        value={validation.value || ''}
                        onChange={(e) => updateValidation(idx, { value: e.target.value })}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                      />
                    )}
                    {validation.type === 'pattern' && (
                      <input
                        type="text"
                        value={validation.message || ''}
                        onChange={(e) => updateValidation(idx, { message: e.target.value })}
                        placeholder="Error message"
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeValidation(idx)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SchemaBuilder = ({ onSchemaChange }) => {
  const [schema, setSchema] = useState({
    id: 'custom-form',
    name: 'Custom Form',
    version: '1.0',
    fields: []
  });

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      validations: []
    };
    const updatedSchema = {
      ...schema,
      fields: [...schema.fields, newField]
    };
    setSchema(updatedSchema);
    onSchemaChange(updatedSchema);
  };

  const updateField = (index, updatedField) => {
    const fields = [...schema.fields];
    fields[index] = updatedField;
    const updatedSchema = { ...schema, fields };
    setSchema(updatedSchema);
    onSchemaChange(updatedSchema);
  };

  const deleteField = (index) => {
    const fields = [...schema.fields];
    fields.splice(index, 1);
    const updatedSchema = { ...schema, fields };
    setSchema(updatedSchema);
    onSchemaChange(updatedSchema);
  };

  const exportSchema = () => {
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema.id}.json`;
    a.click();
  };

  const importSchema = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setSchema(imported);
          onSchemaChange(imported);
        } catch (error) {
          alert('Invalid schema file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Form Schema</h2>
          <div className="flex gap-2">
            <label className="px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <input type="file" accept=".json" onChange={importSchema} className="hidden" />
              Import
            </label>
            <button
              onClick={exportSchema}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Form ID</label>
            <input
              type="text"
              value={schema.id}
              onChange={(e) => {
                const updatedSchema = { ...schema, id: e.target.value };
                setSchema(updatedSchema);
                onSchemaChange(updatedSchema);
              }}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Form Name</label>
            <input
              type="text"
              value={schema.name}
              onChange={(e) => {
                const updatedSchema = { ...schema, name: e.target.value };
                setSchema(updatedSchema);
                onSchemaChange(updatedSchema);
              }}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {schema.fields.map((field, index) => (
          <FieldEditor
            key={field.id}
            field={field}
            onUpdate={(updated) => updateField(index, updated)}
            onDelete={() => deleteField(index)}
          />
        ))}
      </div>

      <button
        onClick={addField}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg 
                   text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 
                   transition-all flex items-center justify-center gap-2 font-semibold"
      >
        <Plus className="w-5 h-5" />
        Add Field
      </button>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

const SmartFormBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [formSchema, setFormSchema] = useState({
    id: 'contact-form',
    name: 'Contact Form',
    version: '1.0',
    fields: [
      {
        id: 'fullName',
        type: 'text',
        label: 'Full Name',
        placeholder: 'John Doe',
        description: 'Enter your first and last name',
        validations: [
          { type: 'required' },
          { type: 'minLength', value: '2' }
        ]
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'john@example.com',
        validations: [
          { type: 'required' },
          { type: 'email' }
        ]
      },
      {
        id: 'age',
        type: 'number',
        label: 'Age',
        validations: [
          { type: 'required' },
          { type: 'min', value: '18' },
          { type: 'max', value: '120' }
        ]
      },
      {
        id: 'country',
        type: 'select',
        label: 'Country',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' }
        ],
        validations: [{ type: 'required' }]
      },
      {
        id: 'message',
        type: 'textarea',
        label: 'Message',
        placeholder: 'Tell us about yourself...',
        rows: 5,
        validations: [
          { type: 'required' },
          { type: 'minLength', value: '10' },
          { type: 'maxLength', value: '500' }
        ]
      },
      {
        id: 'newsletter',
        type: 'checkbox',
        label: 'Subscribe to our newsletter',
        validations: []
      },
      {
        id: 'contactMethod',
        type: 'radio',
        label: 'Preferred Contact Method',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'sms', label: 'SMS' }
        ],
        validations: [{ type: 'required' }]
      }
    ]
  });

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Quicksand:wght@400;600;700&display=swap');
        
        * {
          font-family: 'Quicksand', sans-serif;
        }
        
        h1, h2, h3, button {
          font-family: 'Space Mono', monospace;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Smart Form Builder
          </h1>
          <p className="text-xl text-purple-200">
            Dynamic form generation with advanced validation & accessibility
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-2">
          {[
            { id: 'builder', icon: Settings, label: 'Schema Builder' },
            { id: 'preview', icon: Eye, label: 'Form Preview' },
            { id: 'code', icon: Code, label: 'View Schema' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                         font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {activeTab === 'builder' && (
            <SchemaBuilder onSchemaChange={setFormSchema} />
          )}

          {activeTab === 'preview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{formSchema.name}</h2>
              <DynamicForm schema={formSchema} onSubmit={handleFormSubmit} />
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Form Schema JSON</h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(formSchema, null, 2));
                    alert('Schema copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Copy Schema
                </button>
              </div>
              <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto max-h-[600px] font-mono text-sm">
                {JSON.stringify(formSchema, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Features Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Advanced Validation',
              desc: 'Schema-based validation with custom rules, real-time feedback, and error summaries'
            },
            {
              title: 'Form Persistence',
              desc: 'Auto-save with localStorage, restore progress, and prevent data loss'
            },
            {
              title: 'Accessibility First',
              desc: 'ARIA labels, keyboard navigation, screen reader support, and WCAG compliant'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-purple-200 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartFormBuilder;