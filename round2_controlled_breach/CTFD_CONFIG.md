# CTFd Challenge Configuration - Round 2: Controlled Breach

## Challenge: Controlled Breach
**Category:** Web / Cryptography
**Points:** 150
**Difficulty:** Medium-Hard

**Description:**
```
A security breach has been detected in our internal developer portal.

Access the compromised system: http://[YOUR_LOCAL_SERVER]/c1_controlled_breach/

The attackers left traces in the system logs. Your mission is to extract the 
authentication token and decrypt it to reveal the signal.

Hint: The network knows more than the interface shows.

Flag format: HTB{psg_####}
```

**Hints:**
- Hint 1 (Free): "Open your browser's Network tab and inspect API calls."
- Hint 2 (20 pts): "The encryption has multiple layers. Start with Base64."
- Hint 3 (25 pts): "Look for hex values in CSS. XOR might be involved."
- Hint 4 (30 pts): "Order matters: Reverse → XOR → ROT13 → Base64"

**Flag:** `HTB{psg_8421}`

**Tags:** web, cryptography, api, xor, rot13, base64, network-inspection

---

## Setup Instructions

### 1. Web Server Deployment

**Python HTTP Server:**
```bash
cd round2_controlled_breach/challenges/c1_controlled_breach
python3 -m http.server 8080
```

**Nginx:**
```bash
sudo cp -r challenges/c1_controlled_breach /var/www/html/ctf/
sudo systemctl restart nginx
```

### 2. CTFd Configuration

1. Login to CTFd admin panel
2. Navigate to "Challenges" → "Create Challenge"
3. Set challenge type: "Standard"
4. Copy description from above
5. Set point value: 150
6. Add flag: `HTB{psg_8421}` (case-sensitive)
7. Add tags
8. Add hints with point deductions

### 3. Testing Checklist

- [ ] Challenge page loads correctly
- [ ] fake_api.json is accessible
- [ ] Network tab shows API request
- [ ] Console logs appear
- [ ] Hint console works
- [ ] Progressive hints unlock
- [ ] Flag validates: `HTB{psg_8421}`

---

## Participant URLs

```
http://192.168.1.100/c1_controlled_breach/
```

Replace with your actual server IP.

---

## Scoring

| Challenge | Points | Estimated Time | Difficulty |
|-----------|--------|----------------|------------|
| Controlled Breach | 150 | 40-60 min | Medium-Hard |

---

## Tools Participants May Use

- Browser DevTools (Network tab)
- CyberChef
- Python for XOR/ROT13
- Base64 decoders
- Online cryptography tools

---

## Common Questions

**Q: Where do I start?**
A: Open the Network tab in DevTools and inspect API calls.

**Q: Which token is the real one?**
A: Look for the `auth_token` field in the API response.

**Q: What's the decryption order?**
A: Reverse the encryption: Base64 → ROT13 → XOR → Reverse String

**Q: Where's the XOR key?**
A: Check CSS comments for hints.

---

## Flag

**HTB{psg_8421}**
