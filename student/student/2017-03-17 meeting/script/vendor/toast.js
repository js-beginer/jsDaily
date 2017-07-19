var toastComponent = {
	template: '<div v-show="toastshow" transition="toast" class="toast font-normal">' +
		'{{toasttext}}' +
		'</div>',
	props: {
		//是否显示提示
		toastshow: {
			type: Boolean,
			required: false,
			default: function() {
				return false;
			}
		},
		//提示的内容
		toasttext: {
			type: String,
			required: false,
			default: function() {
				return 'no message';
			}
		},
		//显示的时间
		duration: {
			type: Number,
			default: 3000, //默认3秒
			required: false
		}
	},
	ready() {

	},
	watch: {
		toastshow(val) {
			if(this._timeout) clearTimeout(this._timeout)
			if(val && !!this.duration) {
				this._timeout = setTimeout(() => this.toastshow = false, this.duration)
			}
		}
	}
}