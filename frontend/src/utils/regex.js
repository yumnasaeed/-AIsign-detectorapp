export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
export const nameRegex = /^[A-Za-z\s]{2,50}$/;

export const validateForm = (form) => {
  const errors = {};
  if (form.name !== undefined) {
    if (!form.name.trim()) errors.name = 'Name is required.';
    else if (!nameRegex.test(form.name.trim())) errors.name = 'Name must be 2-50 letters only.';
  }
  if (form.email !== undefined) {
    if (!form.email.trim()) errors.email = 'Email is required.';
    else if (!emailRegex.test(form.email.trim())) errors.email = 'Enter a valid email address.';
  }
  if (form.password !== undefined && form.password !== '') {
    if (!passwordRegex.test(form.password)) errors.password = 'Password: 6+ chars, include a letter and a number.';
  }
  return errors;
};
