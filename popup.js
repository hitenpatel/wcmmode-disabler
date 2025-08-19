document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusText = document.getElementById('statusText');

  // Function to update the UI based on the stored state
  const updateUI = (isEnabled) => {
    if (isEnabled) {
      statusText.textContent = 'ON';
      statusText.style.color = 'green';
      toggleButton.textContent = 'Turn OFF';
    } else {
      statusText.textContent = 'OFF';
      statusText.style.color = 'red';
      toggleButton.textContent = 'Turn ON';
    }
  };

  // Get the initial state and update the UI
  chrome.storage.local.get({ isEnabled: false }, (data) => {
    updateUI(data.isEnabled);
  });

  // Handle the toggle button click
  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get({ isEnabled: false }, (data) => {
      const newState = !data.isEnabled;
      chrome.storage.local.set({ isEnabled: newState }, () => {
        updateUI(newState);
        console.log(`WCMMode Disabler turned ${newState ? 'ON' : 'OFF'}`);
      });
    });
  });
});