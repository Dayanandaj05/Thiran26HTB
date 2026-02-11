# Round 1: Signal Leak - Enhanced Encryption Edition

## Overview

Round 1 teaches participants progressively complex encoding/encryption techniques:
- **Challenge 1:** Base64 + Caesar Cipher (ROT)
- **Challenge 2:** Base64 + XOR
- **Challenge 3:** Binary + Reverse + Base64

All challenges are static HTML/CSS/JS and work offline in a LAN environment.

---

## Directory Structure

```
round1_signal_leak/
├── ADMIN_TOKENS.json          # Internal token system (ADMIN ONLY)
├── ADMIN_SOLUTIONS.md         # Complete solutions (ADMIN ONLY)
├── CTFD_CONFIG.md             # CTFd setup guide
├── README.md                  # This file
└── challenges/                # Deploy this folder only
    ├── c1_hidden_in_plain_sight/
    │   └── index.html
    ├── c2_noise_filter/
    │   └── index.html
    └── c3_signal_extraction/
        └── index.html
```

---

## Quick Start

### 1. Deploy Web Server

**Python (Simplest):**
```bash
cd challenges
python3 -m http.server 8080
```
Access: `http://localhost:8080/c1_hidden_in_plain_sight/`

**Nginx (Production):**
```bash
sudo cp -r challenges/* /var/www/html/ctf/
sudo systemctl restart nginx
```

### 2. Configure CTFd

1. Access CTFd: `http://[CTFD_IP]:8000/admin`
2. Create 3 challenges using details from `CTFD_CONFIG.md`
3. Set flags (case-sensitive):
   - Challenge 1: `HTB{psg_2538}`
   - Challenge 2: `HTB{psg_3057}`
   - Challenge 3: `HTB{psg_4819}`

### 3. Test Everything

```bash
# Test web server
curl http://localhost:8080/c1_hidden_in_plain_sight/

# Verify flags in CTFd
# Submit test flags to ensure validation works
```

---

## Challenge Details

### Challenge 1: Hidden in Plain Sight (50 points)
**Encryption:** Caesar Shift (+3) → Base64  
**Skills:** HTML inspection, Base64 decoding, Caesar cipher  
**Time:** 5-8 minutes  
**Hint:** Look for "rotation_3_active" in comments

### Challenge 2: Noise Filter (75 points)
**Encryption:** XOR (0x13) → Base64  
**Skills:** Base64 decoding, XOR operations, hex notation  
**Time:** 8-12 minutes  
**Hint:** CSS comment contains hex key

### Challenge 3: Signal Extraction (100 points)
**Encryption:** Base64 → Reverse → Binary  
**Skills:** Binary conversion, string reversal, Base64 decoding  
**Time:** 10-15 minutes  
**Hints:** "bits" and "mirror" in comments

---

## Security Notes

### DO NOT Deploy:
- `ADMIN_TOKENS.json`
- `ADMIN_SOLUTIONS.md`
- `README.md`

### ONLY Deploy:
- `challenges/` directory contents

### File Permissions:
```bash
chmod 755 challenges/*/
chmod 644 challenges/*/*.html
```

---

## Network Configuration

For LAN-only event:

1. **Disable Internet Access:**
   - Configure router/firewall to block external traffic
   - Keep internal network accessible

2. **Set Static IP:**
   ```bash
   # Example for Ubuntu
   sudo nano /etc/netplan/01-netcfg.yaml
   ```

3. **DNS/Hosts Configuration:**
   ```bash
   # Add to /etc/hosts on participant machines
   192.168.1.100  ctf.local
   ```

4. **Test Connectivity:**
   ```bash
   ping 192.168.1.100
   curl http://192.168.1.100/c1_hidden_in_plain_sight/
   ```

---

## Modifying Signals

To change signals for future events:

### 1. Generate New Signal
```bash
# Choose random 4-digit number
NEW_SIGNAL="psg_9876"
```

### 2. Apply Encryption

**For Challenge 1 (Caesar + Base64):**
```python
# Caesar shift +3
shifted = ''.join(chr(ord(c) + 3) if c.isalpha() else c for c in "psg_9876")
# Base64 encode
import base64
encoded = base64.b64encode(shifted.encode()).decode()
print(encoded)
```

