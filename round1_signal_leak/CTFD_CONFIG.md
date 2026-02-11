# CTFd Challenge Configuration - Round 1: Signal Leak (Updated)

## Challenge 1: Hidden in Plain Sight
**Category:** Web / Cryptography
**Points:** 50
**Difficulty:** Easy-Medium

**Description:**
```
Welcome to Signal Leak! Your mission is to find hidden signals in web pages.

Start here: http://[YOUR_LOCAL_SERVER]/c1_hidden_in_plain_sight/

The signal is encoded, but there's a hint about how to decode it.
Look carefully at the comments and attributes.

Flag format: HTB{psg_####}
```

**Hints:**
- Hint 1 (Free): "Base64 is just the beginning. Sometimes things rotate."
- Hint 2 (10 pts): "Check the HTML comments for clues about rotation."

**Flag:** `HTB{psg_2538}`

**Tags:** base64, caesar, rotation, encoding

---

## Challenge 2: Noise Filter
**Category:** Web / Cryptography
**Points:** 75
**Difficulty:** Medium

**Description:**
```
The signal is getting harder to find. There's more noise now, and simple decoding won't work.

Access the dashboard: http://[YOUR_LOCAL_SERVER]/c2_noise_filter/

Hint: Look for numeric clues in unexpected places. The order of operations matters.

Flag format: HTB{psg_####}
```

**Hints:**
- Hint 1 (Free): "Base64 decode first, but the result won't make sense immediately."
- Hint 2 (15 pts): "CSS comments sometimes contain more than styling notes. Look for hex values."
- Hint 3 (20 pts): "XOR is your friend. Single-byte key."

**Flag:** `HTB{psg_3057}`

**Tags:** base64, xor, hex, cryptography

---

## Challenge 3: Signal Extraction
**Category:** Web / Cryptography
**Points:** 100
**Difficulty:** Medium-Hard

**Description:**
```
Maximum noise. Maximum challenge. Can you extract the real signal?

Navigate to: http://[YOUR_LOCAL_SERVER]/c3_signal_extraction/

Hint: The signal could be anywhere. Multiple layers of encoding await.
Think about bits, mirrors, and the order of operations.

Flag format: HTB{psg_####}
```

**Hints:**
- Hint 1 (Free): "Long strings of 0s and 1s aren't just decoration."
- Hint 2 (20 pts): "Three steps: binary → ASCII → reverse → decode"
- Hint 3 (25 pts): "Look for the longest binary string in comments. Mirror means reverse."

**Flag:** `HTB{psg_4819}`

**Tags:** binary, base64, reverse, encoding, multi-layer

---

## Setup Instructions

### 1. Web Server Deployment

**Option A: Python HTTP Server**
```bash
cd round1_signal_leak/challenges
python3 -m http.server 8080
```

**Option B: Nginx**
```bash
sudo cp -r challenges/* /var/www/html/ctf/
sudo systemctl restart nginx
```

### 2. CTFd Configuration

1. Login to CTFd admin panel
2. Navigate to "Challenges" → "Create Challenge"
3. For each challenge:
   - Set challenge type: "Standard"
   - Copy description from above
   - Set point value
   - Add flag with **case-sensitive** matching
   - Add tags for categorization
   - Add hints (optional, with point deductions)

### 3. Flag Validation Settings

Ensure in CTFd settings:
- Flag matching: **Case Sensitive**
- Flag format: `HTB{psg_####}`
- No partial credit

### 4. Testing Checklist

Before event:
- [ ] All challenge pages load correctly
- [ ] View source works in all browsers
- [ ] Encoded strings are visible
- [ ] Flags validate correctly
- [ ] Hints display properly
- [ ] Scoreboard updates in real-time

---

## Participant URLs

Update these in CTFd challenge descriptions:
```
http://192.168.1.100/c1_hidden_in_plain_sight/
http://192.168.1.100/c2_noise_filter/
http://192.168.1.100/c3_signal_extraction/
```

Replace `192.168.1.100` with your actual server IP.

---

## Scoring Summary

| Challenge | Points | Estimated Time | Difficulty |
|-----------|--------|----------------|------------|
| Challenge 1 | 50 | 5-8 min | Easy-Medium |
| Challenge 2 | 75 | 8-12 min | Medium |
| Challenge 3 | 100 | 10-15 min | Medium-Hard |
| **Total** | **225** | **23-35 min** | Progressive |

---

## Tools Participants May Use

Allowed and expected:
- Browser DevTools (View Source)
- Online Base64 decoders
- CyberChef (https://gchq.github.io/CyberChef/)
- Python/JavaScript for XOR and binary conversion
- Command line tools (base64, xxd, etc.)

---

## Event Day Notes

**Common Questions:**
- "What's the flag format?" → `HTB{psg_####}`
- "Where do I start?" → View the page source
- "I decoded but it's gibberish" → Check for additional encoding layers
- "What's XOR?" → Provide hint or let them research

**Monitoring:**
- Watch for participants stuck on Challenge 2 (XOR concept)
- Challenge 3 may require hint releases
- First blood typically on Challenge 1 within 10 minutes

**Troubleshooting:**
- If flags not validating: check case sensitivity
- If pages not loading: verify web server and network
- If participants can't find signals: remind them to view source
