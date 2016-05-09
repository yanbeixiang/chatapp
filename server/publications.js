Meteor.publish('users', function () {
  return Meteor.users.find();
}); 

Meteor.publish("messages", function (friendId) {
	check(friendId, String);

  	return Messages.find({
  		$or: [{formUserId: this.userId, toUserId: friendId}, {formUserId: friendId, toUserId: this.userId}]},
  		{sort: {time: 1}
  	});
});

Meteor.publish("messageToMe", function () {
	return Messages.find({toUserId: this.userId, status: false});
});