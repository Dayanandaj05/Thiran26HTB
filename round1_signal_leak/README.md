# Round 1: Signal Leak - Deployment Guide

## Directory Structure
```
round1_signal_leak/
├── ADMIN_TOKENS.json          # Internal token system (DO NOT DEPLOY)
├── ADMIN_SOLUTIONS.md         # Solution guide (DO NOT DEPLOY)
├── CTFD_CONFIG.md             # CTFd setup instructions
├── README.md                  # This file
└── challenges/
    ├── c1_hidden_in_plain_sight/
    │   └── index.html
    ├── c2_noise_filter/
    │   └── index.html
    └── c3_signal_extraction/
        └── index.html
```

## Quick Start

### 1. Web Server Setup

**Option A: Python HTTP Server (Simple)**
```bash
cd challenges
python3 -m http.server 8080
```
Access: `http://localhost:8080/c1_hidden_in_plain_sight/`

**Option B: Nginx (Production)**
```bash
# Copy challenges to nginx directory
sudo cp -r challenges/* /var/www/html/ctf/

# Configure nginx
sudo nano /etc/nginx/sites-available/ctf
```

Nginx config:
```nginx
server {
    listen 80;
    server_name ctf.local;
    root /var/www/html/ctf;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 2. CTFd Configuration

1. Access CTFd admin panel: `http://[CTFD_IP]:8000/admin`
2. Navigate to "Challenges" → "Create Challenge"
3. For each challenge, use details from `CTFD_CONFIG.md`
4. Set challenge type: "Standard"
5. Add flag with case-sensitive matching
6. Update URLs to point to your web server

### 3. Docker Setup (Optional)

If running CTFd in Docker:
```bash
# Start CTFd
docker-compose up -d

# Access CTFd
http://localhost:8000
```

### 4. Testing Checklist

- [ ] All 3 challenge pages load correctly
- [ ] View source works in browser
- [ ] Base64 strings are visible in source
- [ ] Flags validate correctly in CTFd
- [ ] No admin files are accessible to participants
- [ ] Server accessible from all lab machines

## Security Notes

**Files to NEVER deploy to web server:**
- `ADMIN_TOKENS.json`
- `ADMIN_SOLUTIONS.md`
- `README.md`

**Only deploy:**
- `challenges/` directory contents

## Network Configuration

For LAN-only event:
1. Disable internet access on lab network
2. Set static IP for CTFd server
3. Configure DNS or use IP addresses
4. Test connectivity from participant machines

Example participant URLs:
```
http://192.168.1.100/c1_hidden_in_plain_sight/
http://192.168.1.100/c2_noise_filter/
http://192.168.1.100/c3_signal_extraction/
```

## Troubleshooting

**Challenge pages not loading:**
- Check web server is running
- Verify file permissions (755 for directories, 644 for files)
- Check firewall rules

**Flags not validating:**
- Ensure case-sensitive matching is enabled
- Verify flag format exactly: `HTB{psg_####}`
- Check for extra spaces or characters

**Participants can't access:**
- Verify network connectivity
- Check IP address/hostname
- Ensure web server is listening on correct interface

## Modifying Signals

To change signals for future events:

1. Edit `ADMIN_TOKENS.json`
2. Update `decoded_value` for real signals (keep `psg_####` format)
3. Run generation script (or manually update HTML):
   ```bash
   # Encode new signal
   echo -n "psg_9999" | base64
   ```
4. Replace encoded value in corresponding HTML file
5. Update flag in CTFd
6. Update `ADMIN_SOLUTIONS.md`

## Event Day Checklist

- [ ] CTFd running and accessible
- [ ] Web server running
- [ ] All challenges tested
- [ ] Scoreboard enabled
- [ ] Admin credentials secured
- [ ] Backup of all files
- [ ] Network isolated from internet
- [ ] Participant instructions distributed

## Support

During event, monitor:
- CTFd logs for errors
- Web server access logs
- Participant questions about challenge access

Common participant questions:
- "Where do I find the flag?" → Inspect the page source
- "What format?" → HTB{psg_####}
- "How to decode?" → Use base64 decoder
