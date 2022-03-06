function start() {
    //gamezone
    var canvas = document.querySelector('#gamezone');
    var context = canvas.getContext('2d');
    var scoreshow = document.querySelector('.score');   

    var birdimg = new Image();
    birdimg.src = "bird.png";
    var background  = new Image();
    background.src = "nenchinh.png";
    var upper_tupe = new Image();
    upper_tupe.src = "ongtren.png";
    var lower_tupe = new Image();
    lower_tupe.src = "ongduoi.png";

    var score= 0 ;
    var distance_of_2_tube=140;
    var distance_top__top_bottom;

    var bird = {
        x : background.width/5,
        y : background.height/2
    }

    var ong=[];
    ong[0] = {
        x : canvas.width,
        y : 0
    }

    function run(){
        context.drawImage(background, 0 ,0);
        context.drawImage(birdimg, bird.x ,bird.y);
        for (var i=0;i<ong.length;i++) {
            distance_top__top_bottom = upper_tupe.height + distance_of_2_tube;
            context.drawImage(upper_tupe, ong[i].x,ong[i].y);
            context.drawImage(lower_tupe, ong[i].x,ong[i].y+distance_top__top_bottom);
            ong[i].x-=5;

            if (ong[i].x == canvas.width/2) {
                ong.push({
                    x : canvas.width,
                    y : (Math.floor(Math.random()*upper_tupe.height) - upper_tupe.height)
                })
            }

            if (ong[i].x== 0) ong.splice(0,1);

            if (ong[i].x == bird.x) {
                score++;
            }
            scoreshow.innerHTML = "Score :" + score;

            if (bird.y + birdimg.height == canvas.height || (bird.y== 0)) {
                return;
            }
            
            if (bird.x+30 == ong[i].x && bird.y<= ong[i].y+distance_top__top_bottom-distance_of_2_tube){
                return;
            }

            if (bird.x+30 == ong[i].x && bird.y>= ong[i].y+distance_top__top_bottom){
                return;
            }
        }

        bird.y+=3;
        requestAnimationFrame(run);
    }

    run();

    document.addEventListener('keydown', function() {
        bird.y-=60;
    })
}

start();