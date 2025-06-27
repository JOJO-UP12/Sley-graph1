document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('fa-times');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        });
    });

    // Slider Hero
    const slides = document.querySelectorAll('.hero-slider .slide');
    const navBtns = document.querySelectorAll('.slider-nav .nav-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        navBtns.forEach(btn => btn.classList.remove('active'));
        
        slides[index].classList.add('active');
        navBtns[index].classList.add('active');
        currentSlide = index;
    }

    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);

    // Initial slide
    showSlide(0);

    // Animation on scroll
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox gallery
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('#modal-image');
    const modalCaption = document.querySelector('.caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Sample portfolio items (in a real app, these would come from a database)
    const portfolioData = [
        { 
            category: 'wedding', 
            img: 'images/portfolio/wedding1.jpg', 
            title: 'Mariage à Port-au-Prince', 
            desc: 'Cérémonie traditionnelle' 
        },
        { 
            category: 'wedding', 
            img: 'images/portfolio/wedding2.jpg', 
            title: 'Réception de mariage', 
            desc: 'Soirée dansante' 
        },
        { 
            category: 'portrait', 
            img: 'images/portfolio/portrait1.jpg', 
            title: 'Portrait studio', 
            desc: 'Séance professionnelle' 
        },
        { 
            category: 'portrait', 
            img: 'images/portfolio/portrait2.jpg', 
            title: 'Portrait extérieur', 
            desc: 'Lumière naturelle' 
        },
        { 
            category: 'family', 
            img: 'images/portfolio/family1.jpg', 
            title: 'Famille', 
            desc: 'Séance en plein air' 
        },
        { 
            category: 'family', 
            img: 'images/portfolio/family2.jpg', 
            title: 'Nouveau-né', 
            desc: 'Premières photos' 
        },
        { 
            category: 'event', 
            img: 'images/portfolio/event1.jpg', 
            title: 'Conférence', 
            desc: 'Événement corporate' 
        },
        { 
            category: 'event', 
            img: 'images/portfolio/event2.jpg', 
            title: 'Anniversaire', 
            desc: 'Fête privée' 
        },
        { 
            category: 'product', 
            img: 'images/portfolio/product1.jpg', 
            title: 'Produit cosmétique', 
            desc: 'Packshot professionnel' 
        },
        { 
            category: 'product', 
            img: 'images/portfolio/product2.jpg', 
            title: 'Accessoire mode', 
            desc: 'Photographie e-commerce' 
        }
    ];

    // Generate portfolio items
    function generatePortfolioItems() {
        portfolioGrid.innerHTML = '';
        
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            
            portfolioItem.addEventListener('click', () => {
                modalImg.src = item.img;
                modalCaption.textContent = item.title;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Load more items
    const loadMoreBtn = document.querySelector('#load-more');
    let visibleItems = 6;
    
    function showItems(count) {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            if (index < count) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        if (count >= items.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 3;
        showItems(visibleItems);
    });

    // Initialize portfolio
    generatePortfolioItems();
    showItems(visibleItems);

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form submission (simulated)
    const contactForm = document.getElementById('contactForm');
    const reservationForm = document.getElementById('reservation-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message! Je vous répondrai dès que possible.');
        contactForm.reset();
    });
    
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Votre demande de réservation a été envoyée. Vous recevrez une confirmation par email sous peu.');
        reservationForm.reset();
    });
});
