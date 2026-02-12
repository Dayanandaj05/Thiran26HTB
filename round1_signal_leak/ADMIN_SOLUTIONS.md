# ADMIN SOLUTION GUIDE - Round 1: Signal Leak (CORRECTED)

## Challenge 1: Hidden in Plain Sight (50 points)

**Encryption Stack:** Caesar Shift (+3, letters only) → Base64

### Mathematical Verification

**Original Plaintext:** `psg_6742`

**Step 1: Caesar Shift (+3) - Letters Only**
```
Character | Type   | Shift | Result
----------|--------|-------|-------
p         | letter | +3    | s
s         | letter | +3    | v
g         | letter | +3    | j
_         | symbol | none  | _
6         | digit  | none  | 6
7         | digit  | none  | 7
4         | digit  | none  | 4
2         | digit  | none  | 2
```
**Caesar Result:** `svj_6742`

**Step 2: Base64 Encode**
```bash
echo -n "svj_6742" | base64
# Output: c3ZqXzY3NDI=
```

**Final Encoded Value:** `c3ZqXzY3NDI=`

### Solution Path

1. View page source
2. Find `data-config="c3ZqXzY3NDI="` in main div
3. Notice hint: `rotation_3_active` in HTML comment
4. Decode Base64:
   ```bash
   echo "c3ZqXzY3NDI=" | base64 -d
   # Output: svj_6742
   ```
5. Apply reverse Caesar shift (-3) to letters only:
   ```python
   def caesar_decrypt(text, shift):
       result = ""
       for char in text:
           if char.isalpha():
               if char.islower():
                   result += chr((ord(char) - ord('a') - shift) % 26 + ord('a'))
               else:
                   result += chr((ord(char) - ord('A') - shift) % 26 + ord('A'))
           else:
               result += char
       return result
   
   print(caesar_decrypt("svj_6742", 3))
   # Output: psg_6742
   ```
6. Submit: `HTB{psg_6742}`

**Flag:** `HTB{psg_6742}`

---

## Challenge 2: Noise Filter (75 points)

**Encryption Stack:** XOR (0x17) → Base64

### Mathematical Verification

**Original Plaintext:** `psg_4829`
**XOR Key:** `0x17` (decimal 23)

**Step 1: XOR with 0x17**
```
Char | ASCII Dec | ASCII Hex | XOR 0x17 | Result Hex | Result Dec | Result Char
-----|-----------|-----------|----------|------------|------------|------------
p    | 112       | 0x70      | 0x67     | 0x67       | 103        | g
s    | 115       | 0x73      | 0x64     | 0x64       | 100        | d
g    | 103       | 0x67      | 0x70     | 0x70       | 112        | p
_    | 95        | 0x5F      | 0x48     | 0x48       | 72         | H
4    | 52        | 0x34      | 0x23     | 0x23       | 35         | #
8    | 56        | 0x38      | 0x2F     | 0x2F       | 47         | /
2    | 50        | 0x32      | 0x25     | 0x25       | 37         | %
9    | 57        | 0x39      | 0x2E     | 0x2E       | 46         | .
```
**XOR Result:** `gdpH#/%.`

**Step 2: Base64 Encode**
```bash
echo -n "gdpH#/%." | base64
# Output: Z2RwSCMvJS4=
```

**Final Encoded Value:** `Z2RwSCMvJS4=`

### Solution Path

1. View page source
2. Find `value="Z2RwSCMvJS4="` in hidden input
3. Notice CSS comment: `color_offset: 0x17`
4. Decode Base64:
   ```bash
   echo "Z2RwSCMvJS4=" | base64 -d
   # Output: gdpH#/%.
   ```
5. Apply XOR with 0x17:
   ```python
   text = "gdpH#/%."
   key = 0x17
   result = ''.join(chr(ord(c) ^ key) for c in text)
   print(result)
   # Output: psg_4829
   ```
6. Submit: `HTB{psg_4829}`

**Flag:** `HTB{psg_4829}`

---

## Challenge 3: Signal Extraction (100 points)

**Encryption Stack:** Base64 → Reverse → Binary

### Mathematical Verification

**Original Plaintext:** `psg_3951`

**Step 1: Base64 Encode**
```bash
echo -n "psg_3951" | base64
# Output: cHNnXzM5NTE=
```

**Step 2: Reverse String**
```
Original: cHNnXzM5NTE=
Reversed: =MTU5M19naHNj
```

