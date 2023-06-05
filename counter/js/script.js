document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.counter__form');
  const resultBlock = document.querySelector('.counter__result');
  const normCaloriesElement = document.getElementById('calories-norm');
  const minimalCaloriesElement = document.getElementById('calories-minimal');
  const maximalCaloriesElement = document.getElementById('calories-maximal');
  const submitButton = form.querySelector('.form__submit-button');
  const resetButton = form.querySelector('.form__reset-button');

  // Функция для расчета нормы калорий
  function calculateCalories() {
    const gender = form.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(form.querySelector('#age').value);
    const height = parseInt(form.querySelector('#height').value);
    const weight = parseInt(form.querySelector('#weight').value);

    if (isNaN(weight)) {
      alert('Пожалуйста, введите корректное значение веса.');
      return;
    }

    const activity = form.querySelector('input[name="activity"]:checked').value;

    let normCalories;

    if (gender === 'male') {
      normCalories = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      normCalories = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let minimalCalories, maximalCalories;

    switch (activity) {
      case 'min':
        normCalories = Math.round(normCalories * 1.2);
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
      case 'low':
        normCalories = Math.round(normCalories * 1.375);
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
      case 'medium':
        normCalories = Math.round(normCalories * 1.55);
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
      case 'high':
        normCalories = Math.round(normCalories * 1.725);
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
      case 'max':
        normCalories = Math.round(normCalories * 1.9);
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
      default:
        minimalCalories = Math.round(normCalories * 0.85);
        maximalCalories = Math.round(normCalories * 1.15);
        break;
    }

    normCaloriesElement.textContent = normCalories;
    minimalCaloriesElement.textContent = minimalCalories;
    maximalCaloriesElement.textContent = maximalCalories;

    resultBlock.classList.remove('counter__result--hidden');
  }

  // Функция для проверки заполнения всех полей формы
  function checkFormValidity() {
    const inputs = form.querySelectorAll('input');
    let isValid = false;

    inputs.forEach(function (input) {
      if (input.value.trim() !== '') {
        isValid = true;
      }
    });

    return isValid;
  }

  // Функция для сброса полей формы
  function resetForm() {
    const inputs = form.querySelectorAll('input');

    inputs.forEach(function (input) {
      if (input.type === 'radio') {
        input.checked = input.value === 'male';
      } else {
        input.value = '';
      }
    });

    resultBlock.classList.add('counter__result--hidden');
    submitButton.disabled = true;
  }

  // Обработчик события изменения полей формы
  form.addEventListener('input', function () {
    const isValid = checkFormValidity();
    submitButton.disabled = !isValid;
  });

  // Обработчик события отправки формы
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    calculateCalories();
  });

  // Обработчик события сброса формы
  resetButton.addEventListener('click', function () {
    resetForm();
  });
});
