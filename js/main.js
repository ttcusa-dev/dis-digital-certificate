document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.querySelector('.intro-container');
    const mainContent = document.querySelector('.main-content');
    const specsSection = document.querySelector('.specifications-section');
    const primaryGem = document.querySelector('.primary-gem');
    const secondaryDiamonds = document.querySelector('.secondary-diamonds');
    const commentSection = document.querySelector('.product-description');

    // After 3 seconds, show the main content
    setTimeout(() => {
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);

        // Animate the specifications section with modal effect
        setTimeout(() => {
            specsSection.classList.add('animate');
        }, 800);

        // Animate primary gem section
        setTimeout(() => {
            primaryGem.classList.add('animate');
        }, 1200);

        // Animate secondary diamonds section
        setTimeout(() => {
            secondaryDiamonds.classList.add('animate');
        }, 1600);

        // Animate the comments section with modal effect
        setTimeout(() => {
            commentSection.classList.add('animate');
        }, 2000);
    }, 3000);

    // // Add redirect after animations complete
    // setTimeout(() => {
    //     mainContent.style.opacity = '0';
    //     setTimeout(() => {
    //         window.location.href = 'product.html';
    //     }, 500);
    // }, 12000);
});