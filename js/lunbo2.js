window.onload = function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var timer;

            function animate(offset) {
                //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                var newLeft = parseInt(list.style.left) + offset;//用parseInt()取整转化为数字。
                list.style.left = newLeft + 'px';
                //无限滚动判断
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
            }
			//重复执行的定时器
            function play() {
                
                timer = setInterval(function () {
                    next.onclick();
                }, 1200)
            }
			//清除定时器
            function stop() {
                clearInterval(timer);
            }

            function buttonsShow() {
                //将之前的小圆点的样式清除
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].className == "on") {
                        buttons[i].className = "";
                    }
                }
                
                buttons[index - 1].className = "on";
            }

            prev.onclick = function () {//上一张
                index -= 1;
                if (index < 1) {
                    index = 5
                }
                buttonsShow();
                animate(600);
            };

            next.onclick = function () {//下一张
       
                index += 1;
                if (index > 5) {
                    index = 1
                }
                animate(-600);
                buttonsShow();
            };

            for (var i = 0; i < buttons.length; i++) {
                (function (i) {
                    buttons[i].onclick = function () {
                        var clickIndex = parseInt(this.getAttribute('index'));
                        var offset = 600 * (index - clickIndex); //这个index是当前图片停留时的index
                        animate(offset);
                        index = clickIndex; 
                        buttonsShow();
                    }
                })(i)
            }

            container.onmouseover = stop;
            container.onmouseout = play;
            play();

        }