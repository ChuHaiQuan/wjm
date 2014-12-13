Ext.define('WJM.model.TCustomer', {
	extend : 'Ext.data.Model', idProperty : 'id',

	fields : [ {
		name : 'id'
	}, {
		name : 'type'
	}, {
		name : 'code'
	}, {
		name : 'shortName'
	}, {
		name : 'allName'
	}, {
		name : 'address'
	}, {
		name : 'postCode'
	}, {
		name : 'tel1'
	}, {
		name : 'tel2'
	}, {
		name : 'tel3'
	}, {
		name : 'mobile'
	}, {
		name : 'FAX'
	}, {
		name : 'EMail'
	}, {
		name : 'http'
	}, {
		name : 'accounts'
	}, {
		name : 'taxCode'
	}, {
		name : 'linkMan'
	}, {
		name : 'companyType'
	}, {
		name : 'helpName'
	}, {
		name : 'recDate'
	}, {
		name : 'myMemo'
	}, {
		name : 'state'
	}, {
		name : 'city'
	}, {
		name : 'leav_money'
	}, {
		name : 'credit_Line'
	}, {
		name : 'balance'
	}, {
		name : 'bank_Name'
	}, {
		name : 'bank_Acount'
	}, {
		name : 'credit_Acount'
	}, {
		name : 'passwd'
	}, {
		name : 'total'
	}, {
		name : 'acc_balance', convert : function(v, record) {
			return record.data.leav_money - record.data.balance;
		}
	}, {
		name : 'show_leav_money', convert : function(v, record) {
			return -record.data.leav_money;
		}
	} ],

	validations : [ {
		type : 'length', field : 'shortName', min : 1
	} ]
});

Ext.define('WJM.model.CustomerBaseStore', {
	extend : 'Ext.data.Store',
	autoLoad : false,
	autoSync : true,
	model : 'WJM.model.TCustomer',
	pageSize : 25,
	storeId : 'CustomerStore',
	proxy : {
		batchActions : true,
		type : 'ajax',
		pageParam : 'currpage',
		limitParam : 'pagesize',
		api : {
			create : location.context + '/buyer.do?action=save', read : location.context + '/buyer.do?action=list',
			update : location.context + '/buyer.do?action=update', destroy : location.context + '/buyer.do?action=del'
		},

		writer : Ext.create('WJM.FormWriter'),

		reader : {
			root : 'listData', totalProperty : 'total', messageProperty : 'msg'
		},

		actionMethods : {
			create : "POST", read : "POST", update : "POST", destroy : "POST"
		},

		listeners : {
			exception : function(proxy, response, operation) {
				switch (operation.action) {
				case "create":
				case "update":
					Ext.MessageBox.alert('提示', '保存失败，请稍后重试');
					break;
				case "destroy":
					Ext.MessageBox.alert('提示', '删除失败，请稍后重试');
					break;
				default:
					break;
				}
			}
		}
	}
});

Ext.create('WJM.model.CustomerBaseStore', {
	storeId : 'CustomerSearchStore'
});

Ext.create('WJM.model.CustomerBaseStore', {
	storeId : 'CustomerQuickStore', proxy : {
		batchActions : true, type : 'ajax', pageParam : 'currpage', limitParam : 'pagesize', api : {
			create : '', read : location.context + '/buyer.do?action=quicklist', update : '', destroy : ''
		},

		writer : Ext.create('WJM.FormWriter'),

		reader : {
			root : 'listData', totalProperty : 'total', messageProperty : 'msg'
		},

		actionMethods : {
			create : "POST", read : "POST", update : "POST", destroy : "POST"
		},

		listeners : {
			exception : function(proxy, response, operation) {
				switch (operation.action) {
				case "create":
				case "update":
					Ext.MessageBox.alert('提示', '保存失败，请稍后重试');
					break;
				case "destroy":
					Ext.MessageBox.alert('提示', '删除失败，请稍后重试');
					break;
				default:
					break;
				}
			}
		}
	}
});
