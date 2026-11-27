const laptopViewport = window.matchMedia("(min-width: 901px) and (max-height: 800px)");
const page = document.body;

function fitLayout() {
	page.classList.toggle("fit-layout", laptopViewport.matches);
	if (!laptopViewport.matches) return;

	// Offset dimensions exclude CSS zoom. Allow two pixels for rounding.
	const scale = Math.min(
		1,
		window.innerWidth / (page.offsetWidth + 2),
		window.innerHeight / (page.offsetHeight + 2),
	);
	page.style.setProperty("--layout-scale", scale);
}

window.addEventListener("resize", fitLayout);
new ResizeObserver(() => requestAnimationFrame(fitLayout)).observe(page);
fitLayout();
