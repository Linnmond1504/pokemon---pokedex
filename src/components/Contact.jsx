
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Contact.css';

const Contact = ({ 
  title = "Contáctanos",
  subtitle = "¿Tienes preguntas sobre Pokémon? ¡Escríbinos!" 
}) => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      
      console.log('Datos del formulario:', formData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitMessage('¡Mensaje enviado correctamente! Te responderemos pronto.');
        
        
        setTimeout(() => {
          setSubmitMessage('');
        }, 5000);
        
      }, 2000);
    } else {
      console.log('Errores en el formulario:', newErrors);
    }
  };

  
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setSubmitMessage('');
    console.log('Formulario reseteado');
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
  
        <div className="contact-header">
          <div className="contact-title-container">
            <div className="contact-icon electric"></div>
            <h1 className="contact-title">{title}</h1>
            <div className="contact-icon pokeball"></div>
          </div>
          <p className="contact-subtitle">{subtitle}</p>
        </div>

      
        <div className="contact-form-container">
         
          <div className="decoration-top"></div>
          <div className="decoration-bottom"></div>
          
          <div className="form-content">
          
            {submitMessage && (
              <div className="success-message">
                <span>{submitMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-fields">
              
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && (
                      <div className="error-message">
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                      <div className="error-message">
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

               
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`form-select ${errors.subject ? 'error' : ''}`}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-general">Consulta General</option>
                    <option value="informacion-pokemon">Información sobre Pokémon</option>
                    <option value="problema-tecnico">Problema Técnico</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.subject && (
                    <div className="error-message">
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

               
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                  ></textarea>
                  <div className="character-counter">
                    {errors.message && (
                      <div className="error-message">
                        <span>{errors.message}</span>
                      </div>
                    )}
                    <div className="counter-text">
                      {formData.message.length}/500 caracteres
                    </div>
                  </div>
                </div>

              
                <div className="form-buttons">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={handleReset}
                    disabled={isSubmitting}
                    className="btn btn-reset"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Contact;