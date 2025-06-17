document.addEventListener('DOMContentLoaded', () => {
    const introContainer = document.querySelector('.intro-container');
    const mainContent = document.querySelector('.main-content');
    const specsSection = document.querySelector('.specifications-section');
    const primaryGem = document.querySelector('.primary-gem');
    const secondaryDiamonds = document.querySelector('.secondary-diamonds');
    const commentSection = document.querySelector('.product-description');

    setTimeout(() => {
        mainContent.classList.remove('hidden');
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
    }, 3000);

    // setTimeout(() => {
    //     mainContent.style.opacity = '0';
    //     setTimeout(() => {
    //         window.location.href = 'product.html';
    //     }, 500);
    // }, 12000);
});