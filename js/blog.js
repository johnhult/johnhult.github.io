function runBlog() {
	$.get('partials/blog.html', function(data) {
		$('.content-holder').html(data);
	});
	updateLinks();
}