// encryption_order: reverse_xor_rot13_base64
// decryption_order: base64_rot13_xor_reverse
const h = s => btoa(s.split('').reverse().join(''));
const rot13 = s => s.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));
const xorDecode = s => s.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 0x2A)).join('');

// v[0]: after base64 decode (binary with hZLM)
// v[1]: after rot13 reverse (binary with uMYZ)
// v[2]: after xor reverse (1248_gsp)
// v[3]: final plaintext reversed (psg_8421)
const v = [
    h(String.fromCharCode(0x1b, 0x18, 0x1e, 0x12) + 'hZLM'),
    h(String.fromCharCode(0x1b, 0x18, 0x1e, 0x12) + 'uMYZ'),
    h('1248_gsp'),
    h('psg_8421')
];

let apiData = null;

async function loadAPI() {
    try {
        const response = await fetch('fake_api.json');
        apiData = await response.json();
        console.log('[DEBUG] API loaded:', apiData.status);
        console.log('[HINT] Check network tab for API response');
        updateDashboard();
    } catch (error) {
        console.error('[ERROR] Failed to load API');
    }
}

function updateDashboard() {
    if (apiData) {
        document.getElementById('breachStatus').textContent = apiData.status.toUpperCase();
        document.getElementById('apiVersion').textContent = apiData.api_version;
    }
}

function toggleConsole() {
    const body = document.getElementById('consoleBody');
    const arrow = document.getElementById('consoleArrow');
    body.classList.toggle('open');
    arrow.classList.toggle('open');
}

function validateStep1() {
    const input = document.getElementById('step1Input').value.trim();
    const result = document.getElementById('step1Result');
    
    // Check if input matches base64 decoded result
    const encoded = btoa(input);
    if (encoded === btoa(String.fromCharCode(0x1b, 0x18, 0x1e, 0x12) + 'hZLM')) {
        result.className = 'validation-result success';
        result.textContent = '✓ Correct! Unlocking Hint 2...';
        result.style.display = 'block';
        unlockHint('hint2');
    } else {
        result.className = 'validation-result error';
        result.textContent = '✗ Incorrect. Try again.';
        result.style.display = 'block';
    }
}

function validateStep2() {
    const input = document.getElementById('step2Input').value.trim();
    const result = document.getElementById('step2Result');
    
    // Check if input matches ROT13 applied result
    const encoded = btoa(input);
    if (encoded === btoa(String.fromCharCode(0x1b, 0x18, 0x1e, 0x12) + 'uMYZ')) {
        result.className = 'validation-result success';
        result.textContent = '✓ Correct! Unlocking Hint 3...';
        result.style.display = 'block';
        unlockHint('hint3');
    } else {
        result.className = 'validation-result error';
        result.textContent = '✗ Incorrect. Try again.';
        result.style.display = 'block';
    }
}

function validateStep3() {
    const input = document.getElementById('step3Input').value.trim();
    const result = document.getElementById('step3Result');
    
    // Check if input matches XOR applied result
    if (input === '1248_gsp') {
        result.className = 'validation-result success';
        result.textContent = '✓ Correct! Unlocking Hint 4...';
        result.style.display = 'block';
        unlockHint('hint4');
    } else {
        result.className = 'validation-result error';
        result.textContent = '✗ Incorrect. Try again.';
        result.style.display = 'block';
    }
}

function validateStep4() {
    const input = document.getElementById('step4Input').value.trim();
    const result = document.getElementById('step4Result');
    
    // Check if input matches final reversed plaintext
    if (input === 'psg_8421') {
        result.className = 'validation-result success';
        result.textContent = '✓ Signal Extracted! Challenge Complete!';
        result.style.display = 'block';
        unlockHint('hint5');
    } else {
        result.className = 'validation-result error';
        result.textContent = '✗ Incorrect. Try again.';
        result.style.display = 'block';
    }
}

function unlockHint(hintId) {
    const hint = document.getElementById(hintId);
    hint.classList.remove('locked');
    hint.classList.add('unlocked');
    const icon = hint.querySelector('.lock-icon');
    icon.textContent = '🔓';
}

// mirror_reflection_disabled
window.addEventListener('DOMContentLoaded', () => {
    loadAPI();
    console.log('[SYSTEM] Developer portal initialized');
    console.log('[WARNING] Unauthorized access detected');
});
