# @mash43/can-i-extend

[![npm version](https://img.shields.io/npm/v/@mash43/can-i-extend.svg)](https://www.npmjs.com/package/@mash43/can-i-extend) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A lightweight TypeScript library to check if a given URL is available for Chrome extension features.

## Features

- 🚀 **Lightweight & Fast**: Zero dependencies.
- 🛡️ **Secure**: Accurately identifies restricted pages such as `chrome://`, `about:`, and `devtools://`.
- ⚙️ **Customizable**: Allows adding custom URL patterns via options.
- 📦 **TypeScript**: Fully typed.

## Installation

```bash
npm install @mash43/can-i-extend
```

## Usage

### Basic Check

```typescript
import { canIExtend } from "@mash43/can-i-extend";

// Regular websites are allowed
console.log(canIExtend("https://google.com")); // true

// Chrome internal pages are restricted
console.log(canIExtend("chrome://extensions")); // false
console.log(canIExtend("about:blank")); // false
console.log(canIExtend("view-source:https://example.com")); // false

// Chrome Web Store is also restricted
console.log(canIExtend("https://chromewebstore.google.com/")); // false
```

### Customization via Options

You can add your own restricted URL patterns.

```typescript
import { canIExtend } from "@mash43/can-i-extend";

const options = {
  restrictedUrls: [/^https:\/\/example\.com\/.*/]
};

console.log(canIExtend("https://example.com/blocked", options)); // false
console.log(canIExtend("https://google.com", options)); // true
```

## Default Restricted Patterns

The following patterns are restricted by default:
- `chrome://*`
- `about:*`
- `view-source:*`
- `devtools://*`
- `chrome-error://*`
- `chrome-extension://*`
- `https://chromewebstore.google.com/*`

## License

MIT
