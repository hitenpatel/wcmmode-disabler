// Function to update the extension's icon based on its state
const updateIcon = async () => {
  try {
    if (!chrome.action) {
      console.error("chrome.action API not available");
      return;
    }
    const { isEnabled } = await chrome.storage.local.get({ isEnabled: false });
    const iconPath = isEnabled ? "icons/icon-on-" : "icons/icon-off-";
    await chrome.action.setIcon({
      path: {
        16: `${iconPath}16.png`,
        48: `${iconPath}48.png`,
        128: `${iconPath}128.png`,
      },
    });
    console.log(`Icon updated to ${isEnabled ? 'enabled' : 'disabled'} state`);
  } catch (error) {
    console.error("Error updating icon:", error);
  }
};

// Set the initial state and icon when the extension is installed
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ isEnabled: false });
  await disableWCMMode(); // Ensure rule is disabled on install
  updateIcon();
  console.log("WCMMode Disabler installed and set to OFF.");
});

// Listen for changes in storage to update the icon
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.isEnabled) {
    updateIcon();
  }
});

// Rule ID for declarativeNetRequest
const RULE_ID = 1;

// Function to enable URL modification
const enableWCMMode = async () => {
  try {
    if (!chrome.declarativeNetRequest) {
      console.error("chrome.declarativeNetRequest API not available");
      return;
    }
    const rules = [
      {
        id: RULE_ID,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [{ key: "wcmmode", value: "disabled" }],
              },
            },
          },
        },
        condition: {
          urlFilter: "*",
          resourceTypes: ["main_frame"],
          excludedRequestDomains: [],
        },
      },
    ];

    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules,
      removeRuleIds: [RULE_ID],
    });
    console.log("WCMMode enabled - redirect rule added");
  } catch (error) {
    console.error("Error enabling WCMMode:", error);
  }
};

// Function to disable URL modification
const disableWCMMode = async () => {
  try {
    if (!chrome.declarativeNetRequest) {
      console.error("chrome.declarativeNetRequest API not available");
      return;
    }
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
    });
    console.log("WCMMode disabled - redirect rule removed");
  } catch (error) {
    console.error("Error disabling WCMMode:", error);
  }
};

// Handle storage changes to enable/disable the redirect rule
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName === "local" && changes.isEnabled) {
    if (changes.isEnabled.newValue) {
      await enableWCMMode();
    } else {
      await disableWCMMode();
    }
  }
});

// Initialize the extension state on startup
const initializeExtension = async () => {
  try {
    console.log('Initializing extension...');
    
    if (!chrome || !chrome.storage) {
      throw new Error('Chrome APIs not available - Service Worker may not be ready');
    }
    
    const { isEnabled } = await chrome.storage.local.get({ isEnabled: false });
    console.log('Current extension state:', { isEnabled });
    
    if (isEnabled) {
      await enableWCMMode();
    } else {
      await disableWCMMode();
    }
    
    await updateIcon();
    console.log('Extension initialization completed successfully');
    
  } catch (error) {
    console.error('Extension initialization failed:', error);
    // Retry initialization after a short delay
    setTimeout(() => {
      console.log('Retrying extension initialization...');
      initializeExtension().catch(err => {
        console.error('Retry failed:', err);
      });
    }, 1000);
  }
};

// Handle extension icon click to toggle on/off
chrome.action.onClicked.addListener(async () => {
  const { isEnabled } = await chrome.storage.local.get({ isEnabled: false });
  const newState = !isEnabled;
  
  await chrome.storage.local.set({ isEnabled: newState });
  console.log(`WCMMode Disabler ${newState ? 'enabled' : 'disabled'}.`);
});

// Service worker lifecycle events for debugging
self.addEventListener('install', () => {
  console.log('Service worker installing...');
});

self.addEventListener('activate', () => {
  console.log('Service worker activated');
});

// Debug service worker context
console.log('Service worker context available:', {
  chrome: !!chrome,
  action: !!chrome?.action,
  storage: !!chrome?.storage,
  declarativeNetRequest: !!chrome?.declarativeNetRequest
});

// Update the icon and sync rule state on startup
initializeExtension();
