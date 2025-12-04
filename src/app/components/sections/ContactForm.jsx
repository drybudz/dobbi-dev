'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/app/components/AppContext';
import gsap from 'gsap';
import World3D from './World3D';
import styles from './styles/ContactForm.module.css';

export default function ContactForm() {
  const { allData } = useAppContext();
  const contactPageData = allData?.contactPage || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interestedIn: '',
    honeypot: '', // Bot trap
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Validation functions
  const validateName = (value) => {
    if (!value || value.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateCompany = (value) => {
    if (!value || value.trim().length < 2) {
      return 'Company must be at least 2 characters';
    }
    return '';
  };

  const validateInterestedIn = (value) => {
    if (!value) {
      return 'This field is required';
    }
    const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 3) {
      return 'Please provide at least 3 words';
    }
    return '';
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setRateLimitError('');
  };

  // Handle blur/focus change validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'company':
        error = validateCompany(value);
        break;
      case 'interestedIn':
        error = validateInterestedIn(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRateLimitError('');

    // Check honeypot
    if (formData.honeypot) {
      // Bot detected - silently fail
      return;
    }

    // Validate all fields
    const newErrors = {};
    newErrors.name = validateName(formData.name);
    newErrors.email = validateEmail(formData.email);
    newErrors.company = validateCompany(formData.company);
    newErrors.interestedIn = validateInterestedIn(formData.interestedIn);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          interestedIn: formData.interestedIn,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setRateLimitError('No more entries are allowed from this device. Please try again later.');
        } else {
          setRateLimitError('Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Success - animate form out, then show success message
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            setShowSuccess(true);
            if (successRef.current) {
              gsap.fromTo(successRef.current, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
              );
            }
          }
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setRateLimitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!contactPageData) {
    return null;
  }

  if (showSuccess) {
    return (
      <section className={styles.contactFormContainer}>
        <div ref={successRef} className={styles.successMessage}>
          {contactPageData.formSuccessMessage || 'Thank you for your message! We\'ll get back to you soon.'}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactFormContainer}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.formWrapper}>
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Name</label>
          <div className={styles.formFieldWrapper}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={contactPageData.formNamePlaceholder || 'here'}
              className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
            />
            {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Email</label>
          <div className={styles.formFieldWrapper}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={contactPageData.formEmailPlaceholder || 'here'}
              className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Company</label>
          <div className={styles.formFieldWrapper}>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={contactPageData.formCompanyPlaceholder || 'here'}
              className={`${styles.formInput} ${errors.company ? styles.error : ''}`}
            />
            {errors.company && <div className={styles.errorMessage}>{errors.company}</div>}
          </div>
        </div>

        <div className={styles.formRow}>
          <label className={styles.formLabel}>Interested in</label>
          <div className={styles.formFieldWrapper}>
            <input
              type="text"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={contactPageData.formInterestedInPlaceholder || 'here'}
              className={`${styles.formInput} ${errors.interestedIn ? styles.error : ''}`}
            />
            {errors.interestedIn && <div className={styles.errorMessage}>{errors.interestedIn}</div>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formLabel}></div>
          <div className={styles.submitSectionWrapper}>
            <div className={styles.submitSection}>
              <div className={styles.submitButtonWrapper}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {rateLimitError && (
                  <span className={styles.rateLimitError}>{rateLimitError}</span>
                )}
              </div>
              <div className={styles.worldContainer}>
                <World3D size={100} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

