document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.querySelector('.intro-container');
    const mainContent = document.querySelector('.main-content');

    // After 5 seconds, show the main content
    setTimeout(() => {
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);
    }, 5000);

    // Handle dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Add dropdown options
        if (button.textContent.includes('STYLE')) {
            content.innerHTML = `
                <div class="dropdown-item">Classic Pendant</div>
                <div class="dropdown-item">Modern Pendant</div>
                <div class="dropdown-item">Vintage Pendant</div>
            `;
        } else if (button.textContent.includes('METAL')) {
            content.innerHTML = `
                <div class="dropdown-item">10k White Gold</div>
                <div class="dropdown-item">14k White Gold</div>
                <div class="dropdown-item">18k White Gold</div>
            `;
        }

        // Toggle dropdown
        button.addEventListener('click', (e) => {
            const isActive = dropdown.classList.contains('active');
            
            // Close all dropdowns first
            dropdowns.forEach(d => d.classList.remove('active'));
            
            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('active');
            }
        });

        // Handle dropdown item selection
        content.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                button.textContent = e.target.textContent;
                dropdown.classList.remove('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});