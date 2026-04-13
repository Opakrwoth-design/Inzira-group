// ===== FADE-UP: Trigger on scroll into view =====
const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));


// ===== NAVBAR: Sticky + Background change on scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.backgroundColor = '#1C343D';
        navbar.style.backdropFilter = 'blur(12px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        navbar.style.zIndex = '50';
    } else {
        navbar.style.position = 'relative';
        navbar.style.backgroundColor = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }
});


// ===== HAMBURGER MENU TOGGLE =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    } else {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
    }
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    });
});


// ===== SERVICES ACCORDION =====
const serviceData = [
    {
        title: "Permanent & Contract Talent Placement",
        description: "We partner with exceptional talent to deliver permanent and contract staffing solutions grounded in speed, compliance, and measurable performance outcomes. From initial role scoping through onboarding integration, we operate as a strategic talent partner — not a transactional search firm.",
        image: "/assets/img/inzira-3.png"
    },
    {
        title: "Executive Search",
        description: "We deliver transformational leaders equipped to drive organizational growth, transformation, and long-term enterprise value. Every engagement is executed with precision, discretion, and a long-term value creation lens.",
        image: "/assets/img/inzira-3.png"
    },
    {
        title: "Career Coaching",
        description: "We provide structured, personalized career advisory services to university students, mid-level professionals, and senior executives navigating critical transition points — equipping clients to compete effectively in both U.S. and international markets.",
        image: "/assets/img/inzira-3.png"
    },
    {
        title: "Training & Development",
        description: "We design and deliver high-impact training programs, executive seminars, and workforce development workshops that equip professionals with the skills, insight, and strategic confidence required to perform in dynamic, evolving industries.",
        image: "/assets/img/inzira-3.png"
    }
];

const accordions = document.querySelectorAll('.service-accordion');
const svcImage = document.getElementById('service-image');

function activateAccordion(index) {
    accordions.forEach((item, i) => {
        const body = item.querySelector('.service-accordion-body');
        const title = item.querySelector('.service-accordion-title');
        const para = body.querySelector('p');

        if (i === index) {
            para.textContent = serviceData[i].description;
            body.style.maxHeight = body.scrollHeight + 'px';
            title.style.color = '#E8A94A';
        } else {
            body.style.maxHeight = '0';
            title.style.color = '#20324A';
        }
    });

    // Swap image
    svcImage.style.opacity = '0';
    setTimeout(() => {
        svcImage.src = serviceData[index].image;
        svcImage.alt = serviceData[index].title;
        svcImage.style.opacity = '1';
    }, 250);
}

accordions.forEach((item, i) => {
    item.addEventListener('click', () => activateAccordion(i));
});

// Set first image only, no accordion open
if (accordions.length > 0 && svcImage) {
    svcImage.src = serviceData[0].image;
    svcImage.alt = serviceData[0].title;
}


// ===== VALUES CAROUSEL =====
const valuesData = [
     {
        title: "Integrity",
        description: "We operate with transparency and ethical responsibility, ensuring trust in every partnership we build.",
        image: "/assets/img/newEight.webp"
    },
    {
        title: "Excellence",
        description: "We are committed to delivering high-quality recruitment and talent development solutions that meet international standards.",
        image: "/assets/img/newSeven.webp"
    },
    {
        title: "Global Mindset",
        description: "We embrace diversity and innovation, preparing professionals and organizations to succeed in a borderless world.",
        image: "/assets/img/newOne.webp"
    },
    {
        title: "Empowerment",
        description: "We connect talent to opportunity, creating lasting impact through accountability and long-term partnerships.",
        image: "/assets/img/newFive.webp"
    },
    {
        title: "Innovation",
        description: "We leverage forward-thinking strategies and market intelligence to stay ahead in an ever-evolving global landscape.",
        image: "/assets/img/newFour.webp"
    },
    {
        title: "Accountability",
        description: "We take ownership of every engagement, measuring success by the lasting impact we create for clients and talent alike.",
        image: "/assets/img/newThree.webp"
    }
];

let currentValuesPage = 0;
const valuesPerPage = 3;
const valuesGrid = document.getElementById('values-grid');
const valuesPrev = document.getElementById('values-prev');
const valuesNext = document.getElementById('values-next');

function buildValueCard(value) {
    return `
        <div class="relative overflow-hidden rounded-2xl cursor-pointer group" style="height: 420px;">
            <!-- Image -->
            <img src="${value.image}" alt="${value.title}"
                class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />

            <!-- Default: no overlay -->

            <!-- Hover Overlay -->
            <div class="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-400"
                style="background: linear-gradient(to top, #1C343D 0%, rgba(28,52,89,0.3) 60%, transparent 100%);
                       opacity: 0; transform: translateY(10px);"
                data-overlay>
                <h4 class="text-white font-semibold text-xl mb-2">${value.title}</h4>
                <p class="text-white/80 text-sm font-normal leading-relaxed">${value.description}</p>
            </div>
        </div>
    `;
}

function renderValues() {
    const start = currentValuesPage * valuesPerPage;
    const end = start + valuesPerPage;
    const visible = valuesData.slice(start, end);

    // Fade out
    valuesGrid.style.opacity = '0';
    valuesGrid.style.transform = 'translateY(12px)';
    valuesGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
        valuesGrid.innerHTML = visible.map(buildValueCard).join('');

        // Attach hover events to overlays
        valuesGrid.querySelectorAll('[data-overlay]').forEach(overlay => {
            const card = overlay.parentElement;

            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            });

            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(10px)';
            });
        });

        // Fade in
        valuesGrid.style.opacity = '1';
        valuesGrid.style.transform = 'translateY(0)';
    }, 300);

    // Update arrow states
    valuesPrev.style.opacity = currentValuesPage === 0 ? '0.3' : '1';
    valuesPrev.style.pointerEvents = currentValuesPage === 0 ? 'none' : 'auto';

    const totalPages = Math.ceil(valuesData.length / valuesPerPage);
    valuesNext.style.opacity = currentValuesPage >= totalPages - 1 ? '0.3' : '1';
    valuesNext.style.pointerEvents = currentValuesPage >= totalPages - 1 ? 'none' : 'auto';
}

if (valuesPrev) {
    valuesPrev.addEventListener('click', () => {
        if (currentValuesPage > 0) {
            currentValuesPage--;
            renderValues();
        }
    });
}

if (valuesNext) {
    valuesNext.addEventListener('click', () => {
        const totalPages = Math.ceil(valuesData.length / valuesPerPage);
        if (currentValuesPage < totalPages - 1) {
            currentValuesPage++;
            renderValues();
        }
    });
}

// Initial render
if (valuesGrid) {
    renderValues();
}