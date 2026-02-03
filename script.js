// ===== Countdown Timer =====
function updateCountdown() {
    const weddingDate = new Date('March 6, 2026 10:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="color: var(--color-gold-light); font-size: 1.5rem;">The wedding day is here!</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background Change on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Guest Management =====
const MAX_GUESTS = 3;
let guestCount = 0;

const addGuestBtn = document.getElementById('addGuestBtn');
const guestInputsContainer = document.getElementById('guestInputs');
const maxGuestsMessage = document.getElementById('maxGuestsMessage');

function updateGuestUI() {
    if (guestCount >= MAX_GUESTS) {
        addGuestBtn.disabled = true;
        addGuestBtn.textContent = 'Maximum Reached';
        maxGuestsMessage.style.display = 'block';
    } else {
        addGuestBtn.disabled = false;
        addGuestBtn.textContent = '+ Add Guest';
        maxGuestsMessage.style.display = 'none';
    }
}

function addGuestInput() {
    if (guestCount >= MAX_GUESTS) return;

    guestCount++;
    const guestRow = document.createElement('div');
    guestRow.className = 'guest-input-row';
    guestRow.dataset.guestNumber = guestCount;

    guestRow.innerHTML = `
        <span class="guest-label">Guest ${guestCount}:</span>
        <input type="text" name="guest${guestCount}" placeholder="Enter guest's full name" required>
        <button type="button" class="btn-remove-guest" onclick="removeGuest(this)" aria-label="Remove guest">&times;</button>
    `;

    guestInputsContainer.appendChild(guestRow);
    updateGuestUI();

    // Focus on the new input
    guestRow.querySelector('input').focus();
}

function removeGuest(button) {
    const row = button.closest('.guest-input-row');
    row.style.animation = 'slideIn 0.2s ease reverse';
    setTimeout(() => {
        row.remove();
        guestCount--;
        renumberGuests();
        updateGuestUI();
    }, 200);
}

function renumberGuests() {
    const rows = guestInputsContainer.querySelectorAll('.guest-input-row');
    rows.forEach((row, index) => {
        const num = index + 1;
        row.dataset.guestNumber = num;
        row.querySelector('.guest-label').textContent = `Guest ${num}:`;
        row.querySelector('input').name = `guest${num}`;
    });
}

// Make removeGuest available globally
window.removeGuest = removeGuest;

addGuestBtn.addEventListener('click', addGuestInput);

// ===== RSVP Form Handling =====
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');

rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate at least one event is selected
    const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
    if (eventCheckboxes.length === 0) {
        alert('Please select at least one event to attend.');
        return;
    }

    // Collect form data
    const formData = new FormData(rsvpForm);

    // Add events as a combined string
    const events = Array.from(eventCheckboxes).map(cb => cb.value).join(', ');
    formData.set('events_attending', events);

    // Add guest count
    formData.set('total_attendees', 1 + guestCount);

    // Submit to Formspree
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(rsvpForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            rsvpForm.classList.add('hidden');
            rsvpSuccess.classList.add('show');
            rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Sorry, there was an error submitting your RSVP. Please try again or contact us directly.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== Gallery Lightbox (Basic Implementation) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    });
});

// ===== Add animation class styles dynamically =====
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(style);

// ===== Utility: View RSVPs (for admin purposes) =====
window.viewRSVPs = function() {
    const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    console.table(rsvps);

    // Also show a summary
    let totalGuests = 0;
    rsvps.forEach(r => {
        totalGuests += r.totalAttendees || 1;
    });
    console.log(`Total RSVPs: ${rsvps.length}`);
    console.log(`Total Attendees: ${totalGuests}`);

    return rsvps;
};

// ===== Utility: Export RSVPs as CSV =====
window.exportRSVPsToCSV = function() {
    const rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    if (rsvps.length === 0) {
        console.log('No RSVPs to export');
        return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Events', 'Guest 1', 'Guest 2', 'Guest 3', 'Total Attendees', 'Dietary', 'Message', 'Timestamp'];
    const csvContent = [
        headers.join(','),
        ...rsvps.map(r => [
            `"${r.name || ''}"`,
            `"${r.email || ''}"`,
            `"${r.phone || ''}"`,
            `"${(r.events || []).join('; ')}"`,
            `"${(r.guests && r.guests[0]) || ''}"`,
            `"${(r.guests && r.guests[1]) || ''}"`,
            `"${(r.guests && r.guests[2]) || ''}"`,
            `"${r.totalAttendees || 1}"`,
            `"${(r.dietary || '').replace(/"/g, '""')}"`,
            `"${(r.message || '').replace(/"/g, '""')}"`,
            `"${r.timestamp || ''}"`
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding_rsvps.csv';
    a.click();
    URL.revokeObjectURL(url);

    console.log('CSV exported successfully!');
};

// ===== Utility: Clear all RSVPs (use with caution) =====
window.clearRSVPs = function() {
    if (confirm('Are you sure you want to clear all RSVPs? This cannot be undone.')) {
        localStorage.removeItem('wedding_rsvps');
        console.log('All RSVPs cleared.');
    }
};
