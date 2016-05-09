messagesHandle = null;

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
	  	return [Meteor.subscribe('users')];
	}
});

Router.route('/login', {
	name: 'login'
});

Router.route('/regist', {
	name: 'createAccount'
});

Router.route('/', {
	name: 'friendList',
	waitOn: function() {
		return Meteor.subscribe('messageToMe');
	},
});

Router.route('/usercenter', {
	name: 'userCenter',
	data: function() {
		return Meteor.user();
	}
});

Router.route('/add', {
	name: 'friendAdd',
	data: function() {
		return {users: Meteor.users.find()};
	}
});

Router.route('/add/:username', {
	name: 'userSearch',
	template: 'friendAdd',
	data: function() {
		var filterUsers = Meteor.users.find({username: this.params.username});
		return {users: filterUsers, username: this.params.username};
	}
});

Router.route('/chat/:id', {
	name: 'chat',
	waitOn: function() {
		return Meteor.subscribe('messages',this.params.id);
	},
	data: function() {
		return { 
			messages: Messages.find({},{sort: {time: 1}}),
			friend: Meteor.users.findOne(this.params.id)
		};
	}
});

Router.onBeforeAction(isLogin, {only:['login','createAccount']});
Router.onBeforeAction(requireLogin, {except:['login','createAccount']});
Router.onBeforeAction(removeCustomObserve, {except: 'chat'});

function isLogin() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.next();
		}
	} else {
		Router.go('friendList');
	}
}
function requireLogin() {
	if(!Meteor.user()){
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			Router.go('login');
		}
	} else {
		this.next();
	}
}

function removeCustomObserve() {
	if (messagesHandle) {
		messagesHandle.stop();
		messagesHandle = null;
	}
	this.next();
}
