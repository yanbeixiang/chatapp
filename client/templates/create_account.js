Template.createAccount.events({
	'submit form': function(e,target) {
		e.preventDefault();

		var username = $(e.target).find('[name=username]'),
			password = $(e.target).find('[name=password]');

		if (!username.val()) {
			throwError('请输入账号');
			username.focus();
			return false;
		} else if (!password.val()) {
			throwError('请输入密码');
			password.focus();
			return false;
		}
		var	account = {
			username: username.val(),
			password: password.val()
		};

		Accounts.createUser(account, function(error) {
			if(error){
				var errMessage = error.reason;
				if (error.reason === 'Username already exists.') {
					errMessage = '用户名已存在~';
				}
				return throwError(errMessage);
			}

			//为用户增加friends字段
			Meteor.call('userInitFriends');
		});
	}
});