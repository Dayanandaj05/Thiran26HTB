# Round 2: Controlled Breach

## Overview

Round 2 is a web inspection and multi-layer cryptography challenge simulating an internal API breach scenario.

**Challenge Name:** Controlled Breach  
**Difficulty:** Medium-Hard  
**Points:** 150  
**Estimated Time:** 40-60 minutes

---

## Challenge Description

Participants must:
1. Inspect the compromised developer portal
2. Discover hidden API endpoint via Network tab
3. Extract encrypted authentication token
4. Identify 4-layer encryption stack
5. Decrypt in correct order
6. Extract final signal

**Flag:** `HTB{psg_8421}`

---

## Encryption Stack

```
Plaintext: psg_8421
    ↓ Reverse String
    ↓ XOR with 0x2A
    ↓ ROT13
    ↓ Base64
Final: GxgeEmhaTE0=
```

---

## Directory Structure

```
round2_controlled_breach/
├── ADMIN_TOKENS.json
├── ADMIN_SOLUTIONS.md
├── CTFD_CONFIG.md
├── README.md
└── challenges/
    └── c1_controlled_breach/
        ├── index.html
        ├── app.js
        ├── styles.css
        └── fake_api.json
```

---

## Quick Start

```bash
cd round2_controlled_breach/challenges/c1_controlled_breach
python3 -m http.server 8080
```

Access: `http://localhost:8080`

---

## Features

- Modern dark theme with red alert styling
- Fake breach simulation dashboard
- Hidden API endpoint
- Progressive hint unlock system
- Obfuscated validation logic
- Multiple decoy tokens
- Network tab inspection required

---

## Security

- No plaintext flags in source
- Obfuscated validation using hashed comparisons
- XOR key hidden in CSS comments
- Encryption order hints scattered across files

---

## Admin Files

- **ADMIN_TOKENS.json** - Complete encryption breakdown
- **ADMIN_SOLUTIONS.md** - Full solution with verification script
- **CTFD_CONFIG.md** - CTFd setup instructions

---

## Deployment

Deploy only the `challenges/` folder to your web server.  
Keep admin files secure and separate.
