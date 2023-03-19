console.log('- .... . .-. . -....- .. ... -....- -. --- -....- .--- --- -.- . -....- .... . .-. .');

//// Removes .preload from <body> after page load to enable transitions.
window.onload = function() {
    document.body.classList.remove('preload');
  };


//// Theme Swapping
const portrait = document.getElementById('portrait');
const themeToggle = document.getElementById('theme-toggle');
const darkModeSpan = document.getElementById('dark-mode-span');
const lightModeSpan = document.getElementById('light-mode-span');
const socialIcons = document.getElementsByClassName('social-icon');

// Retrieve theme preference from device
var storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme);

// Toggle between light and dark
themeToggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var targetTheme = 'light';

    if (currentTheme === 'light') {
        targetTheme = 'dark';
        lightModeSpan.style.display = 'none';
        darkModeSpan.style.display = 'block';
        portrait.src = 'images/2.png';
        // Loop through array of social icons to invert them
        for(var i=0; i < socialIcons.length; i++) {
            socialIcons[i].style.filter = 'invert(100%)';
        }
    } else {
        targetTheme = 'light';
        darkModeSpan.style.display = 'none';
        lightModeSpan.style.display = 'block';
        portrait.src = 'images/2.png';
        // Loop through socials array to unset filter
        for(var i=0; i < socialIcons.length; i++) {
            socialIcons[i].style.filter = 'unset';
        }
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
};

// Apply correct theme button on pageload
function refreshThemeToggle() {
    if (darkModeSpan && lightModeSpan) { // Null check
        if (storedTheme === 'dark') {
            darkModeSpan.style.display = 'block';
            lightModeSpan.style.display = 'none';
            portrait.src = 'images/2.png';
            for(var i=0; i < socialIcons.length; i++) {
                socialIcons[i].style.filter = 'invert(100%)';
            }
        } else {
            lightModeSpan.style.display = 'block';
            darkModeSpan.style.display = 'none';
            portrait.src = 'images/2.png';
        }
    }
};

refreshThemeToggle();

//// Monitor when #navbar changes in visibility and if it triggers CSS position: sticky;, apply class .sticky to allow styling.  Footer is disabled.

const navbar = document.getElementById("navbar");
//const footer = document.getElementById("footer-global");

const stickyObserver = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle("sticky", e.intersectionRatio < 1),
    { threshold: [1] }
    );

stickyObserver.observe(navbar);
//stickyObserver.observe(footer);