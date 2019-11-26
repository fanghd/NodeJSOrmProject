const PageController = {};

PageController.index = async (ctx) => {
	await ctx.redirect('/index.html');
};

module.exports = PageController;