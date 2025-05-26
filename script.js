// Add js-loaded class for animation fallbacks
document.documentElement.classList.add('js-loaded');

// Initialize Locomotive Scroll
let scroll;
const scrollContainer = document.querySelector('[data-scroll-container]');

if (scrollContainer) {
	scroll = new LocomotiveScroll({
		el: scrollContainer,
		smooth: true,
		smoothMobile: false,
		multiplier: 1,
		class: 'is-reveal',
		smartphone: {
			smooth: false
		},
		tablet: {
			smooth: false
		}
	});
}

// Register ScrollTrigger with Locomotive Scroll
if (scroll && typeof gsap !== 'undefined') {
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
		pinType: scrollContainer.style.transform ? "transform" : "fixed"
	});
}

// GSAP Animations
if (typeof gsap !== 'undefined') {
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

// Floating animation for hero background elements - reduced for better performance
gsap.to(".floating-particles", {
	rotation: 360,
	duration: 60,
	ease: "none",
	repeat: -1
});

// Update ScrollTrigger
	if (scroll) {
		ScrollTrigger.addEventListener("refresh", () => scroll.update());
		ScrollTrigger.refresh();
	}
}

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
		closeLightbox();
	}
});

// Image Lightbox functionality
let currentZoom = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

// Initialize image click handlers after DOM is loaded
function initializeImageHandlers() {
	// Add click handlers to all images
	const images = document.querySelectorAll('.glass-card img, .method-diagram img');
	images.forEach(img => {
		img.addEventListener('click', function(e) {
			e.preventDefault();
			openLightbox(this.src, this.alt);
		});
	});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeImageHandlers);
} else {
	initializeImageHandlers();
}

function openLightbox(imageSrc, imageAlt) {
	const lightbox = document.getElementById('imageLightbox');
	const lightboxImage = document.getElementById('lightboxImage');
	
	lightboxImage.src = imageSrc;
	lightboxImage.alt = imageAlt;
	lightbox.classList.add('active');
	document.body.style.overflow = 'hidden';
	
	// Reset zoom
	currentZoom = 1;
	lightboxImage.style.transform = 'scale(1)';
	lightboxImage.classList.remove('zoomed');
	
	// Center the image
	const container = document.querySelector('.lightbox-image-container');
	container.scrollLeft = 0;
	container.scrollTop = 0;
}

function closeLightbox() {
	const lightbox = document.getElementById('imageLightbox');
	lightbox.classList.remove('active');
	document.body.style.overflow = 'auto';
	
	// Reset zoom
	currentZoom = 1;
	const lightboxImage = document.getElementById('lightboxImage');
	lightboxImage.style.transform = 'scale(1)';
	lightboxImage.classList.remove('zoomed');
}

function zoomIn() {
	currentZoom = Math.min(currentZoom * 1.5, 5); // Max zoom 5x
	updateZoom();
}

function zoomOut() {
	currentZoom = Math.max(currentZoom / 1.5, 0.5); // Min zoom 0.5x
	updateZoom();
}

function resetZoom() {
	currentZoom = 1;
	updateZoom();
	
	// Center the image
	const container = document.querySelector('.lightbox-image-container');
	container.scrollLeft = 0;
	container.scrollTop = 0;
}

function updateZoom() {
	const lightboxImage = document.getElementById('lightboxImage');
	lightboxImage.style.transform = `scale(${currentZoom})`;
	
	if (currentZoom > 1) {
		lightboxImage.classList.add('zoomed');
	} else {
		lightboxImage.classList.remove('zoomed');
	}
}

// Initialize lightbox event handlers
function initializeLightboxHandlers() {
	// Pan functionality
	const container = document.querySelector('.lightbox-image-container');
	if (container) {
		container.addEventListener('mousedown', function(e) {
			if (currentZoom > 1) {
				isDragging = true;
				startX = e.pageX - container.offsetLeft;
				startY = e.pageY - container.offsetTop;
				scrollLeft = container.scrollLeft;
				scrollTop = container.scrollTop;
				container.style.cursor = 'grabbing';
			}
		});

		container.addEventListener('mouseleave', function() {
			isDragging = false;
			container.style.cursor = 'grab';
		});

		container.addEventListener('mouseup', function() {
			isDragging = false;
			container.style.cursor = currentZoom > 1 ? 'grab' : 'default';
		});

		container.addEventListener('mousemove', function(e) {
			if (!isDragging || currentZoom <= 1) return;
			e.preventDefault();
			const x = e.pageX - container.offsetLeft;
			const y = e.pageY - container.offsetTop;
			const walkX = (x - startX) * 2;
			const walkY = (y - startY) * 2;
			container.scrollLeft = scrollLeft - walkX;
			container.scrollTop = scrollTop - walkY;
		});

		// Wheel zoom functionality
		container.addEventListener('wheel', function(e) {
			e.preventDefault();
			
			if (e.deltaY < 0) {
				zoomIn();
			} else {
				zoomOut();
			}
		});
	}

	// Close lightbox when clicking outside the image
	const lightbox = document.getElementById('imageLightbox');
	if (lightbox) {
		lightbox.addEventListener('click', function(e) {
			if (e.target === this) {
				closeLightbox();
			}
		});
	}
}

// Initialize lightbox handlers when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeLightboxHandlers);
} else {
	initializeLightboxHandlers();
} 