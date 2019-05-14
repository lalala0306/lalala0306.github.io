var darwingLineObj = {
	cavs:$('.cavs'),
	context:$('.cavs').get(0).getContext('2d'),
	colorBoard:$('#colorBoard'),
	clearBoard:$('#clearBoard'),
	eraser:$('#eraser'),
	rescind:$('#rescind'),
	lineRuler:$('#lineRuler'),
	bool:false,
	flag:false,
	arrImg:[],
	r:20,
	init:function(){
		this.context.lineCap = 'round';//线条起始和结尾样式
		this.context.lineJoin = 'round';//线条转弯时的样式
		this.draw();
		this.btnFn();
	},
	draw:function(){
		var cavs = this.cavs,
				self = this;
		var c_x = cavs.offset().left,
				c_y = cavs.offset().top;
				cavs.mousedown(function(e){
					e = e || window.event;
					self.bool = true;
						var m_x = e.pageX-c_x,
							m_y = e.pageY-c_y;
						self.context.beginPath();
						self.context.moveTo(m_x,m_y);//鼠标在画布上的触点
						cavs.mousemove(function(e){
							if (self.bool && !self.flag) {
								// console.log(self.flag+"aaa"+self.bool)
								self.context.lineTo(e.pageX-c_x,e.pageY-c_y);
								self.context.stroke();
							}
						})
						cavs.mouseup(function(){
								self.context.closePath();
								self.bool = false;
								// self.flag = false;
						})
						cavs.mouseleave(function(){
								self.context.closePath();
								self.bool = false;
								// self.flag = false;
						})
						var imgData = self.context.getImageData(0,0,self.cavs[0].width,self.cavs[0].height)
						self.arrImg.push(imgData)
				})
	},
	btnFn:function(){
		var self = this;
			$('.btn-list').on('click',function(e){
					e = e || window.event;
					// console.log(e.target.id);
					switch(e.target.id){
						case 'clearBoard':
						self.context.clearRect(0,0,self.cavs[0].width,self.cavs[0].height)
						break
						case 'eraser':
						self.flag=!self.flag
						var c_x = self.cavs.offset().left,
							c_y = self.cavs.offset().top;
							
						self.cavs.mousemove(function(e){
							if (self.flag && self.bool) {
								// console.log(self.flag+"ddd"+self.bool)
								var r = self.r
								self.context.save()
								self.context.beginPath()
								self.context.arc(e.pageX-c_x,e.pageY-c_y,r/2,0,Math.PI*2)
								self.context.clip()
								self.context.clearRect(e.pageX-c_x-r/2,e.pageY-c_y-r/2,r,r)
								self.context.restore()
							}
						})
						break
						case 'rescind':
						if (self.arrImg.length>0) {
							self.context.putImageData(self.arrImg.pop(),0,0);
						}
						break
					}

			})
			this.colorBoard.change(function(e){//当颜色变化时  改变画笔颜色
				self.context.strokeStyle = $(this).val();
			})

			this.lineRuler.change(function(e){//线条变化值
				self.context.lineWidth = $(this).val();
				if ($(this).val()>20) {
					self.r = $(this).val();
				}
			})
	},
}
darwingLineObj.init()