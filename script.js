const jumpLinks = document.querySelectorAll('.jump-link');
const footnoteList = document.getElementById('footnote');

let activeLI = null;
let activeLink = null;
let highlightTimeout;

function showAction(li, link) {
  const button = li.querySelector('.action-btn');
  if (!button) return;

  if (activeLI) {
    activeLI.classList.remove('focused');
    const oldButton = activeLI.querySelector('.action-btn');
    if (oldButton) {
      oldButton.hidden = true;
      oldButton.setAttribute('aria-hidden', 'true');
    }
  }

  activeLI = li;
  activeLink = link;

  button.hidden = false;
  button.setAttribute('aria-hidden', 'false');

  li.classList.add('focused');
  li.focus();

  footnoteList.classList.add('highlight');

  clearTimeout(highlightTimeout);
  highlightTimeout = setTimeout(() => {
    footnoteList.classList.remove('highlight');
  }, 3000);
}

function hideAction() {
  if (!activeLI) return;

  const button = activeLI.querySelector('.action-btn');
  if (button) {
    button.hidden = true;
    button.setAttribute('aria-hidden', 'true');
  }

  activeLI.classList.remove('focused');
  footnoteList.classList.remove('highlight');

  if (activeLink) {
    activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
    activeLink.focus();
  }

  activeLI = null;
  activeLink = null;
}

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

document.querySelectorAll('.action-btn').forEach(button => {
  button.addEventListener('click', hideAction);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeLI) {
    hideAction();
  }
});
