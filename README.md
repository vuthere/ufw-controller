### `README.md`

```markdown
# 🚀 UFW Controller

**UFW Controller** is a simple Node.js controller for managing **UFW** (Uncomplicated Firewall) rules. This library provides an easy-to-use interface for enabling, disabling, and managing firewall rules on a system with UFW installed. 🔥

---

## 📚 Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API References](#api-references)
4. [Contributing](#contributing)
5. [License](#license)

---

## 📦 Installation

To install the `ufw-controller` library, run the following command:

```bash
npm install ufw-controller
```

---

## 💻 Usage

Here's how to use the `UFWController` class in your Node.js application:

```javascript
const UFWController = require('ufw-controller');

const ufw = new UFWController();

// Example: Enable UFW
ufw.enable()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### 📖 Example Operations

```javascript
// Allow port 80
ufw.allow(80, 'tcp')
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Deny port 22
ufw.deny(22)
  .then(result => console.log(result))
  .catch(error => console.error(error));

// List current rules
ufw.listRules()
  .then(rules => console.log(rules))
  .catch(error => console.error(error));
```

---

## 📜 API References

### `UFWController`

| Method                              | Description                                                                          |
|-------------------------------------|--------------------------------------------------------------------------------------|
| `status()`                          | Returns the current status of UFW.                                                 |
| `allow(portOrService, protocol)`    | Adds an "allow" rule for a specific port or service.                               |
| `deny(portOrService, protocol)`     | Adds a "deny" rule for a specific port or service.                                 |
| `allowFromIp(ip, port, protocol)`   | Adds an "allow" rule for a specific IP address.                                    |
| `denyFromIp(ip, port, protocol)`    | Adds a "deny" rule for a specific IP address.                                      |
| `enable()`                          | Enables UFW.                                                                        |
| `disable()`                         | Disables UFW.                                                                       |
| `reload()`                          | Reloads UFW rules.                                                                  |
| `listRules()`                       | Displays all current firewall rules.                                                |
| `reset()`                           | Resets UFW to its default state.                                                   |
| `logging(level)`                    | Sets logging for UFW. Levels can be 'off', 'on', or 'full'.                       |
| `isEnabled()`                       | Checks if UFW is enabled.                                                           |
| `reject(portOrService, protocol)`   | Adds a "reject" rule for a specific port or service.                               |

---

## 🤝 Contributing

All contributions are welcome! You can submit a pull request or open an issue. Together, we can make this library even better! 🎉

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### ✨ Thank you for your interest in UFW Controller! 😊
```

### Additional Elements to Consider

You might want to add images, such as:

- **Project logo** (if you have one)
- **Screenshots** of the library in action
- **Badges** (e.g., build status, license) at the top of the file to give it a more professional appearance.

### Example Badges

```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
```