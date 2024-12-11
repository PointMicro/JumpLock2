document.getElementById("register-submit").addEventListener("click", async () => {
    const masterPassword = document.getElementById("new-master-password").value;
  
    if (masterPassword) {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(masterPassword),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      const derivedKey = await window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
  
      chrome.storage.local.set({ salt, derivedKey });
      alert("Master password registered successfully.");
      window.location.href = "login.html";
    }
  });
  