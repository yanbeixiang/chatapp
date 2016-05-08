Template.userCenter.events({
	'click .logout': function() {
		Meteor.logout(function() {
			Router.go('login');
		});
	}
});