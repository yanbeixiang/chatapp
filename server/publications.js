Meteor.publish('users', function () {
   return Meteor.users.find();
}); 

Meteor.publish("messages", function (friendId) {
  	return Messages.find({
  		$or: [{formUserId: this.userId, toUserId: friendId}, {formUserId: friendId, toUserId: this.userId}]},
  		{sort: {time: 1}
  	});
});

Meteor.publish("allmessages", function () {
  	return Messages.find({toUserId: this.userId, status: false});
});