const VERIFY_TAG = "GIMK:"; 

function getKey(password) {
    return Array.from(password).map(char => char.charCodeAt(0));
}

function encrypt() {
    const text = document.getElementById("input").value;
    const password = document.getElementById("password").value;
    if (!text || !password) return alert("Enter message and password!");

    const key = getKey(password);
    const bytes = new TextEncoder().encode(VERIFY_TAG + text);

    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = bytes[i] ^ (key[i % key.length] + i) % 256;
    }

    document.getElementById("output").value = btoa(String.fromCharCode(...bytes));
}

function decrypt() {
    const text = document.getElementById("input").value;
    const password = document.getElementById("password").value;
    if (!text || !password) return alert("Enter encoded text and password!");

    try {
        const binary = atob(text);
        const bytes = new Uint8Array(binary.length);
        const key = getKey(password);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i) ^ (key[i % key.length] + i) % 256;
        }

        const decoded = new TextDecoder().decode(bytes);

        if (decoded.startsWith(VERIFY_TAG)) {
            document.getElementById("output").value = decoded.replace(VERIFY_TAG, "");
        } else {
            alert("❌ Incorrect Password!");
        }
    } catch (e) {
        alert("❌ Invalid Data!");
    }
}

function clearAll() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
}

function copyResult() {
    const output = document.getElementById("output");
    if (!output.value) return;
    output.select();
    document.execCommand("copy");
    alert("Copied!");
}
