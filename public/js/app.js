let btnUbication = document.querySelector('.btn-success');
let sectionWeatherUbication = document.querySelector('.result-weather-ubication');
let btnWeatherWeekend = document.querySelector('.btn-weekend');
let sectionWeatherWeekend = document.querySelector('.resul-weather-weekend');
let btnBack = document.querySelector('.btn-back');

btnUbication.addEventListener('click', function() {
  sectionWeatherUbication.removeAttribute('hidden', 'hidden');
});

btnWeatherWeekend.addEventListener('click', function() {
  sectionWeatherUbication.setAttribute('hidden', 'hidden');
  sectionWeatherWeekend.removeAttribute('hidden', 'hidden');
});

btnBack.addEventListener('click', function() {
  sectionWeatherUbication.setAttribute('hidden', 'hidden');
  sectionWeatherWeekend.setAttribute('hidden', 'hidden');
});

