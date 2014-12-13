/**
 * rma表单
 */
Ext.define('WJM.rma.RmaForm', {
	extend : 'Ext.panel.Panel',
	requires : [ 'WJM.model.TSale' ],
	autoScroll : true,
	initComponent : function() {
		var me = this;
		var _fileds = [ {
			xtype : 'rownumberer'
		}, {
			text : "barcode #/条码", dataIndex : 'product_code', sortable : true
		}, {
			text : "item name/名称", dataIndex : 'product_name', sortable : true
		}, {
			text : "unit price/单价", dataIndex : 'product_price', sortable : true, xtype : 'numbercolumn', format : '$0.00'
		}, {
			text : "quantity/数量", dataIndex : 'product_num', sortable : true, xtype : 'numbercolumn', format : '0,000'
		}, {
			text : "sub total/小计", dataIndex : 'sub_total', sortable : true, xtype : 'numbercolumn', format : '$0.00'
		}, {
			text : "RMAed credit quantity/已退货无损数量", dataIndex : 'credit_num', sortable : true, xtype : 'numbercolumn', format : '0,000'
		}, {
			text : "RMAed damage quantity/已退货损坏数量", dataIndex : 'damage_num', sortable : true, xtype : 'numbercolumn', format : '0,000'
		}, {
			text : "credit quantity/无损数量", dataIndex : 'return_credit_num', sortable : true, xtype : 'numbercolumn', format : '0,000', editor : {
				xtype : 'numberfield', name : 'return_credit_num', allowDecimals : false, minValue : 0, allowBlank : false, value : 0
			}
		}, {
			text : "damage quantity/有损数量", dataIndex : 'return_damage_num', sortable : true, xtype : 'numbercolumn', format : '0,000', editor : {
				xtype : 'numberfield', name : 'return_damage_num', allowDecimals : false, minValue : 0, allowBlank : false, value : 0
			}
		} ];

		Ext.applyIf(me, {
			layout : {
				type : 'border'
			},
			defaults : {
				split : false
			},
			items : [
					{
						anchor : '100%', height : 70, xtype : 'form', region : 'north', autoScroll : true, title : '订单检索', bodyPadding : 10, layout : {
							columns : 3, type : 'table', tableAttrs : {
								style : {
									width : '100%'
								}, tdAttrs : {
									align : 'center', valign : 'middle'
								}
							}
						}, items : [ {
							xtype : 'textfield', fieldLabel : 'receive #/销售单号', labelWidth : 150, allowBlank : true, name : 'sale_bill_code'
						}, {
							xtype : 'textfield', fieldLabel : 'invoice #/invoice单号', labelWidth : 150, allowBlank : true, name : 'invoicecode'
						}, {
							xtype : 'textfield', fieldLabel : 'customer mobile/电话', labelWidth : 150, allowBlank : true, name : 'buyer_mobile'
						} ]
					},
					{
						xtype : 'form',
						title : '订单',
						region : 'center',
						layout : 'anchor',
						items : [
								{
									name : 'id', xtype : 'hiddenfield'
								},
								{
									xtype : 'container',
									anchor : '100%',
									defaults : {
										xtype : 'textfield', width : '90%', labelWidth : 120, readOnly : true, allowBlank : true
									},
									layout : {
										columns : 3, type : 'table', tableAttrs : {
											style : {
												width : '100%'
											}
										}, tdAttrs : {
											style : {
												width : '33.3%'
											}
										}
									},
									items : [
											{
												name : 'oper_name', fieldLabel : 'Worker ID/操作员', readOnly : true
											},
											{
												name : 'oper_time', fieldLabel : 'date/时间'
											},
											{
												name : 'sub_total', fieldLabel : 'sub total/合计', xtype : 'adnumberfield'
											},
											{
												name : 'tax', fieldLabel : 'Tax/税(8.375%)', xtype : 'adnumberfield'
											},
											{
												name : 'all_price', fieldLabel : 'Total/总计', xtype : 'adnumberfield'
											},
											{
												fieldLabel : 'name/客户名称', name : 'buyer_name'
											},
											{
												fieldLabel : 'address/客户地址', name : 'buyer_address'
											},
											{
												fieldLabel : 'State/州', name : 'buyer_state'
											},
											{
												fieldLabel : 'City/城市', name : 'buyer_city'
											},
											{
												fieldLabel : 'Zip Code/邮编', name : 'buyer_postCode'
											},
											{
												fieldLabel : 'Phone/电话', name : 'buyer_mobile'
											},
											{
												fieldLabel : 'Discount/优惠', name : 'discount', xtype : 'adnumberfield', minValue : 0, value : 0
											},
											{
												xtype : 'combobox', fieldLabel : 'Payment Method/支付方式', name : 'payment', displayField : 'name',
												valueField : 'value', store : 'SalePaymentMethodStore'
											},
											{
												xtype : 'combobox', fieldLabel : 'Delivery Method/送货方式', name : 'send_type', displayField : 'name',
												valueField : 'value', store : 'SaleSendMethodStore'
											}, {
												name : 'remark', fieldLabel : 'Remark/备注', allowBlank : true, xtype : 'textareafield', rows : 2, colspan : 3
											} ]
								},
								{
									store : 'SaleProductRmaStore', anchor : '100% -170', minHeight : 100, region : 'south', disableSelection : false,
									loadMask : true, xtype : 'gridpanel', columns : _fileds, plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
										clicksToEdit : 1
									}) ]
								} ]
					} ],

			dockedItems : [ {
				xtype : 'toolbar', dock : 'top', items : [ {
					xtype : 'button', iconCls : 'save', text : '保存', scope : this, handler : this.onSaveClick
				}, {
					xtype : 'button', iconCls : 'search', text : '搜索订单', scope : this, handler : this.onSearchClick
				} ]
			} ]
		});
		me.callParent(arguments);
	},
	/**
	 * 搜索
	 */
	onSearchClick : function() {
		var searchForm = this.down('form[title="订单检索"]').getForm();
		var data = searchForm.getFieldValues();
		var store = Ext.data.StoreManager.lookup('SaleRmaStore');
		var saleProductRmaStore = Ext.data.StoreManager.lookup('SaleProductRmaStore');
		saleProductRmaStore.removeAll();
		if (searchForm.isValid()) {
			Ext.Object.each(data, function(key, value) {
				store.getProxy().setExtraParam(key, value);
			});
			store.load({
				scope : this, callback : function(records, operation, success) {
					if (success && records.length >= 1) {
						this.down('form[title="订单"]').loadRecord(records[0]);
						var saleProductRmaStore = Ext.data.StoreManager.lookup('SaleProductRmaStore');
						saleProductRmaStore.getProxy().setExtraParam('sale_id', records[0].getId());
						saleProductRmaStore.load();
					} else {
						Ext.Msg.alert('提示', '未找到相关订单');
					}
				}
			});
		}
	},
	/**
	 * 保存
	 */
	onSaveClick : function() {
		var me = this;
		var store = Ext.data.StoreManager.lookup('SaleRmaStore');
		if (store.getCount() <= 0) {
			Ext.Msg.alert('提示', '请先查询订单');
		}
		var sale = store.getAt(0);
		if (sale.get('if_cashed') <= 0) {
			Ext.Msg.alert('提示', '已经付款的订单才能退货！');
		}
		var datas = this.down('gridpanel').getStore().data;
		var redod = [];
		var validate = false;
		datas.each(function(item) {
			if (item.get('product_num') - item.get('rma_num') - item.get('return_credit_num') - item.get('return_damage_num') < 0) {
				validate = true;
			}
			redod.push(item.getData());
		});
		if (validate) {
			Ext.Msg.alert('提示', '退货数量超过购买数量');
			return;
		}

		var form = this.down('form[title="订单"]');
		form.submit({
			url : 'sale.do?action=rma_submit', params : {
				saleProducts : Ext.JSON.encode(redod)
			},

			success : function(form, action) {
				Ext.Msg.alert('提示', '保存成功');
				me.clearForm();
				var result = action.result;
				window.open(location.context + '/sale.do?action=rma_print&id=' + result.saleId, "_blank");
				me.fireEvent('saveSuccess', me);
			},

			failure : function(form, action) {
				Ext.Msg.alert('提示', action.result.msg || '保存失败，请稍候重试');
			}
		});
	},
	/**
	 * 清空
	 */
	clearForm : function() {
		this.down('gridpanel').getStore().removeAll();
		var fields = this.down('form[title="订单"]').getForm().getFields();
		fields.each(function(item) {
			item.setValue('');
		});
		fields = this.down('form[title="订单检索"]').getForm().getFields();
		fields.each(function(item) {
			item.setValue('');
		});
	}
});