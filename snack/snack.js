window.onload=function() {
	class_game._init();
}

document.onkeydown=function(event){
		var _left=37,_up=38,_right=39,_down=40;//键位值
		var event = event || window.event;
		var _key_value = event.which || event.keyCode;

		switch(_key_value){
				case _left:
					if(class_game._direction != "right"){
						class_game._direction = "left";
					}
					break;
				case _up:
					if(class_game._direction != "down"){
						class_game._direction = "up";
					}
					break;
				case _right:
					if(class_game._direction != "left"){
						class_game._direction = "right";
					}
					break;
				case _down:
					if(class_game._direction != "up"){
						class_game._direction = "down";
					}
					break;
			}
		}

var class_game = {
	_column:15,//列
	_row:15,//行
	_cube_height:40,
	_cube_width:40,
	_snack:[],
	_direction:null,//初始方向
	_food:0,
	_wall:[],
	_timeout:true,

	_init:function(){
		class_game._onload();
	//	alert(this._wall);
	//	alert(this._wall[1]);
		class_game._move();
	},


	_onload:function(){
		for(var _x=0;_x<this._column;_x++){
			for(var _y=0;_y<this._row;_y++){
				var _div=class_base._create('div');
				_div.setAttribute("class","cube");
				_div.setAttribute("style","height:"+this._cube_height+"px;width:"+this._cube_width+"px;top:"+(_y*this._cube_height)+"px;left:"+(_x*this._cube_width)+"px");
				var ten = class_base._ten(_x,_y,this._column);
				_div.setAttribute("id",ten);
	//			_div.innerHTML=ten+"<br/>"+"["+_x+","+_y+"]";

				if(_x==0 || _x==this._column-1 || _y==0 || _y==this._row-1){
					this._wall.push(ten);
				}

				class_base._get('game_panel').appendChild(_div);
			}
		}

		
		

		var snack_x = Math.floor(1+Math.random()*(this._column-2));
		var snack_y = Math.floor(1+Math.random()*(this._row-2));
		var tensnack = class_base._ten(snack_x,snack_y,this._column);
		this._snack.push(tensnack);
		//给蛇上色

		class_base._toDrawSnack(this._snack);
		
		//给蛇头上色

		class_base._get(this._snack[0]).setAttribute("class","snack_left");

		var foodten = this._food_into();
		var food = class_base._get(foodten);
		food.setAttribute("class","food");



		for(var i=0;i<this._wall.length;i++){
			var cube = class_base._get(this._wall[i]);
			cube.setAttribute("class","wall");
		}
	},

	_food_into:function(){
		var _food_location = [];
		//每次在填充食物之前把原数组补全
		for(var i=1;i<this._column-1;i++){
			for(var j=1;j<this._row-1;j++){
				var mapp = class_base._ten(i,j,this._column);
				_food_location.push(mapp);
			}
		}
//		alert(_food_location);
		var leng=0;
		//再把自己的身体排除在原数组之外
		for(var i=0;i<this._snack.length;i++){
			leng = class_base._removeByValue(_food_location,this._snack[i]);
		}
		//食物的位置确定！
		var fodLo = _food_location[Math.floor(Math.random()*leng)];
		this._food = fodLo;
		return fodLo;
	},
//

	_move:function(){
		var _start_position = this._snack[0];

		
		switch(this._direction){
			case "left":
				_start_position = this._snack[0]-1;
				break;
			case "up":
				_start_position = this._snack[0]-this._column;
				break;
			case "right":
				_start_position = this._snack[0]+1;
				break;
			case "down":
				_start_position = this._snack[0]+this._column;
				break;
		}
		//撞身体判断
		if(this._snack.length>1){
			for(var i=0;i<this._snack.length;i++){
				if(this._snack[i]==_start_position){
					this._timeout = false;
					alert("游戏结束！");
					return;
				}
			}
		}

		//撞墙判断
		for(var i=0;i<this._wall.length;i++){
			if(_start_position==this._wall[i]){
				this._timeout = false;
				alert("游戏结束！")
				return;
			}
		}
		
			if(this._direction!=null){
				this._snack.unshift(_start_position);//向数组的开头添加元素
				//食物判断
				if(_start_position == this._food){
					var newFood = this._food_into();
					var cube = class_base._get(newFood);
					cube.setAttribute("class","food");
				}else{
					var _end_position = this._snack.pop();
					class_base._get(_end_position).setAttribute("class","cube");
					}

				class_base._toDrawSnack(this._snack);

				switch(this._direction){		
				case "left":
					class_base._get(this._snack[0]).setAttribute("class","snack_left");
					break;
				case "up":
					class_base._get(this._snack[0]).setAttribute("class","snack_up");
					break;
				case "right":
					class_base._get(this._snack[0]).setAttribute("class","snack_right");
					break;
				case "down":
					class_base._get(this._snack[0]).setAttribute("class","snack_down");
					break;
				}

			}
//				alert(this._snack)
//			alert(this._timeout)
			if(this._timeout){
				setTimeout(function(){class_game._move()},150);
			}
		}	
		//定时器


}

var class_base = {
	_get:function(id){
		return document.getElementById(id);
	},
	_create:function(element){
		return document.createElement(element);
	},
	_ten:function(x,y,column){
		return y*column+x;
	},
	_two:function(m,column){

	},

	_toDrawSnack:function(arr){
		if(arr.length==1){
			document.getElementById(arr[0]).setAttribute("class","snack_left");
		}
		for(var i=0;i<arr.length;i++){
			var div = document.getElementById(arr[i]);
			div.setAttribute("class","snack");
		}
	},

	_removeByValue:function(arr,val){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==val){
				arr.splice(i,1);
			}
		}
		return arr.length;
	},

	_frontPD:function(start_){

	}


}