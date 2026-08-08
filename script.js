const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const siteHeader = document.querySelector('.site-header');

const updateHeader = () => siteHeader.classList.toggle('scrolled', window.scrollY > 70);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

const modal = document.querySelector('.modal');
const entryForm = document.querySelector('.entry-form');
const entryFormWrap = document.querySelector('.entry-form-wrap');
const formSuccess = document.querySelector('.form-success');
document.querySelector('.entry-button').addEventListener('click', () => modal.showModal());
document.querySelectorAll('.modal-close, .modal-close-secondary').forEach(button => button.addEventListener('click', () => {
  modal.close();
  window.setTimeout(() => {
    entryFormWrap.hidden = false;
    formSuccess.hidden = true;
    entryForm.reset();
  }, 200);
}));
entryForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!entryForm.reportValidity()) return;
  entryFormWrap.hidden = true;
  formSuccess.hidden = false;
});
document.querySelectorAll('.policy-jump').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  target.open = true;
  target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}));
modal.addEventListener('click', event => {
  const box = modal.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) modal.close();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
