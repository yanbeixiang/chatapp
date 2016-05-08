Messages = new Mongo.Collection('messages');

Meteor.methods({
	messagesInsert: function(attribute) {
		var message = _.extend(attribute, {
			formUserId: this.userId,
			status: false,
			time: new Date()
		});
		
		Messages.insert(message);
	},
	messagesMarkread: function(attribute) {
		var friendId = attribute.friendId,
			hostId = this.userId;
		Messages.update({formUserId: friendId, status: false}, {$set: {status: true}}, {multi: true});
	}
});