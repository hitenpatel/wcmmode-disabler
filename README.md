# WCM Mode Disabler

A Chrome extension that automatically adds `?wcmmode=disabled` to Adobe Experience Manager (AEM) URLs to disable WCM authoring mode for better performance and testing.

## Features

- **One-click toggle**: Easy on/off switch via browser toolbar icon
- **Automatic URL modification**: Seamlessly adds wcmmode=disabled to all page loads
- **Visual status indicator**: Icon changes to show current state (enabled/disabled)
- **No page reloads required**: Works instantly on activation
- **Lightweight**: Minimal impact on browser performance

## Installation

### From Chrome Web Store
*Coming soon - extension is currently under review*

### Manual Installation (Development)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The WCM Mode Disabler icon will appear in your browser toolbar

## Usage

1. Navigate to any Adobe Experience Manager site
2. Click the WCM Mode Disabler icon in your browser toolbar
3. When enabled (colored icon), all AEM pages will automatically load with `?wcmmode=disabled`
4. When disabled (gray icon), pages load normally
5. Toggle anytime without refreshing pages

## Perfect For

- **AEM Developers** - Test pages without authoring overlays
- **Content Authors** - View published content as end users see it
- **Quality Assurance** - Verify page functionality in published state
- **Performance Testing** - Measure actual page load times without authoring mode overhead

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `declarativeNetRequest`, `storage`
- **Host Permissions**: `<all_urls>` (required to work on any AEM site)

## Privacy

This extension:
- Does not collect any personal data
- Does not transmit any information to external servers
- Only stores your on/off preference locally in your browser
- Only modifies URL parameters when enabled

## Development

### Project Structure
```
wcmmode-disabler/
├── manifest.json       # Extension manifest
├── background.js       # Service worker
├── popup.html          # Extension popup (if added)
├── popup.js           # Popup functionality (if added)
└── icons/             # Extension icons
    ├── icon-off-16.png
    ├── icon-off-32.png
    ├── icon-off-48.png
    ├── icon-off-128.png
    ├── icon-on-16.png
    ├── icon-on-32.png
    ├── icon-on-48.png
    └── icon-on-128.png
```

### Building
No build process required - this is a pure JavaScript Chrome extension.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or feature requests, please [open an issue](https://github.com/hitpatel3/wcmmode-disabler/issues).

## Changelog

### v1.0.0
- Initial release
- Basic wcmmode=disabled URL modification
- Toggle functionality with visual indicators
- Chrome Manifest V3 support