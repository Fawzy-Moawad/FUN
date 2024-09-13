

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /*Gallery Pictures Lightbox*/
  const lightbox = GLightbox({
    selector: 'a[data-gallery="gallery-item-pic"]',
  });
  
  // Optional: Handle swapping hero image
  const galleryImages = document.querySelectorAll('.gallery-pic');
  
  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      const newSrc = img.getAttribute('src');
    });
  });
  
  

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()



//Language

document.addEventListener('DOMContentLoaded', function () {
  let currentLanguage = 'en';

  function updateContent() {
      const navbarEn = document.getElementById('navbar-en');
      const navbarAr = document.getElementById('navbar-ar');
      const heroContentEn = document.getElementById('hero-content-en');
      const heroContentAr = document.getElementById('hero-content-ar');
      const aboutContentEn = document.getElementById('about-content-en');
      const aboutContentAr = document.getElementById('about-content-ar');
      const servicesContentEn = document.getElementById('services-content-en');
      const servicesContentAr = document.getElementById('services-content-ar');
      const servicesSocialContentEn = document.getElementById('services-social-content-en');
      const servicesSocialContentAr = document.getElementById('services-social-content-ar');
      const upcomingEventsContentEn = document.getElementById('upcomingEvents-content-en');
      const upcomingEventsContentAr = document.getElementById('upcomingEvents-content-ar');
      const galleryContentEn = document.getElementById('gallery-content-en');
      const galleryContentAr = document.getElementById('gallery-content-ar');
      const contactContentEn = document.getElementById('contact-content-en');
      const contactContentAr = document.getElementById('contact-content-ar');
      const footerContentEn = document.getElementById('footer-content-en');
      const footerContentAr = document.getElementById('footer-content-ar');
      const comingsoonContentEn = document.getElementById('comingsoon-content-en');
      const comingsoonContentAr = document.getElementById('comingsoon-content-ar');

      // Toggle visibility based on current language
      const elements = {
          navbarEn,
          navbarAr,
          heroContentEn,
          heroContentAr,
          aboutContentEn,
          aboutContentAr,
          servicesContentEn,
          servicesContentAr,
          galleryContentEn,
          galleryContentAr,
          servicesSocialContentEn,
          servicesSocialContentAr,
          upcomingEventsContentEn,
          upcomingEventsContentAr,
          contactContentEn,
          contactContentAr,
          footerContentEn,
          footerContentAr,
          comingsoonContentEn,
          comingsoonContentAr
      };

      for (const [key, value] of Object.entries(elements)) {
          if (value) {
              if (key.includes('En')) {
                  value.style.display = currentLanguage === 'en' ? 'block' : 'none';
              } else if (key.includes('Ar')) {
                  value.style.display = currentLanguage === 'ar' ? 'block' : 'none';
              }
          }
      }

      // Update the checkbox state
      const languageToggle = document.getElementById('languageToggle');
      if (languageToggle) {
          languageToggle.checked = currentLanguage === 'ar';
      }
  }

  function toggleLanguage() {
      currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', currentLanguage);
      updateContent();
  }

  // Get saved language from localStorage
  const savedLanguage = localStorage.getItem('lang');
  if (savedLanguage) {
      currentLanguage = savedLanguage;
  }

  // Set the initial state of the toggle switch
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
      languageToggle.checked = currentLanguage === 'ar';
      languageToggle.addEventListener('change', toggleLanguage);
  }

  updateContent();

  // Handle mobile nav toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function () {
          const navbarEn = document.getElementById('navbar-en');
          const navbarAr = document.getElementById('navbar-ar');
          if (currentLanguage === 'en' && navbarEn) {
              navbarEn.classList.toggle('navbar-mobile');
          } else if (currentLanguage === 'ar' && navbarAr) {
              navbarAr.classList.toggle('navbar-mobile');
          }
          this.classList.toggle('bi-x');
      });
  }
});









// our activities in about section


document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll(".row.p-3");

  rows.forEach(row => {
    const cards = row.querySelectorAll(".col-lg-6, .col-lg-12");

    // Reset heights to auto to get the natural height of each card
    cards.forEach(card => {
      card.style.height = "auto";
    });

    // Find the tallest card in this row
    let maxHeight = 0;
    cards.forEach(card => {
      const height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // Set all cards in this row to the height of the tallest card
    cards.forEach(card => {
      card.style.height = `${maxHeight}px`;
    });
  });
});




//our focus cards

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".ag-courses_item");

  // Reset heights to auto to get the natural height of each card
  cards.forEach(card => {
    card.style.height = "auto";
  });

  // Find the tallest card
  let maxHeight = 0;
  cards.forEach(card => {
    const height = card.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // Set all cards to the height of the tallest card
  cards.forEach(card => {
    card.style.height = `${maxHeight}px`;
  });
});
