(function() {
 	var Db = {

		init: function prepareDatabase(ready, error) {
			return openDatabase('documents', '1.0', 'Offline document storage', 50*1024*1024, function (db) {
				db.changeVersion('', '1.0', function (t) {
					t.executeSql('CREATE TABLE book (title, content)');
				}, error);
			});
		},

		get: function(key) {
			try {
				return JSON.parse(window.localStorage.getItem(key));
			}
			catch(error) {
				return null;
			}
		},

		set: function(key, value) {
			try {
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (e) {
				//if (e === 'QUOTA_EXCEEDED_ERR') {
				//}
				alert('存储失败！');
				throw e;
			}
		},
	}


	window.db = Db;
})();

(function() {
	var util = {
		/**
		 * 数字转中文
		 *
		 * @number {Integer} 形如123的数字
		 * @return {String} 返回转换成的形如 一百二十三 的字符串
		 * @ via http://flyash.itcao.com/post_984.html
		 */
		numberToChinese : function(number) {
			/*
			 * 单位
			 */
			var units = '个十百千万@#%亿^&~';
			/*
			 * 字符
			 */
			var chars = '零一二三四五六七八九';
			var a = (number + '').split(''), s = [];
			if (a.length > 12) {
				throw new Error('too big');
			} else {
				for ( var i = 0, j = a.length - 1; i <= j; i++) {
					if (j == 1 || j == 5 || j == 9) {// 两位数 处理特殊的 1*
						if (i == 0) {
							if (a[i] != '1')
								s.push(chars.charAt(a[i]));
						} else {
							s.push(chars.charAt(a[i]));
						}
					} else {
						s.push(chars.charAt(a[i]));
					}
					if (i != j) {
						s.push(units.charAt(j - i));
					}
				}
			}
			// return s;
			return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) {// 优先处理 零百 零千 等
				b = units.indexOf(d);
				if (b != -1) {
					if (d == '亿')
						return d;
					if (d == '万')
						return d;
					if (a[j - b] == '0')
						return '零'
				}
				return '';
			}).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
				return b;
			}).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function(m) {
				return {
					'@' : '十',
					'#' : '百',
					'%' : '千',
					'^' : '十',
					'&' : '百',
					'~' : '千'
				}[m];
			}).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
				c = units.indexOf(d);
				if (c != -1) {
					if (a[j - c] == '0')
						return d + '零' + b
				}
				return m;
			});
		}
	};

	window.util = util;
})();

(function() {
	window.ui = {};
})();

