const Api_Url = "https://paraclete-backend.onrender.com/api/contact";

const services = {
    "website-development": ["E-commerce", "Portfolio Website", "Business Website", "Blog"],
    "graphic-design": ["Logo Design", "Branding", "UI/UX Design", "Illustration"],
    "data-analysis": ["Data Visualization", "Business Intelligence", "Machine Learning", "Big Data"],
    "marketing": ["SEO", "Social Media Marketing", "Email Marketing", "Affiliate Marketing"],
    "product-management": ["Roadmap Planning", "User  Research", "Wireframing", "Prototyping"],  
    "web-advertisement": ["Google Ads", "Facebook Ads", "Instagram Ads", "YouTube Ads"]
};


function showServices() {
    const techField = document.getElementById("techField").value;
    const serviceDropdown = document.getElementById("serviceType");
    const serviceOptionsDiv = document.getElementById("serviceOptions");
    const contactFormDiv = document.getElementById("contactForm");
    const messageDiv = document.getElementById("message");

    // Reset dropdown & messages
    serviceDropdown.innerHTML = `<option value="">-- Select a Service --</option>`;
    messageDiv.innerHTML = "";

    if (techField && services[techField]) {
        services[techField].forEach(service => {
            const option = document.createElement("option");
            option.value = service;
            option.textContent = service;
            serviceDropdown.appendChild(option);
        });

        serviceOptionsDiv.classList.remove("hidden");
        contactFormDiv.classList.add("hidden");
    } else {
        serviceOptionsDiv.classList.add("hidden");
    }
}

// Function to display the contact form
function showContactForm() {
    const serviceType = document.getElementById("serviceType").value;
    const contactFormDiv = document.getElementById("contactForm");

    if (serviceType) {
        contactFormDiv.classList.remove("hidden");
    } else {
        contactFormDiv.classList.add("hidden");
    }
}

// Form validation and submission
document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const techField = document.getElementById("techField").value;
    const serviceType = document.getElementById("serviceType").value;
    const messageDiv = document.getElementById("message");
    const submitButton = document.querySelector("button[type='submit']");
    const loader = document.getElementById("loader");

    messageDiv.innerHTML = ""; // Clear previous messages

    // Validate fields
    if (!fullName || !phone || !email || !techField || !serviceType) {
        messageDiv.innerHTML = `<p class="error">⚠️ Please fill in all fields.</p>`;
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        messageDiv.innerHTML = `<p class="error">⚠️ Full Name should only contain letters.</p>`;
        return;
    }

    if (!/^\d{11}$/.test(phone)) {
        messageDiv.innerHTML = `<p class="error">⚠️ Enter a valid phone number with at least 11 digits.</p>`;
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        messageDiv.innerHTML = `<p class="error">⚠️ Enter a valid email address.</p>`;
        return;
    }

    const formData = { techField, serviceType, fullName, phone, email };


    // Fade out the submit button and show the loader
    submitButton.classList.add("fade-out");
    loader.style.display = "block";

    try {
        const response = await fetch("https://paraclete-backend.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            messageDiv.innerHTML = `<p class="success">✅ Your request has been submitted successfully. Check your email for confirmation. We will contact you shortly.</p>`;
            document.getElementById("userForm").reset();
            document.getElementById("contactForm").classList.add("hidden"); 
        } else {
            messageDiv.innerHTML = `<p class="error">❌ Something went wrong. Please try again later.</p>`;
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        messageDiv.innerHTML = `<p class="error">❌ Unable to send request. Please check your internet connection and try again.</p>`;
    } finally {
        // Show the submit button again and hide the loader
        submitButton.classList.remove("fade-out");
        loader.style.display = "none";
    }
});