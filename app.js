'use strict';

// Mejora progresiva: sin JavaScript, los enlaces y talleres siguen visibles.
function initMenu() {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('#navegacion');
  const desktop = window.matchMedia('(min-width: 64rem)');
  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.hidden = !open;
  }
  function syncLayout() {
    const focusWillHide = !desktop.matches && nav.contains(document.activeElement);
    const buttonHasFocus = document.activeElement === button;
    button.hidden = desktop.matches;
    setOpen(desktop.matches);
    if (focusWillHide) button.focus();
    if (desktop.matches && buttonHasFocus) nav.querySelector('a').focus();
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || desktop.matches) return;
    setOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches && !nav.hidden) {
      setOpen(false);
      button.focus();
    }
  });
  desktop.addEventListener('change', syncLayout);
  syncLayout();
}

function initFilters() {
  const group = document.querySelector('.filters');
  const cards = [...document.querySelectorAll('.workshop')];
  const status = document.querySelector('#filter-status');
  group.hidden = false;
  group.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    group.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach((card) => {
      card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count += 1;
    });
    status.textContent = `${count} ${count === 1 ? 'taller disponible' : 'talleres disponibles'}.`;
  });
  cards.forEach((card) => card.querySelector('a').addEventListener('click', () => {
    const select = document.querySelector('#taller');
    select.value = card.dataset.category;
    select.dispatchEvent(new Event('change'));
  }));
}

function initForm() {
  const form = document.querySelector('#registration-form');
  const fields = [...form.querySelectorAll('input, select')];
  const status = document.querySelector('#form-status');
  const submit = document.querySelector('#submit-button');
  form.noValidate = true;
  submit.disabled = false;
  function validateField(field) {
    let message = '';
    if (!field.value.trim()) message = field.id === 'taller' ? 'Selecciona un taller.' : 'Completa este campo.';
    else if (field.id === 'nombre' && field.value.trim().length < 2) message = 'Escribe al menos dos caracteres.';
    else if (field.validity.typeMismatch) message = 'Escribe un correo válido, por ejemplo: estudiante@example.com.';
    else if (!field.validity.valid) message = 'Revisa el valor de este campo.';
    document.querySelector(`#${field.id}-error`).textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !message;
  }
  fields.forEach((field) => {
    const update = () => {
      status.textContent = '';
      if (field.hasAttribute('aria-invalid')) validateField(field);
    };
    field.addEventListener('input', update);
    field.addEventListener('change', update);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const results = fields.map(validateField);
    const firstInvalid = results.indexOf(false);
    if (firstInvalid !== -1) {
      status.textContent = 'Revisa los campos indicados para continuar.';
      fields[firstInvalid].focus();
      return;
    }
    status.textContent = 'Validación completada. Tu participación de prueba es correcta. No se enviaron ni guardaron datos.';
  });
}

initMenu();
initFilters();
initForm();
