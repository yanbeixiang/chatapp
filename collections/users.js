Meteor.methods({
	userInitFriends: function(){
		Meteor.users.update(this.userId, {$set: {friends: []}});
	},
	friendsInsert: function(attributes) {
		var friendId = attributes.friendId,
			friendUsername = attributes.friendUsername,
			hostid = this.userId,
			username = Meteor.user().username;

		Meteor.users.update(hostid, {$addToSet: {friends: {id: friendId, username: friendUsername}}});
		Meteor.users.update(friendId, {$addToSet: {friends: {id: hostid, username: username}}});
	}
});