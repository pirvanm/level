(() => {
    var swiper = new Swiper(".swiper-container", {
        cssMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
      });

    // header ( nav, menu ) area and modals
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const contentWrapper = document.getElementById('contentWrapper');

    function scrollToTargetAdjusted(el){
        const headerOffset = document.getElementById('header').offsetHeight;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach((navLink) => {
        navLink.addEventListener('click', (e) => {
            e.preventDefault();
            //document.getElementById(navLink.dataset.target).scrollIntoView({block: 'nearest'});
            scrollToTargetAdjusted(document.getElementById(navLink.dataset.target));

            const navLinksActive = document.querySelectorAll('.nav__link--active');
            
            navLinksActive.forEach((navLinkActive) => {
                navLinkActive.classList.remove('nav__link--active');
            })

            navLink.classList.add('nav__link--active');
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');

    const modalViews = document.querySelectorAll('.modal');
    const modalsBtns = document.querySelectorAll('.modal-btn');
    const modalClose = document.querySelectorAll('.modal-close')

    let modal = function(modalClick) {
        modalViews[modalClick].classList.add('modal-active');
        window.location.hash = modalViews[modalClick].dataset.hash;
    }

    modalsBtns.forEach((modalBtn, i) => {
        modalBtn.addEventListener('click', () => {
            modal(i);
        });
    });

    modalClose.forEach((modalClose) => {
        modalClose.addEventListener('click', () => {
            modalViews.forEach((modalView) => {
                modalView.classList.remove('modal-active');
            })
        });
    });

    function loadModalBasedOnHash() {
        modalViews.forEach((modal) => {
            modal.classList.remove('modal-active');
        })

        if(window.location.hash) {
            let hash = window.location.hash;
            let projectNumModal = parseInt(hash[hash.length - 1]);

            modal(projectNumModal + 2);

        } 
    }

    window.addEventListener('hashchange', () => {
        loadModalBasedOnHash();
      }, false);

      loadModalBasedOnHash();

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

        window.addEventListener('scroll', () => {
        if (window.scrollY > 125) {
            header.classList.add('header-shadow');
        }

        if (window.scrollY < 125) {
            header.classList.remove('header-shadow');
        }
        
    });

    // the radial progress thing
    const progress1 = new ProgressBar.Circle('#progress1', {
        color: 'hsl(338, 75%, 55%)',
        trailColor: 'hsl(338, 60%, 26%)',
        trailWidth: 10,
        strokeWidth: 10,
        duration: 2000, // milliseconds
        easing: 'easeInOut'
        });

    progress1.animate(0.90); // percent

    const progress2 = new ProgressBar.Circle('#progress2', {
        color: 'hsl(338, 75%, 55%)',
        trailColor: 'hsl(338, 60%, 26%)',
        trailWidth: 10,
        strokeWidth: 10,
        duration: 2000, // milliseconds
        easing: 'easeInOut'
        });

    progress2.animate(0.90); // percent

    const progress3 = new ProgressBar.Circle('#progress3', {
        color: 'hsl(338, 75%, 55%)',
        trailColor: 'hsl(338, 60%, 26%)',
        trailWidth: 10,
        strokeWidth: 10,
        duration: 2000, // milliseconds
        easing: 'easeInOut'
        });

    progress3.animate(0.90); // percent



    // Circles canvas animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.bottom = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    canvas.style.zIndex = "-999";
    
    const circlesNum = 60;
    let circles = [];

    function generateCircles() {
        for (let i = 0; i < circlesNum; i++) {
            let speedX = Math.random();
            let speedY = Math.random();
            const circle = {
                x: Math.floor(Math.random() * canvas.width) + 1,
                y: Math.floor(Math.random() * canvas.height) + 1,
                color: "rgb("+ Math.floor(Math.random() * 255)+","+ Math.floor(Math.random() * 255) +","+ Math.floor(Math.random() * 255)+")",
                speedX: speedX,
                speedY: speedY,
                negativeX: 1,
                negativeY: 1,
            };

            if (Math.floor(Math.random() * 10) > 5) {
                circle.negativeX = -1;
            }

            if (Math.floor(Math.random() * 10) > 5) {
                circle.negativeY = -1;
            }

            circles.push(circle)
        }
    }

    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        circles = [];
        generateCircles();
    });

    let currentTime;
    let lastTime = 0;
    let delta = 0;

    generateCircles();
    function loop() {
        window.requestAnimationFrame(loop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!currentTime) {
            currentTime = performance.now();
        } else {
            delta = currentTime - lastTime;
        }

        if (delta > 56) {
            delta = 56;
        } 
        

        delta /= 90;

        circles.forEach((circle) => {
            circle.x += circle.speedX * delta * circle.negativeX;
            circle.y += circle.speedY * delta * circle.negativeY;

            ctx.beginPath();
                ctx.arc(circle.x, circle.y, 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = circle.color;
            ctx.fill();
        });

        
    }

    loop();

    
})();