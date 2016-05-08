Template.friendList.helpers({
	friends: function() {
		var friendId,
			count,
			friends=[],
			friends = Meteor.user().friends;

		//未读消息条数
		_.each(friends,function(friend){
			friendId = friend.id;
			count = Messages.find({formUserId: friendId}).count();
			friend.unreadCount = count;
		});

		return friends
	}
});