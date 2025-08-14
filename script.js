// ========== Navbar hide/show au scroll ==========
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');


// Sélection des boutons et des cartes
const catButtons = document.querySelectorAll('.cat-btn');
const products = document.querySelectorAll('.food-card');

// Fonction pour filtrer les produits
catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Efface la classe active sur les autres boutons
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        products.forEach(product => {
            product.parentElement.style.display = 'none'; // cache tout d'abord
            if(filter === 'all' || product.getAttribute('data-category') === filter){
                // Affiche avec animation
                setTimeout(() => {
                    product.parentElement.style.display = 'block';
                    product.parentElement.classList.add('reveal');
                }, 50);
            }
        });
    });
});



window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Ajouter classe "scrolled" si on dépasse 50px
  if (scrollTop > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Cacher ou afficher la navbar selon le scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== Animation des sections au scroll ==========
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.classList.add('visible');
      entry.style.animation = 'fadeUp 0.8s ease-out';
    } else {
      entry.classList.remove('visible');
      entry.style.animation = 'none';
    }
  });
}, { threshold: 0.15 });

reveals.forEach(r => observer.observe(r));

// ========== Affichage du menu mobile ==========
const menuToggle = document.querySelector('.menu-toggle');

// ========== Scroll fluide pour les liens de la navbar ==========
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    if (a.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== Boutons "Commander" -> WhatsApp ==========
document.querySelectorAll('.food-card button').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.food-card');
    const title = card.querySelector('.card-title')?.innerText || 'Commande';
    const url = `https://wa.me/23563840280?text=Bonjour,%20je%20veux%20commander%20:%20${encodeURIComponent(title)}`;
    window.open(url, '_blank');
  });
});

// Animation au scroll pour les éléments .reveal
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    for (let el of reveals) {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("visible");
      }
    }
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Pour les éléments déjà visibles au chargement
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".cat-btn");
  const cards = document.querySelectorAll("#categoryGrid [data-cat]");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      cards.forEach(card => {
        const category = card.getAttribute("data-cat");
        card.style.display = (filter === "all" || category === filter) ? "block" : "none";
      });
    });
  });
});
menuToggle.addEventListener('click', () => {
  const menu = document.querySelector('.navbar-collapse');
    menu.classList.toggle('show');
    menuToggle.classList.toggle('active');
});
// ========== Affichage des catégories dans le menu ==========
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const category = link.getAttribute('data-category');
    document.querySelectorAll('.food-card').forEach(card => {
      if (card.getAttribute('data-category') === category || category === 'all') {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});