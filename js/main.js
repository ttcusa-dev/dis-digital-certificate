document.addEventListener('DOMContentLoaded', () => {
    const loaderContainer = document.querySelector('.loader-container');
    const introContainer = document.querySelector('.intro-container');
    const mainContent = document.querySelector('.main-content');
    const specsSection = document.querySelector('.specifications-section');
    const primaryGem = document.querySelector('.primary-gem');
    const secondaryDiamonds = document.querySelector('.secondary-diamonds');
    const commentSection = document.querySelector('.product-description');

    // STEP 1: Show loader for 5 seconds
    // Loader is visible by default, others are hidden

    // STEP 2: After 5 seconds, hide loader and show intro video
    setTimeout(() => {
        loaderContainer.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            introContainer.classList.remove('hidden');
        }, 500);
    }, 5000);

    // STEP 3: After 8 seconds total (5s loader + 3s intro), show main content
    setTimeout(() => {
        introContainer.style.animation = 'fadeOut 1s ease-in-out forwards';
        setTimeout(() => {
            introContainer.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Start main content animations
            setTimeout(() => {
                mainContent.classList.add('visible');
            }, 100);
            
            setTimeout(() => {
                specsSection.classList.add('animate');
            }, 800);
            
            setTimeout(() => {
                primaryGem.classList.add('animate');
            }, 1200);
            
            setTimeout(() => {
                secondaryDiamonds.classList.add('animate');
            }, 1600);

            setTimeout(() => {
                commentSection.classList.add('animate');
            }, 2000);
        }, 1000);
    }, 8000);

    // Optional: Auto redirect after 12 seconds (uncomment if needed)
    setTimeout(() => {
        mainContent.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'product.html';
        }, 500);
    }, 20000); // 8s (loader+intro) + 12s (main content display)
});