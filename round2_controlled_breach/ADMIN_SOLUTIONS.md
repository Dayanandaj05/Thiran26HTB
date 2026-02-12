# ADMIN SOLUTION GUIDE - Round 2: Controlled Breach

## Challenge: Controlled Breach (150 points)

**Encryption Stack:** Reverse → XOR (0x2A) → ROT13 → Base64

### Mathematical Verification

**Original Plaintext:** `psg_8421`

**Step 1: Reverse String**
```
Input: psg_8421
Output: 1248_gsp
```

**Step 2: XOR with 0x2A (decimal 42)**
```
Char | ASCII Dec | ASCII Hex | XOR 0x2A | Result Hex | Result Dec | Result Char
-----|-----------|-----------|----------|------------|------------|------------
1    | 49        | 0x31      | 0x1B     | 0x1B       | 27         | \x1b
2    | 50        | 0x32      | 0x18     | 0x18       | 24         | \x18
4    | 52        | 0x34      | 0x1E     | 0x1E       | 30         | \x1e
8    | 56        | 0x38      | 0x12     | 0x12       | 18         | \x12
_    | 95        | 0x5F      | 0x75     | 0x75       | 117        | u
g    | 103       | 0x67      | 0x4D     | 0x4D       | 77         | M
s    | 115       | 0x73      | 0x59     | 0x59       | 89         | Y
p    | 112       | 0x70      | 0x5A     | 0x5A       | 90         | Z
```
**XOR Result:** `\x1b\x18\x1e\x12uMYZ`

**Step 3: ROT13 (letters only)**
```
Character | Type      | ROT13 | Result
----------|-----------|-------|-------
\x1b      | non-alpha | none  | \x1b
\x18      | non-alpha | none  | \x18
\x1e      | non-alpha | none  | \x1e
\x12      | non-alpha | none  | \x12
u         | letter    | +13   | h
M         | letter    | +13   | Z
Y         | letter    | +13   | L
Z         | letter    | +13   | M
```
**ROT13 Result:** `\x1b\x18\x1e\x12hZLM`

**Step 4: Base64 Encode**
```bash
echo -n $'\x1b\x18\x1e\x12hZLM' | base64
# Output: GxgeEmhaTE0=
```

**Final Encoded Value:** `GxgeEmhaTE0=`

---

### Solution Path

1. **Open the challenge page**
   - Notice "BREACH DETECTED" alert
   - See "Internal Developer Portal" interface

2. **Inspect Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Refresh page
   - See request to `fake_api.json`

3. **Examine API Response**
   ```json
   {
     "status": "compromised",
     "auth_token": "GxgeEmhaTE0=",
     ...
   }
   ```

4. **Identify the real token**
   - `auth_token` field contains: `GxgeEmhaTE0=`
   - Other fields are decoys

5. **Decode Base64**
   ```bash
   echo "GxgeEmhaTE0=" | base64 -d
   # Output: \x1b\x18\x1e\x12hZLM (binary data)
   ```

6. **Apply Reverse ROT13**
   ```python
   def rot13_reverse(text):
       result = ""
       for char in text:
           if char.isalpha():
               if char.islower():
                   result += chr((ord(char) - ord('a') - 13) % 26 + ord('a'))
               else:
                   result += chr((ord(char) - ord('A') - 13) % 26 + ord('A'))
           else:
               result += char
       return result
   
   # Input: \x1b\x18\x1e\x12hZLM
   # Output: \x1b\x18\x1e\x12uMYZ
   ```

7. **Apply Reverse XOR with 0x2A**
   ```python
   text = "\x1b\x18\x1e\x12uMYZ"
   key = 0x2A
   result = ''.join(chr(ord(c) ^ key) for c in text)
   # Output: 1248_gsp
   ```

8. **Reverse the String**
   ```python
   reversed_text = "1248_gsp"[::-1]
   # Output: psg_8421
   ```

9. **Submit Flag**
   ```
   HTB{psg_8421}
   ```

---

### Complete Verification Script

```python
#!/usr/bin/env python3
import base64

print("=== Round 2: Controlled Breach Verification ===\n")

# Encrypted token from API
encrypted = "GxgeEmhaTE0="
print(f"Encrypted token: {encrypted}")

# Step 1: Base64 Decode
step1 = base64.b64decode(encrypted)
print(f"Step 1 (Base64 decode): {repr(step1)}")

# Step 2: Reverse ROT13
def rot13_reverse(data):
    result = bytearray()
    for byte in data:
        char = chr(byte)
        if char.isalpha():
            if char.islower():
                result.append(ord(chr((ord(char) - ord('a') - 13) % 26 + ord('a'))))
            else:
                result.append(ord(chr((ord(char) - ord('A') - 13) % 26 + ord('A'))))
        else:
            result.append(byte)
    return bytes(result)

step2 = rot13_reverse(step1)
print(f"Step 2 (Reverse ROT13): {repr(step2)}")

# Step 3: Reverse XOR with 0x2A
step3 = bytes([b ^ 0x2A for b in step2])
print(f"Step 3 (Reverse XOR 0x2A): {step3.decode()}")

# Step 4: Reverse String
step4 = step3.decode()[::-1]
print(f"Step 4 (Reverse string): {step4}")

print(f"\nFlag: HTB{{{step4}}}")
```

**Expected Output:**
```
=== Round 2: Controlled Breach Verification ===

Encrypted token: GxgeEmhaTE0=
Step 1 (Base64 decode): b'\x1b\x18\x1e\x12hZLM'
Step 2 (Reverse ROT13): b'\x1b\x18\x1e\x12uMYZ'
Step 3 (Reverse XOR 0x2A): 1248_gsp
Step 4 (Reverse string): psg_8421

Flag: HTB{psg_8421}
```

---

### Hints Explanation

**Hint 1:** "Network tab may reveal more than the interface."
- Directs participants to check browser DevTools Network tab

**Hint 2:** "Some reflections must be undone first."
- Suggests string reversal is involved

**Hint 3:** "Single byte XOR — not all keys are visible."
- Indicates XOR encryption with a single-byte key
- Key is hidden in CSS comment: `xor_key_hint: 0x2A`

**Hint 4:** "ROT13 rotates letters only."
- Clarifies that ROT13 only affects alphabetic characters

**Hint 5:** "The final result may look familiar."
- Confirms the result matches the expected flag format

---

### Clues in Source Code

**HTML Comments:**
- `<!-- api_endpoint: /api/internal/logs -->`
- `<!-- debug_panel_hidden -->`

**CSS Comments:**
- `/* xor_key_hint: 0x2A */`
- `/* reverse_string_first */`
- `/* rot13_letters_only */`

**JavaScript Comments:**
- `// encryption_order: reverse_xor_rot13_base64`
- `// mirror_reflection_disabled`

**Console Logs:**
- `[HINT] Check network tab for API response`
- `[DEBUG] API loaded: compromised`

---

### Difficulty Analysis

**Estimated Solve Time:** 40-60 minutes

**Difficulty Factors:**
1. Must discover hidden API endpoint
2. Must identify correct token among decoys
3. Must determine encryption order
4. Must apply 4 layers of decryption
5. XOR key requires finding CSS hint

**Skills Required:**
- Network tab inspection
- Base64 decoding
- ROT13 understanding
- XOR operations
- String manipulation
- Multi-layer decryption

---

### Flag

**HTB{psg_8421}**
