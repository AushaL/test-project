import mobileNav from './components/mobile-nav';
import languageSelect from './components/language-select';
import heroAnimation from './components/hero-animation';
heroAnimation;

window.addEventListener('load', () => {
  mobileNav();
  languageSelect();
  heroAnimation();
});
