Meteor.methods({
	userInitFriends: function(){
		check(this.userId, String);

		Meteor.users.update(this.userId, {$set: {friends: []}});
	},
	friendsInsert: function(attributes) {
		check(this.userId, String);
		check(attributes, {
			friendId: String,
			friendUsername: String
		});
		
		var friendId = attributes.friendId,
			friendUsername = attributes.friendUsername,
			hostid = this.userId,
			username = Meteor.user().username;

		Meteor.users.update(hostid, {$addToSet: {friends: {id: friendId, username: friendUsername}}});
		Meteor.users.update(friendId, {$addToSet: {friends: {id: hostid, username: username}}});
	}
});