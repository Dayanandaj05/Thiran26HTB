const H = [
    "748c1b3e9d5d254457fd822cd1cf7b4e42a4f625bdf6eda1cd6adee4f6bc22e5",
    "04dc2deea9389b1a86609ad4b7ba1bfdb48192e70eb06ab0ae2e440868c5d53e",
    "38f3086ddd61c6a5366d7a59fce3f7ecd98965f3a03bcf9caf68ea8369ad47c2",
    "43e52bd64304001a3ada80054b54ef1433c8f6695547a4fca09b38b488f87446"
];

const state = {
    step: 1,
    unlocked: new Set([1])
};

const q = (sel) => document.querySelector(sel);
const qa = (sel) => Array.from(document.querySelectorAll(sel));

const enc = (s) => new TextEncoder().encode(s);
const hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
const sha256 = async (s) => hex(await crypto.subtle.digest("SHA-256", enc(s)));

const stepMap = {
    1: "hint2",
    2: "hint3",
    3: "hint4",
    4: "hint5"
};

function setStatus(text) {
    q("#progressStatus").textContent = text;
}

function unlockStep(step) {
    const card = q(`.step[data-step="${step}"]`);
    if (!card) {
        return;
    }
    card.classList.remove("is-locked");
    const input = q(`#step${step}Input`);
    const btn = q(`.step-btn[data-step="${step}"]`);
    if (input) {
        input.disabled = false;
    }
    if (btn) {
        btn.disabled = false;
    }
    state.unlocked.add(step);
}

function lockStep(step) {
    const card = q(`.step[data-step="${step}"]`);
    if (!card) {
        return;
    }
    card.classList.add("is-locked");
    const input = q(`#step${step}Input`);
    const btn = q(`.step-btn[data-step="${step}"]`);
    if (input) {
        input.disabled = true;
    }
    if (btn) {
        btn.disabled = true;
    }
}

function showResult(step, ok, message) {
    const result = q(`#step${step}Result`);
    if (!result) {
        return;
    }
    result.className = `step-result ${ok ? "success" : "error"}`;
    result.textContent = message;
}

function unlockHint(hintId) {
    const hint = q(`#${hintId}`);
    if (!hint) {
        return;
    }
    hint.classList.remove("locked");
    hint.classList.add("unlocked");
    const icon = hint.querySelector(".lock-icon");
    if (icon) {
        icon.textContent = "[open]";
    }
}

async function verifyStep(step) {
    if (!state.unlocked.has(step)) {
        return;
    }
    const input = q(`#step${step}Input`);
    if (!input) {
        return;
    }
    const value = input.value.trim();
    if (!value) {
        showResult(step, false, "Input required.");
        return;
    }

    const digest = await sha256(value);
    if (digest === H[step - 1]) {
        showResult(step, true, "Verified. Proceed to the next layer.");
        const next = step + 1;
        if (stepMap[step]) {
            unlockHint(stepMap[step]);
        }
        if (next <= 4) {
            unlockStep(next);
            setStatus(`Awaiting Step ${next}`);
        } else {
            setStatus("Signal restored");
            q("#statusCard").classList.add("complete");
        }
        state.step = Math.max(state.step, next);
    } else {
        showResult(step, false, "Invalid output. Recheck the order.");
    }
}

function bindSteps() {
    qa('.step-btn[data-action="verify"]').forEach((btn) => {
        btn.addEventListener("click", () => verifyStep(Number(btn.dataset.step)));
    });

    qa(".step-input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const step = Number(input.id.replace("step", "").replace("Input", ""));
                verifyStep(step);
            }
        });
    });
}

async function loadAPI() {
    try {
        const response = await fetch("fake_api.json", { cache: "no-store" });
        const data = await response.json();
        q("#authToken").textContent = data.auth_token || "Unavailable";
        q("#breachStatus").textContent = (data.status || "unknown").toUpperCase();
        console.info("Hint: check the Network tab for the API response.");
    } catch (err) {
        q("#authToken").textContent = "Unavailable";
        q("#breachStatus").textContent = "UNKNOWN";
        console.info("Hint: make sure fake_api.json is reachable.");
    }
}

function init() {
    lockStep(2);
    lockStep(3);
    lockStep(4);
    bindSteps();
    loadAPI();
}

window.addEventListener("DOMContentLoaded", init);
