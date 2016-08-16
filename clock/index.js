/**
 * Created by Administrator on 2016-08-11.
 */
(function(){
    var clock = document.querySelector('#clock');
    var btn = document.querySelector('#btn'),timer;

    function getSeconds(){
        var beforeSecond = (new Date()).getSeconds();
        var second = parseInt(beforeSecond) +1;
        beforeSecond = beforeSecond==0 ? 60 : beforeSecond;
        second = second >= 10 ? second : "0"+second;
        beforeSecond = beforeSecond >=10 ? beforeSecond : "0"+beforeSecond;
        return [second,beforeSecond];

    }

    function changeSecond(nextValue) {
        var active = clock.querySelector('.clock-active'),
            activeText = active.querySelectorAll('.flip-text'),
            before = clock.querySelector('.clock-before'),
            beforeText = before.querySelectorAll('.flip-text'),
            seconds = getSeconds();
        before.className = before.className.replace('before','active');
        beforeText.forEach(function(item){
            item.innerHTML = seconds[0];
        });
        active.className = active.className.replace('active','before');
        activeText.forEach(function(item){
            item.innerHTML = seconds[1];
        });
        clock.classList.add('play');
    }

    timer = setInterval(function(){
        changeSecond();
    },1000);

    btn.addEventListener('click',function(){
        timer&&clearInterval(timer);
    })

})();