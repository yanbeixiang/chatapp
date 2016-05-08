Template.friendAdd.helpers({
	users: function() {
		var username = this.username,
			allusers = this.users,
			friends = Meteor.user().friends,
			currentUserId = Meteor.userId(),
			friendIds = [currentUserId],
			users = [];

		//过滤用户（已存在的好友、自己）
		if(allusers.count() > 0){
			_.each(friends,function(friend) {
				friendIds[friendIds.length] = friend.id;
			});

			allusers.forEach(function(user) {
				if($.inArray(user._id,friendIds) === -1 ){
					users[users.length] = user;
				}
			});
		}

		return users;
	}
});

Template.friendAdd.events({
	'submit form': function(e){
		e.preventDefault();
		var username = $(e.target).find('[name=username]').val();
		var url = Router.routes.userSearch.path({username: username});
		Router.go(url);
	},
	'click .addfriend': function(e){
		e.preventDefault();

		var friend={
			friendId: this._id,
			friendUsername: this.username
		};

		Meteor.call('friendsInsert', friend, function(error, result){
			if (error) {
				throwError(error.reason);
			}
		});
	}
});