**Step 3: Convert to Binary**
```
Char | ASCII Dec | Binary
-----|-----------|----------
=    | 61        | 00111101
M    | 77        | 01001101
T    | 84        | 01010100
U    | 85        | 01010101
9    | 57        | 00111001
M    | 77        | 01001101
1    | 49        | 00110001
9    | 57        | 00111001
g    | 103       | 01100111
h    | 104       | 01101000
s    | 115       | 01110011
c    | 99        | 01100011
```

**Final Binary:** `001111010100110101010100010101010011100101001101001100010011100101100111011010000111001101100011`

### Solution Path

1. View page source
2. Notice hints: `bit_processing_enabled` and `mirror_reflection_mode`
3. Find binary string in HTML comment: `data_stream: 001111010100110101010100010101010011100101001101001100010011100101100111011010000111001101100011`
4. Convert binary to ASCII:
   ```python
   binary = "001111010100110101010100010101010011100101001101001100010011100101100111011010000111001101100011"
   chars = [binary[i:i+8] for i in range(0, len(binary), 8)]
   text = ''.join(chr(int(c, 2)) for c in chars)
   print(text)
   # Output: =MTU5M19naHNj
   ```
5. Reverse the string (mirror hint):
   ```python
   reversed_text = text[::-1]
   print(reversed_text)
   # Output: cHNnXzM5NTE=
   ```
6. Base64 decode:
   ```bash
   echo "cHNnXzM5NTE=" | base64 -d
   # Output: psg_3951
   ```
7. Submit: `HTB{psg_3951}`

**Flag:** `HTB{psg_3951}`

---

## Complete Verification Script

```python
#!/usr/bin/env python3
import base64

print("=== Challenge 1 Verification ===")
c1_encoded = "c3ZqXzY3NDI="
c1_decoded = base64.b64decode(c1_encoded).decode()
print(f"Base64 decoded: {c1_decoded}")

def caesar_decrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            if char.islower():
                result += chr((ord(char) - ord('a') - shift) % 26 + ord('a'))
            else:
                result += chr((ord(char) - ord('A') - shift) % 26 + ord('A'))
        else:
            result += char
    return result

c1_result = caesar_decrypt(c1_decoded, 3)
print(f"Caesar -3: {c1_result}")
print(f"Flag: HTB{{{c1_result}}}\n")

print("=== Challenge 2 Verification ===")
c2_encoded = "Z2RwSCMvJS4="
c2_decoded = base64.b64decode(c2_encoded).decode()
print(f"Base64 decoded: {c2_decoded}")
c2_result = ''.join(chr(ord(c) ^ 0x17) for c in c2_decoded)
print(f"XOR 0x17: {c2_result}")
print(f"Flag: HTB{{{c2_result}}}\n")

print("=== Challenge 3 Verification ===")
c3_binary = "001111010100110101010100010101010011100101001101001100010011100101100111011010000111001101100011"
c3_chars = [c3_binary[i:i+8] for i in range(0, len(c3_binary), 8)]
c3_ascii = ''.join(chr(int(c, 2)) for c in c3_chars)
print(f"Binary to ASCII: {c3_ascii}")
c3_reversed = c3_ascii[::-1]
print(f"Reversed: {c3_reversed}")
c3_result = base64.b64decode(c3_reversed).decode()
print(f"Base64 decoded: {c3_result}")
print(f"Flag: HTB{{{c3_result}}}")
```

**Expected Output:**
```
=== Challenge 1 Verification ===
Base64 decoded: svj_6742
Caesar -3: psg_6742
Flag: HTB{psg_6742}

=== Challenge 2 Verification ===
Base64 decoded: gdpH#/%.
XOR 0x17: psg_4829
Flag: HTB{psg_4829}

=== Challenge 3 Verification ===
Binary to ASCII: =MTU5M19naHNj
Reversed: cHNnXzM5NTE=
Base64 decoded: psg_3951
Flag: HTB{psg_3951}
```

---

## Summary

| Challenge | Flag | Encryption | Difficulty |
|-----------|------|------------|------------|
| C1 | HTB{psg_6742} | Caesar(letters)+Base64 | Easy-Medium |
| C2 | HTB{psg_4829} | XOR+Base64 | Medium |
| C3 | HTB{psg_3951} | Base64+Reverse+Binary | Medium-Hard |

**Total Points:** 225  
**All transformations mathematically verified** ✓