**For Challenge 2 (XOR + Base64):**
```python
import base64
signal = "psg_9876"
key = 0x13
xored = ''.join(chr(ord(c) ^ key) for c in signal)
encoded = base64.b64encode(xored.encode()).decode()
print(encoded)
```

**For Challenge 3 (Base64 + Reverse + Binary):**
```python
import base64
signal = "psg_9876"
b64 = base64.b64encode(signal.encode()).decode()
reversed_b64 = b64[::-1]
binary = ''.join(format(ord(c), '08b') for c in reversed_b64)
print(binary)
```

### 3. Update Files
1. Replace encoded value in HTML
2. Update `ADMIN_TOKENS.json`
3. Update `ADMIN_SOLUTIONS.md`
4. Update flags in CTFd

---

## Troubleshooting

### Challenge Pages Not Loading
- Check web server is running: `ps aux | grep python` or `systemctl status nginx`
- Verify file permissions: `ls -la challenges/`
- Check firewall: `sudo ufw status`

### Flags Not Validating
- Ensure case-sensitive matching enabled in CTFd
- Verify exact flag format: `HTB{psg_####}`
- Check for extra spaces or characters

### Participants Can't Access
- Verify network connectivity: `ping [SERVER_IP]`
- Check web server listening: `netstat -tuln | grep 8080`
- Verify firewall rules allow HTTP traffic

### Encoding Issues
- Ensure UTF-8 encoding in HTML files
- Test decoding manually before event
- Verify no hidden characters in encoded strings

---

## Event Day Checklist

**Pre-Event (1 hour before):**
- [ ] CTFd running and accessible
- [ ] Web server running
- [ ] All 3 challenges tested and working
- [ ] Flags validate correctly
- [ ] Scoreboard enabled and visible
- [ ] Admin credentials secured
- [ ] Backup of all files created
- [ ] Network isolated from internet
- [ ] Participant instructions printed/distributed

**During Event:**
- [ ] Monitor CTFd logs for errors
- [ ] Watch web server access logs
- [ ] Track first blood times
- [ ] Be ready to release hints
- [ ] Monitor participant questions

**Post-Event:**
- [ ] Export scoreboard
- [ ] Collect feedback
- [ ] Archive challenge files
- [ ] Document any issues for next round

---

## Tools Participants May Use

**Recommended:**
- Browser DevTools (F12)
- CyberChef: https://gchq.github.io/CyberChef/
- Online Base64 decoder
- Python for XOR/binary operations

**Command Line:**
```bash
# Base64 decode
echo "c3ZnXzI1Mzg=" | base64 -d

# Python XOR
python3 -c "print(''.join(chr(ord(c) ^ 0x13) for c in 'cccr_3057'))"

# Binary to ASCII
python3 -c "binary='01100011...'; print(''.join(chr(int(binary[i:i+8], 2)) for i in range(0, len(binary), 8)))"
```

---

## Support During Event

**Common Participant Questions:**

Q: "Where do I find the flag?"  
A: Inspect the page source. Look for encoded strings.

Q: "What format should the flag be?"  
A: `HTB{psg_####}` where #### is a 4-digit number.

Q: "I decoded it but it's not working"  
A: There may be multiple layers of encoding. Check for hints.

Q: "What's XOR?"  
A: It's a bitwise operation. Research it or use the hint system.

Q: "How do I convert binary?"  
A: Use Python, CyberChef, or online converters. Split into 8-bit chunks.

---

## Scoring & Difficulty

| Challenge | Points | Skills Required | Estimated Time |
|-----------|--------|-----------------|----------------|
| C1 | 50 | Base64, Caesar | 5-8 min |
| C2 | 75 | Base64, XOR, Hex | 8-12 min |
| C3 | 100 | Binary, Reverse, Base64 | 10-15 min |
| **Total** | **225** | Progressive difficulty | **23-35 min** |

**First Blood Bonus:** +10% (optional)  
**Hint Penalties:** Deduct points as configured in CTFd

---

## License & Credits

Created for educational CTF purposes.  
Feel free to modify and adapt for your events.

**Contact:** [Your contact info]  
**Repository:** [Your repo URL]
