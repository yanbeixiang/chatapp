Template.login.events({
	'submit form': function(e,target) {
		e.preventDefault();

		var username = $(e.target).find('[name=username]'),
			password = $(e.target).find('[name=password]'),
			usernameVal=username.val(),
			passwordVal=password.val();

		if (!username.val()) {
			throwError('请输入账号');
			username.focus();
			return false;
		} else if (!password.val()) {
			throwError('请输入密码');
			password.focus();
			return false;
		}
		
		Meteor.loginWithPassword(usernameVal, passwordVal, function(error){
			if(error){
				var errMessage;
				switch(error.reason){
					case 'User not found':
						errMessage = '用户不存在';
						break;
					case 'Incorrect password':
						errMessage = '密码错误';
						break;
					default:
						error.reason;
				}
				throwError(errMessage);
			}
		});
	}
});