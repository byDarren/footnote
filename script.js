const jumpLinks = document.querySelectorAll('.jump-link');
const footnoteList = document.getElementById('footnote');

let activeLI = null;
let activeLink = null;
let highlightTimeout;

function showAction(li, link) {
    const button = li.querySelector('.action-btn');
    if (!button) return;

    // Remove previous focused state
    if (activeLI) {
        activeLI.classList.remove('focused');
    }

    activeLI = li;
    activeLink = link;

    // Show the button
    button.hidden = false;

    // Focus the LI instead of the button
    li.classList.add('focused');
    li.focus();

    footnoteList.classList.add('highlight');

    // Remove highlight after 3 seconds
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(() => {
        footnoteList.classList.remove('highlight');
    }, 3000);
}

function hideAction() {
    if (!activeLI) return;

    const button = activeLI.querySelector('.action-btn');
    if (button) button.hidden = true;

    activeLI.classList.remove('focused');
    footnoteList.classList.remove('highlight');

    // Scroll back to the original jump link and focus it
    if (activeLink) {
        activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
        activeLink.focus();
    }

    activeLI = null;
    activeLink = null;
}

// Jump links
jumpLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const li = document.getElementById(targetId);
        if (!li) return;

        li.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showAction(li, link);
    });
});

// Return buttons
document.querySelectorAll('button.action-btn').forEach(button => {
    button.addEventListener('click', hideAction);
});
