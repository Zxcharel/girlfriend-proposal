onload = () =>{
        document.body.classList.remove("container");
};

const noButton = document.getElementById('noButton');
const handEmoji = document.getElementById('handEmoji');
const pushDistance = 50; 
const threshold = 50;
let hideEmojiTimeout;

document.addEventListener('mousemove', (event) => {
    const rect = noButton.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const noButtonCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };

    const distance = Math.hypot(
        event.clientX - noButtonCenter.x,
        event.clientY - noButtonCenter.y
    );

    if (distance < threshold) {
        const angle = Math.atan2(
            event.clientY - noButtonCenter.y,
            event.clientX - noButtonCenter.x
        );

        let newX = noButtonCenter.x - Math.cos(angle) * pushDistance;
        let newY = noButtonCenter.y - Math.sin(angle) * pushDistance;

        // Ensure the new position is within the viewport
        newX = Math.max(rect.width / 2, Math.min(viewportWidth - rect.width / 2, newX));
        newY = Math.max(rect.height / 2, Math.min(viewportHeight - rect.height / 2, newY));

        noButton.style.position = 'absolute';
        noButton.style.left = `${newX - rect.width / 2}px`;
        noButton.style.top = `${newY - rect.height / 2}px`;

        handEmoji.style.left = `${noButtonCenter.x - 12}px`;
        handEmoji.style.top = `${noButtonCenter.y - 12}px`;
        handEmoji.classList.remove('hidden');

        clearTimeout(hideEmojiTimeout);
    } else {

        clearTimeout(hideEmojiTimeout);
        hideEmojiTimeout = setTimeout(() => {
            handEmoji.classList.add('hidden');
        }, 2000);
    }
});