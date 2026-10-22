# Login Authentication System

A client-side authentication system with registration, login, and a protected dashboard, built with vanilla HTML, CSS and JavaScript. **Task 4** of the Web Development track at Oasis Infobyte (OIBSIP). Approach: **(A) front-end only with localStorage**.

## Live Demo
https://marru-tantawy.github.io/OIBSIP/WebDev-L2-AuthPage/register.html

## Features
- **Registration** with username/email and password
- **Password validation**: at least 8 characters and at least 1 number
- **Duplicate check**: an error is shown if the username/email already exists (case and spaces are ignored)
- **Login** with clear error handling: one generic message ("Invalid username or password.") so it never reveals which field is wrong
- **Protected dashboard**: redirects to the login page if opened without a session
- **Logout** button that clears the session and returns to the login page
- **Passwords are never stored in plain text**: SHA-256 hashing with a random salt per user (Web Crypto API)
- **Form validation** on both pages (no empty submissions)

## How It Works
| Data | Stored in | Content |
|---|---|---|
| Registered users | `localStorage` (`users`) | username, salt, password hash |
| Current session | `sessionStorage` (`session`) | username only (cleared when the tab closes) |

On register, a random salt is generated and `SHA-256(salt + password)` is saved. On login, the typed password is hashed with the saved salt and compared with the saved hash. The dashboard checks for a session before showing any content.

> Note: this project is for learning. Real applications must authenticate on a server, because anything in the browser can be read or edited by the user.

## Tech Stack
HTML5, CSS3, JavaScript (Vanilla), Web Crypto API

## Project Structure
```
WebDev-Task4-LoginAuthSystem/
├── register.html
├── login.html
├── dashboard.html
├── style.css
├── auth.js          (shared helpers: hashing, storage, session, validation)
├── register.js
├── login.js
├── dashboard.js
├── images/
└── README.md
```

## How to Run
Download or clone the repository and open `register.html` in any browser.

## Resources
MDN Web Docs (Web Crypto API `SubtleCrypto.digest`, Web Storage API, HTTP cookies and sessions).