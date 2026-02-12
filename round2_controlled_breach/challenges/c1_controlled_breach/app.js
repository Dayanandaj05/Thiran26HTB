// encryption_order: reverse_xor_rot13_base64
const h = s => btoa(s.split('').reverse().join(''));
const v = ['MTI0OF9nc3A=', 'WllNdRIeGBs=', 'TUxaaBIeGBs=', 'cHNnXzg0MjE='];

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
    
    if (h(input) === v[0]) {
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
    
    if (h(input) === v[1]) {
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
    
    if (h(input) === v[2]) {
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
    
    if (h(input) === v[3]) {
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
