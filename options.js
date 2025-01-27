// options.js

// On page load, retrieve saved settings and populate the fields
document.addEventListener('DOMContentLoaded', async () => {
  // Grab the UI elements
  const countrySelect = document.getElementById('country');
  const swearinessSlider = document.getElementById('sweariness');
  const swearinessValue = document.getElementById('swearinessValue');

  // Get stored values (defaulting to an empty object if none exist)
  const storedSettings = await browser.storage.sync.get(['country', 'sweariness']);

  // Populate UI with stored values, or default if not found
  if (storedSettings.country) {
    countrySelect.value = storedSettings.country;
  }
  if (typeof storedSettings.sweariness !== 'undefined') {
    swearinessSlider.value = storedSettings.sweariness;
    swearinessValue.textContent = storedSettings.sweariness;
  }

  // Listen for changes
  countrySelect.addEventListener('change', async () => {
    await browser.storage.sync.set({ country: countrySelect.value });
  });

  swearinessSlider.addEventListener('input', async () => {
    const sliderVal = swearinessSlider.value;
    swearinessValue.textContent = sliderVal;
    await browser.storage.sync.set({ sweariness: sliderVal });
  });
});
