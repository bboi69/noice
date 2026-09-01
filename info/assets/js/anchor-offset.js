(function() {
	var extraSpace = 48;

	function fixedOffset() {
		var header = document.getElementById('header');
		var navButton = document.getElementById('navButton');

		if (header && window.getComputedStyle(header).display !== 'none')
			return header.offsetHeight + extraSpace;

		if (navButton && window.getComputedStyle(navButton).display !== 'none')
			return navButton.offsetHeight + extraSpace;

		return extraSpace;
	}

	function findTarget(hash) {
		if (!hash || hash === '#')
			return null;

		try {
			return document.getElementById(decodeURIComponent(hash.slice(1)));
		} catch (error) {
			return null;
		}
	}

	function scrollToTarget(hash, behavior) {
		var target = findTarget(hash);

		if (!target)
			return;

		var top = target.getBoundingClientRect().top + window.pageYOffset - fixedOffset();
		window.scrollTo({
			top: Math.max(0, top),
			behavior: behavior || 'auto'
		});
	}

	window.addEventListener('load', function() {
		if (!window.location.hash)
			return;

		window.setTimeout(function() {
			scrollToTarget(window.location.hash, 'auto');
		}, 50);

		window.setTimeout(function() {
			scrollToTarget(window.location.hash, 'auto');
		}, 250);
	});

	window.addEventListener('hashchange', function() {
		scrollToTarget(window.location.hash, 'auto');
	});

	document.addEventListener('click', function(event) {
		var link = event.target.closest('a[href*="#"]');

		if (!link)
			return;

		var targetUrl = new URL(link.href, window.location.href);

		if (targetUrl.pathname !== window.location.pathname || !targetUrl.hash)
			return;

		event.preventDefault();
		window.history.pushState(null, '', targetUrl.hash);
		scrollToTarget(targetUrl.hash, 'smooth');
	});
})();
