const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const foodCards = document.querySelectorAll(".food-card");
const menuImages = document.querySelectorAll(".food-card img");
const fallbackFoodImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85";
const menuItems = {
    "margherita-pizza": {
        name: "Margherita Pizza",
        category: "Wood-Fired Classic",
        price: "$14.99",
        time: "18 min",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85",
        description: "A crisp, blistered crust layered with bright tomato sauce, fresh mozzarella, basil, and a finishing touch of olive oil.",
        ingredients: ["San Marzano tomato", "Fresh mozzarella", "Basil leaves", "Extra virgin olive oil", "Wood-fired sourdough crust"]
    },
    "chicken-burger": {
        name: "Chicken Burger",
        category: "House Favorite",
        price: "$12.99",
        time: "15 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
        description: "A golden crispy chicken burger stacked with smoked aioli, cheddar, lettuce, and a toasted brioche bun.",
        ingredients: ["Crispy chicken fillet", "Smoked aioli", "Cheddar cheese", "Fresh lettuce", "Toasted brioche bun"]
    },
    "pasta-alfredo": {
        name: "Pasta Alfredo",
        category: "Creamy Signature",
        price: "$16.49",
        time: "16 min",
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=85",
        description: "Fettuccine tossed in parmesan cream with cracked pepper, herb oil, and a silky restaurant-style finish.",
        ingredients: ["Fettuccine pasta", "Parmesan cream", "Cracked black pepper", "Herb oil", "Italian parsley"]
    },
    "grilled-steak": {
        name: "Grilled Steak",
        category: "Premium Grill",
        price: "$28.99",
        time: "25 min",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
        description: "A char-grilled prime cut served with rosemary jus, roasted vegetables, and sea salt.",
        ingredients: ["Prime steak cut", "Rosemary jus", "Roasted vegetables", "Sea salt", "Garlic butter"]
    },
    "veg-biryani": {
        name: "Veg Biryani",
        category: "Aromatic Rice",
        price: "$13.99",
        time: "22 min",
        image: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=1200&q=85",
        description: "Fragrant basmati rice cooked with saffron, vegetables, mint, and slow-bloomed spices.",
        ingredients: ["Basmati rice", "Saffron", "Seasonal vegetables", "Mint and coriander", "House spice blend"]
    },
    "chocolate-cake": {
        name: "Chocolate Cake",
        category: "Dessert",
        price: "$8.99",
        time: "10 min",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1200&q=85",
        description: "Dark chocolate sponge layered with ganache, cocoa nibs, and a smooth vanilla cream finish.",
        ingredients: ["Dark chocolate sponge", "Chocolate ganache", "Cocoa nibs", "Vanilla cream", "Berry garnish"]
    }
};

function closeMobileMenu() {
    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.classList.remove("open");
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
}

foodCards.forEach((card) => {
    card.addEventListener("click", (event) => {
        const href = card.getAttribute("href");

        if (!href || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        window.location.href = href;
    });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();
        closeMobileMenu();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

function updateHeaderState() {
    const isScrolled = window.scrollY > 40;
    header?.classList.toggle("scrolled", isScrolled);
    backToTop?.classList.toggle("visible", window.scrollY > 520);
}

function updateActiveLink() {
    if (!sections.length) {
        return;
    }

    let currentSectionId = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
    });
}

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateActiveLink();
});

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    revealObserver.observe(element);
});

menuImages.forEach((image) => {
    image.addEventListener("error", () => {
        if (image.src !== fallbackFoodImage) {
            image.src = fallbackFoodImage;
        }
    });
});

function setFieldError(field, message) {
    const group = field.closest(".form-group");
    const errorMessage = group.querySelector(".error-message");

    group.classList.add("error");
    errorMessage.textContent = message;
}

function clearFieldError(field) {
    const group = field.closest(".form-group");
    const errorMessage = group.querySelector(".error-message");

    group.classList.remove("error");
    errorMessage.textContent = "";
}

function validateForm() {
    const name = contactForm.elements.name;
    const email = contactForm.elements.email;
    const phone = contactForm.elements.phone;
    const message = contactForm.elements.message;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+()\-\s0-9]{7,18}$/;
    let isValid = true;

    [name, email, phone, message].forEach(clearFieldError);

    if (name.value.trim().length < 2) {
        setFieldError(name, "Please enter at least 2 characters.");
        isValid = false;
    }

    if (!emailPattern.test(email.value.trim())) {
        setFieldError(email, "Please enter a valid email address.");
        isValid = false;
    }

    if (!phonePattern.test(phone.value.trim())) {
        setFieldError(phone, "Please enter a valid phone number.");
        isValid = false;
    }

    if (message.value.trim().length < 10) {
        setFieldError(message, "Please enter a message with at least 10 characters.");
        isValid = false;
    }

    return isValid;
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            formStatus.textContent = "";
            return;
        }

        formStatus.textContent = "Thank you. Your reservation request has been received.";
        contactForm.reset();
    });

    contactForm.querySelectorAll("input, textarea").forEach((field) => {
        field.addEventListener("input", () => {
            clearFieldError(field);
            formStatus.textContent = "";
        });
    });
}

function loadProductDetails() {
    const detailName = document.getElementById("detail-name");

    if (!detailName) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const itemKey = params.get("item") || "margherita-pizza";
    const item = menuItems[itemKey] || menuItems["margherita-pizza"];
    const detailImage = document.getElementById("detail-image");
    const detailIngredients = document.getElementById("detail-ingredients");

    document.title = `${item.name} | Restaurant Name`;
    detailName.textContent = item.name;
    document.getElementById("detail-category").textContent = item.category;
    document.getElementById("detail-description").textContent = item.description;
    document.getElementById("detail-price").textContent = item.price;
    document.getElementById("detail-time").textContent = item.time;
    detailImage.src = item.image;
    detailImage.alt = item.name;
    detailImage.addEventListener("error", () => {
        detailImage.src = fallbackFoodImage;
    });

    detailIngredients.innerHTML = item.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("");

    let quantity = 1;
    const quantityValue = document.getElementById("quantity-value");
    const detailStatus = document.getElementById("detail-status");

    document.getElementById("quantity-minus").addEventListener("click", () => {
        quantity = Math.max(1, quantity - 1);
        quantityValue.textContent = quantity;
    });

    document.getElementById("quantity-plus").addEventListener("click", () => {
        quantity = Math.min(10, quantity + 1);
        quantityValue.textContent = quantity;
    });

    document.getElementById("detail-order-btn").addEventListener("click", () => {
        detailStatus.textContent = `${quantity} ${item.name} added to your order.`;
    });
}

loadProductDetails();

updateHeaderState();
updateActiveLink();
