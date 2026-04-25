(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    city: document.getElementById('city'),
    zipcode: document.getElementById('zipcode'),
    traveldate: document.getElementById('traveldate'),
    package: document.getElementById('package'),
    message: document.getElementById('message'),
    agree: document.getElementById('agree')
  };

  const status = document.getElementById('formStatus');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
  const zipPattern = /^\d{5}$/;

  function setError(name, message) {
    const errorBox = document.getElementById(name + 'Error');
    if (errorBox) errorBox.textContent = message;
    if (fields[name] && 'setAttribute' in fields[name]) {
      if (message) {
        fields[name].setAttribute('aria-invalid', 'true');
      } else {
        fields[name].removeAttribute('aria-invalid');
      }
    }
  }

  function capitalizeFirstLetter(value) {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) return '';
    return trimmed
      .split(/\s+/)
      .map(function (part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join(' ');
  }

  ['firstname', 'lastname', 'city'].forEach(function (name) {
    fields[name].addEventListener('blur', function () {
      fields[name].value = capitalizeFirstLetter(fields[name].value);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;
    status.textContent = '';

    fields.firstname.value = capitalizeFirstLetter(fields.firstname.value);
    fields.lastname.value = capitalizeFirstLetter(fields.lastname.value);
    fields.city.value = capitalizeFirstLetter(fields.city.value);

    if (fields.firstname.value.length < 2) {
      setError('firstname', 'Enter a valid first name.');
      valid = false;
    } else {
      setError('firstname', '');
    }

    if (fields.lastname.value.length < 2) {
      setError('lastname', 'Enter a valid last name.');
      valid = false;
    } else {
      setError('lastname', '');
    }

    if (!emailPattern.test(fields.email.value.trim())) {
      setError('email', 'Enter a valid email address.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!phonePattern.test(fields.phone.value.trim())) {
      setError('phone', 'Use the format 123-456-7890.');
      valid = false;
    } else {
      setError('phone', '');
    }

    if (fields.city.value.length < 2) {
      setError('city', 'Enter a valid city name.');
      valid = false;
    } else {
      setError('city', '');
    }

    if (!zipPattern.test(fields.zipcode.value.trim())) {
      setError('zipcode', 'Enter a 5-digit zip code.');
      valid = false;
    } else {
      setError('zipcode', '');
    }

    if (!fields.traveldate.value) {
      setError('traveldate', 'Choose a preferred travel date.');
      valid = false;
    } else {
      setError('traveldate', '');
    }

    if (!fields.package.value) {
      setError('package', 'Choose a package level.');
      valid = false;
    } else {
      setError('package', '');
    }

    if (fields.message.value.trim().length < 20) {
      setError('message', 'Please enter at least 20 characters.');
      valid = false;
    } else {
      setError('message', '');
    }

    if (!fields.agree.checked) {
      setError('agree', 'You must confirm before submitting.');
      valid = false;
    } else {
      setError('agree', '');
    }

    if (!valid) {
      status.textContent = 'Please correct the highlighted fields and try again.';
      status.className = 'status-message error';
      return;
    }

    status.textContent = 'Form validated successfully. This sample form is ready for submission.';
    status.className = 'status-message success';
    form.reset();
  });
})();
