Template.chat.helpers({
	ownClass: function() {
		var  formUserId = arguments[0];
		return formUserId === Meteor.userId() ? 'own' : '';
	}
});

Template.chat.onRendered(function(){

	var messages = this.data.messages,
		friendId = this.data.friend._id,
		messageCount = messages.count();

	//messages改变时调用pageInit
	messagesHandle = messages.observe({
		added: pageInit(friendId,messageCount)
	});
});

Template.chat.events({
	'submit form': function(e) {
		e.preventDefault();

		var message = $(e.target).find('[name=message]');
		if (!message.val()) {
			message.focus()
			return false;
		}
		var messages = this.messages,
			friendId = this.friend._id,
			chatlog = {
			message: message.val(),
			toUserId: friendId
		};
		Meteor.call('messagesInsert', chatlog, function(error) {
			if (error) {
				throwError(error.reason);
			}
			message.val('').focus();
		});
	}
});

//页面滚动+设置消息状态为已读
function pageInit(friendId,messageCount) {
	var count = 0,
		isfirst = true;

	return function(message) {
		if (isfirst) {
			count++;

			if(messageCount != 0 && messageCount !== count){
				return false;
			}else{
				isfirst = false;
			}
		}

		var messageContainer = $('.message-show');
		if (messageContainer.length >0 ){
			var scrollTop=messageContainer[0].scrollHeight - messageContainer.height();
			messageContainer.scrollTop(scrollTop);
		}
		
		Meteor.call('messagesMarkread', {friendId: friendId});
	}
}
