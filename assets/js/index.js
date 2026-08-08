  // Project Filtering Logic
  document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Formspree Contact Form Handler
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending message...';
    formStatus.style.display = 'none';

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.className = 'mt-2 text-center alert alert-success py-2';
            formStatus.innerText = 'Thank you! Your message has been sent successfully.';
            formStatus.style.display = 'block';
            form.reset();
        } else {
            const result = await response.json();
            formStatus.className = 'mt-2 text-center alert alert-danger py-2';
            if (Object.hasOwn(result, 'errors')) {
                formStatus.innerText = result["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.innerText = 'Oops! There was a problem submitting your form.';
            }
            formStatus.style.display = 'block';
        }
    } catch (error) {
        formStatus.className = 'mt-2 text-center alert alert-danger py-2';
        formStatus.innerText = 'Oops! There was a network error. Please try again.';
        formStatus.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Message';
    }
});