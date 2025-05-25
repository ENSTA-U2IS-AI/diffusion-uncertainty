// Add js-loaded class for animation fallbacks
document.documentElement.classList.add('js-loaded');

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
	el: document.querySelector('[data-scroll-container]'),
	smooth: true,
	smoothMobile: true,
	multiplier: 1,
	class: 'is-reveal'
});

// Register ScrollTrigger with Locomotive Scroll
gsap.registerPlugin(ScrollTrigger);

scroll.on("scroll", (instance) => {
	document.documentElement.setAttribute('data-scroll-y', instance.scroll.y);
});

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
	scrollTop(value) {
		return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

// GSAP Animations
gsap.set(".fade-in", { opacity: 0, y: 50 });
gsap.set(".fade-in-left", { opacity: 0, x: -50 });
gsap.set(".fade-in-right", { opacity: 0, x: 50 });
gsap.set(".scale-in", { opacity: 0, scale: 0.8 });

// Animate elements on scroll
gsap.utils.toArray(".fade-in").forEach((element) => {
	gsap.to(element, {
		opacity: 1,
		y: 0,
		duration: 1,
		ease: "power2.out",
		scrollTrigger: {
			trigger: element,
			scroller: "[data-scroll-container]",
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse"
		}
	});
});

gsap.utils.toArray(".fade-in-left").forEach((element) => {
	gsap.to(element, {
		opacity: 1,
		x: 0,
		duration: 1,
		ease: "power2.out",
		scrollTrigger: {
			trigger: element,
			scroller: "[data-scroll-container]",
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse"
		}
	});
});

gsap.utils.toArray(".fade-in-right").forEach((element) => {
	gsap.to(element, {
		opacity: 1,
		x: 0,
		duration: 1,
		ease: "power2.out",
		scrollTrigger: {
			trigger: element,
			scroller: "[data-scroll-container]",
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse"
		}
	});
});

gsap.utils.toArray(".scale-in").forEach((element) => {
	gsap.to(element, {
		opacity: 1,
		scale: 1,
		duration: 1,
		ease: "back.out(1.7)",
		scrollTrigger: {
			trigger: element,
			scroller: "[data-scroll-container]",
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none reverse"
		}
	});
});

// Hero title animation
gsap.fromTo(".hero h1",
	{ opacity: 0, y: 100, scale: 0.8 },
	{ opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
);

// Hero subtitle animation
gsap.fromTo(".hero p",
	{ opacity: 0, y: 50 },
	{ opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
);

// Hero buttons animation
gsap.fromTo(".hero .btn-primary, .hero .btn-secondary",
	{ opacity: 0, y: 30 },
	{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.3, stagger: 0.1 }
);

// Hero image animation
gsap.fromTo(".hero .glass-card",
	{ opacity: 0, y: 100, rotationX: 15 },
	{ opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power2.out", delay: 1.6 }
);

// Floating animation for hero background elements
gsap.to(".floating-particles", {
	rotation: 360,
	duration: 100,
	ease: "none",
	repeat: -1
});

// Update ScrollTrigger
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// Modal functionality
function openBibtexModal() {
	const modal = document.getElementById('bibtexModal');
	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeBibtexModal() {
	const modal = document.getElementById('bibtexModal');
	modal.classList.remove('active');
	document.body.style.overflow = 'auto';
}

function copyBibtex() {
	const bibtexText = document.getElementById('bibtexText').textContent;
	const copyButton = document.querySelector('.copy-button');
	const copyIcon = document.querySelector('.copy-icon');
	const copyText = document.querySelector('.copy-text');

	// Copy to clipboard
	navigator.clipboard.writeText(bibtexText).then(() => {
		// Show success state
		copyButton.classList.add('copied');
		copyIcon.textContent = '✅';
		copyText.textContent = 'Copied!';

		// Reset after 2 seconds
		setTimeout(() => {
			copyButton.classList.remove('copied');
			copyIcon.textContent = '📋';
			copyText.textContent = 'Copy to Clipboard';
		}, 2000);
	}).catch(err => {
		console.error('Failed to copy text: ', err);
		// Fallback for older browsers
		const textArea = document.createElement('textarea');
		textArea.value = bibtexText;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);

		// Show success state
		copyButton.classList.add('copied');
		copyIcon.textContent = '✅';
		copyText.textContent = 'Copied!';

		setTimeout(() => {
			copyButton.classList.remove('copied');
			copyIcon.textContent = '📋';
			copyText.textContent = 'Copy to Clipboard';
		}, 2000);
	});
}

// Close modal when clicking outside
document.getElementById('bibtexModal').addEventListener('click', function(e) {
	if (e.target === this) {
		closeBibtexModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closeBibtexModal();
	}
}); 