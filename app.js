const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Apply fade-in animation to the entire body content at once
    gsap.from("body", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });
});

document.getElementById("scanNFC").addEventListener("click", async () => {
    if ("NDEFReader" in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            document.getElementById("statusMessage").innerText = "🔍 Waiting for NFC scan...";

            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    const scannedText = decoder.decode(record.data);
                    console.log("NFC Data:", scannedText);

                    if (scannedText.trim() === "DE:F3:9C:C4") {
                        document.getElementById("statusMessage").innerText = "✅ Authentication Successful!";
                        setTimeout(() => {
                            window.location.href = "home.html"; // Redirect to Home Page
                        }, 1500);
                    } else {
                        document.getElementById("statusMessage").innerText = "❌ Authentication Failed! Invalid NFC.";
                    }
                }
            };
        } catch (error) {
            document.getElementById("statusMessage").innerText = "⚠️ NFC scanning failed. Try again.";
            console.error(error);
        }
    } else {
        alert("❌ Your browser does not support Web NFC. Use **Android Chrome 89+**.");
    }
});


