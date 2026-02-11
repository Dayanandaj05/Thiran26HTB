# ADMIN SOLUTION GUIDE - Round 1: Signal Leak

## Challenge 1: Hidden in Plain Sight

**Real Signal Location:** `data-config` attribute in main div
**Encoded:** `cHNnXzcyOTE=`
**Decoded:** `psg_7291`
**Flag:** `HTB{psg_7291}`

**Decoys:**
1. HTML comment: `V2VsY29tZSB0byB0aGUgQ1RGIGV2ZW50` → "Welcome to the CTF event"
2. Meta tag: `YWRtaW5fcGFuZWxfdjI=` → "admin_panel_v2"
3. Script comment: `ZGVidWdfbW9kZV9lbmFibGVk` → "debug_mode_enabled"

**Solution Steps:**
1. View page source (Ctrl+U or right-click → View Source)
2. Find all base64-encoded strings
3. Decode each string
4. Identify the one matching `psg_####` format
5. Submit `HTB{psg_7291}`

---

## Challenge 2: Noise Filter

**Real Signal Location:** Hidden input field value
**Encoded:** `cHNnXzQxNTY=`
**Decoded:** `psg_4156`
**Flag:** `HTB{psg_4156}`

**Decoys:**
1. CSS comment: `Y29uZmlnX2JhY2t1cF8yMDI0` → "config_backup_2024"
2. Div class: `c2Vzc2lvbl90b2tlbl94eXo` → "session_token_xyz"
3. Link href: `YXBpX2VuZHBvaW50X3Yz` → "api_endpoint_v3"
4. HTML comment: `bWFpbnRlbmFuY2Vfc2NoZWR1bGVk` → "maintenance_scheduled"

**Solution Steps:**
1. View page source
2. Identify 5 base64 strings in different locations
3. Decode all strings
4. Filter for `psg_####` pattern
5. Submit `HTB{psg_4156}`

---

## Challenge 3: Signal Extraction

**Real Signal Location:** CSS style comment
**Encoded:** `cHNnXzMwNDg=`
**Decoded:** `psg_3048`
**Flag:** `HTB{psg_3048}`

**Decoys:**
1. Noscript tag: `dXNlcl9wcmVmZXJlbmNlc19jYWNoZQ==` → "user_preferences_cache"
2. Meta description: `bGVnYWN5X3N5c3RlbV9yZWY=` → "legacy_system_ref"
3. Div id: `YW5hbHl0aWNzX3RyYWNrZXJfaWQ=` → "analytics_tracker_id"
4. Script src: `Y2RuX2ZhbGxiYWNrX3VybA==` → "cdn_fallback_url"
5. HTML comment: `dGhlbWVfdmFyaWFudF9kYXJr` → "theme_variant_dark"

**Solution Steps:**
1. View page source
2. Systematically check all HTML elements, attributes, and comments
3. Extract 6 base64 strings
4. Decode all and identify the signal
5. Submit `HTB{psg_3048}`

---

## Quick Verification Commands

```bash
# Decode signals (Linux/Mac)
echo "cHNnXzcyOTE=" | base64 -d  # psg_7291
echo "cHNnXzQxNTY=" | base64 -d  # psg_4156
echo "cHNnXzMwNDg=" | base64 -d  # psg_3048
```

## Expected Participant Workflow

1. Open challenge URL in browser
2. Right-click → "View Page Source" or press Ctrl+U
3. Search for base64 patterns (look for `=` padding, alphanumeric strings)
4. Copy each suspicious string
5. Use online base64 decoder or command line
6. Identify strings matching `psg_####` format
7. Wrap in flag format: `HTB{psg_####}`
8. Submit to CTFd

## Common Mistakes to Watch For

- Submitting without HTB{} wrapper
- Case sensitivity errors
- Submitting decoy values
- Not decoding base64 (submitting encoded string)
