Messages = new Mongo.Collection('messages');

Meteor.methods({
	messagesInsert: function(attributes) {
		check(this.userId, String);
		check(attributes, {
			message: String,
			toUserId: String
		});

		var message = _.extend(attributes, {
			formUserId: this.userId,
			status: false,
			time: new Date()
		});
		
		Messages.insert(message);
	},
	messagesMarkread: function(attributes) {
		check(this.userId, String);
		check(attributes, {
			friendId: String
		});

		var friendId = attributes.friendId,
			hostId = this.userId;
		Messages.update({formUserId: friendId,toUserId: hostId, status: false}, {$set: {status: true}}, {multi: true});
	}
});