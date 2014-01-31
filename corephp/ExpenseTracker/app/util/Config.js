Ext.define('ExpenseTracker.util.Config', {
    singleton : true,

    config : {
        debug : true,
		costSymbol : 'Rs.',
		expenseDate : ''
    },

    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },

	getDateTotalAmount : function(date){
		if (true || typeof date == "string"){
			console.log(date);
			var total = 0;
			Ext.getStore('Expenses').filter('date',date);
			/*Ext.getStore('Expenses').each(function(record){
				total = record.get('price');
			});*/
			//Ext.getStore('Expenses').clearFilter();
			return total;
		}else{
			return '0';
		}
	},
	
	getTotalExpenseCategoryPrice : function(cat_id){
		var total = 0;
		if(cat_id != ''){
			Ext.getStore('Expenses').filter('categoryid',cat_id);
		}
		Ext.getStore('Expenses').each(function(record){
			total += record.get('price');
		});
		Ext.getStore('Expenses').clearFilter();
		return total;

	},

	getBalanceExpenseCategoryPrice : function(cat_id, cat_price){
		return cat_price - this.getTotalExpenseCategoryPrice(cat_id);
	},

	getTotalCategoryPrice : function(){
		var total = 0;
		Ext.getStore('Categories').each(function(record){
			total += record.get('price');
		});
		return total;

	},

	getTotalExpenseByDate : function(frDate, toDate){

		Ext.getStore('Expenses').filterBy(function(item){
			var itemdate = item.get('date');
			itemdate = Ext.Date.format(itemdate, 'Y-m-d');
			//console.log(itemdate);
			if(itemdate >= frDate && itemdate <= toDate){
				return true;
			}
		});

		var total = 0;
		Ext.getStore('Expenses').each(function(record){
			total += record.get('price');
		});
		Ext.getStore('Expenses').clearFilter();
		return total;

	},

	getBalanceExpenseByDate : function(frDate, toDate, totalprice){

		Ext.getStore('Expenses').filterBy(function(item){
			var itemdate = item.get('date');
			itemdate = Ext.Date.format(itemdate, 'Y-m-d');
			//console.log(itemdate);
			if(itemdate >= frDate && itemdate <= toDate){
				return true;
			}
		});

		var total = 0;
		Ext.getStore('Expenses').each(function(record){
			total += record.get('price');
		});
		Ext.getStore('Expenses').clearFilter();
		return totalprice - total;

	}
})