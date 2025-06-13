let sections = document.querySelectorAll("section");
let sectionHeight = sections[0].offsetHeight;
let headerHeight = document.querySelector("header").offsetHeight;
let dots = document.querySelectorAll('.dot');

let scroll = document.querySelector('.scroll');

///////  FOR PARALLAX AND NAV-DOTS


let num = (window.scrollY - headerHeight) /sectionHeight;
num = Math.round(num);
num = Math.abs(num);
dots[num].style.background = "green";

document.querySelector('.nav-dots').addEventListener('click',function(event){
    if(event.target.classList.value == "dot"){
        clearDots();
        event.target.style.background = "green";
        let z = extractNumber(event.target.id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    } 
    if(event.target.classList.value == "dot-container"){
        clearDots();
        event.target.children[0].style.background = "green";
        let z = extractNumber(event.target.children[0].id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    }
});

function clearDots(){
    dots.forEach(function(dot){
        dot.style.background = "rgb(175, 175, 214)";
    });
}
function extractNumber(x){
    let number;
    if(x[4] != undefined){
        number = x[3]*10 + x[4]*1;
    } else{
        number = x[3]*1;
    }
    return number-1;
}


document.addEventListener("scroll", function(){
    scroll.innerHTML = window.scrollY;
    let num = (window.scrollY - headerHeight) /sectionHeight;
    num = Math.round(num);
    num = Math.abs(num);

    if(num != 11){
        clearDots();
        dots[num].style.background = "green";
    }

    if(num >= 0){
        parallax(num);
        if(num-1 >= 0){
            parallax(num-1);
        }
    }
})

let parallax = (index)=>{
    if(index == 11){
        return;
    }
    let scrollValue;
    if(index == 0){
        scrollValue = window.scrollY - sections[index].offsetTop + headerHeight;
    } else {
        scrollValue = window.scrollY - sections[index].offsetTop + window.innerHeight;
    }


    let bg_parallaxValue = scrollValue/7;
    let fg_parallaxValue = scrollValue/2.6;
    
    let child = sections[index].children;
    let grandChild = child[0].children;
    grandChild[0].style.top = "-"+bg_parallaxValue+"px";

    if(index == 1 || index == 5 || index == 9){
        grandChild[1].style.bottom = fg_parallaxValue+"px";

    }
}

//*********** parallax ends */

/////////////// FOR VIDEO PLAYER

document.querySelector('#play').addEventListener('click',function(){
    document.querySelector('.overlay').style.display = "block";
    document.querySelector('video').play();
})

document.querySelector('.close-icon').addEventListener('click',function(){
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('video').pause();
    document.querySelector('video').currentTime = 0;
})

// ***************** video player ends 

/////////  FOR SLIDERS

let slides = document.querySelectorAll('.slides');
let more = document.querySelector('.more');
count = 0;
more.addEventListener('click', function(){
    if(count == slides.length-1){
        slides[count].style.display = "none";
        slides[count].style.top = "350px";
        slides.forEach(function(slide){
            slide.style.display="block";
        })
        slides[0].style.top = "0";
        count = 0;
    } else {
        if(count == slides.length-2){
            slides[0].style.top = "-350px";
            slides[0].style.display = "block"
        }
        slides[count].style.display = "none";
        slides[count].style.top = "350px";
        slides[count+1].style.display = "block";
        slides[count+1].style.top = "0";
        count++;
    }
})

let slides2 = document.querySelectorAll('.slides2');
let more2 = document.querySelector('.more2');
count2 = 0;
more2.addEventListener('click', function(){
    if(count2 == slides2.length-1){
        slides2[count2].style.display = "none";
        slides2[count2].style.top = "350px";
        slides2.forEach(function(slide){
            slide.style.display="block";
        })
        slides2[0].style.top = "0";
        count2 = 0;
    } else {
        if(count2 == slides2.length-2){
            slides2[0].style.top = "-350px";
            slides2[0].style.display = "block"
        }
        slides2[count2].style.display = "none";
        slides2[count2].style.top = "350px";
        slides2[count2+1].style.display = "block";
        slides2[count2+1].style.top = "0";
        count2++;
    }
})

//***********slider ends */


//////////////// FOR LINES

window.addEventListener('resize',configureLines)


function configureLines(){
    let lines = document.querySelectorAll('.line');
    let temp = 0;
    
    let line = (x1,y1,x2,y2)=>{
        let left,top,height,arc,degree;
        left = x1 + ((x2-x1)/2);
        top = y1 + ((y2-y1)/2);
        height = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
        // console.log(height);
        arc = Math.asin((x2-x1)/height);
        // console.log(arc);
        degree = arc * 180 / Math.PI;
        degree = - degree;
        // console.log(degree);
        
    
        lines[temp].style.height = height+"px";
        lines[temp].style.left = left+"px";
        lines[temp].style.top = top+"px";
        lines[temp].style.transform = "translate(-50%,-50%) rotateZ("+ degree +"deg)";
        temp++;
    
    }
    
    
    let a,b,c,d;
    
    // line 1
    a = document.querySelector('header').children[0].children[0].offsetLeft + 
        document.querySelector('header').children[0].children[0].offsetWidth/2;
    b = document.querySelector('header').children[0].children[0].offsetTop + 
        document.querySelector('header').children[0].children[0].offsetHeight + 20;
    c = document.querySelectorAll('section')[0].children[1].children[1].offsetLeft + 
        document.querySelectorAll('section')[0].children[1].children[1].offsetWidth/2;
    d = document.querySelectorAll('section')[0].children[1].children[1].offsetTop +
        document.querySelectorAll('section')[0].children[1].offsetTop -
        document.querySelectorAll('section')[0].children[1].offsetHeight/2 +
        document.querySelectorAll('section')[0].offsetTop;
    
    line(a,b,c,d);
    
    // line 2
    a = document.querySelectorAll('section')[0].children[1].children[1].offsetLeft + 
        document.querySelectorAll('section')[0].children[1].children[1].offsetWidth/2;
    b = document.querySelectorAll('section')[0].children[1].children[1].offsetTop +
        document.querySelectorAll('section')[0].children[1].children[1].offsetHeight +
        document.querySelectorAll('section')[0].children[1].offsetTop -
        document.querySelectorAll('section')[0].children[1].offsetHeight/2 +
        document.querySelectorAll('section')[0].offsetTop;
    c = document.querySelectorAll('section')[1].children[1].offsetLeft + 100;
    d = document.querySelectorAll('section')[1].children[1].offsetTop +
        document.querySelectorAll('section')[1].offsetTop;
    
    line(a,b,c,d);
    
    // line 3
    a = document.querySelectorAll('section')[1].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[1].children[1].offsetTop +
        document.querySelectorAll('section')[1].children[1].offsetHeight +
        document.querySelectorAll('section')[1].offsetTop;
    c = document.querySelectorAll('section')[2].children[1].offsetLeft + 120;
    d = document.querySelectorAll('section')[2].children[1].offsetTop +
        document.querySelectorAll('section')[2].offsetTop;
    
    line(a,b,c,d);
    
    // line 4
    a = document.querySelectorAll('section')[2].children[1].offsetLeft +
        document.querySelectorAll('section')[2].children[1].offsetWidth*1/3;
    b = document.querySelectorAll('section')[2].children[1].offsetTop +
        document.querySelectorAll('section')[2].children[1].offsetHeight +
        document.querySelectorAll('section')[2].offsetTop;
    c = document.querySelectorAll('section')[3].children[0].offsetLeft +
        document.querySelectorAll('section')[3].children[0].offsetWidth*3/7;
    d = document.querySelectorAll('section')[3].children[0].offsetTop +
        document.querySelectorAll('section')[3].offsetTop -20;
    
    line(a,b,c,d);
    
    // line 5
    a = document.querySelectorAll('section')[3].children[1].offsetLeft +
        document.querySelectorAll('section')[3].children[1].offsetWidth*4/11;
    b = document.querySelectorAll('section')[3].children[1].offsetTop +
        document.querySelectorAll('section')[3].children[1].offsetHeight +
        document.querySelectorAll('section')[3].offsetTop;
    c = document.querySelectorAll('section')[4].children[1].offsetLeft +
        document.querySelectorAll('section')[4].children[1].offsetWidth*1/7;
    d = document.querySelectorAll('section')[4].children[1].offsetTop +
        document.querySelectorAll('section')[4].offsetTop;
    
    line(a,b,c,d);
    
    // line 6
    a = document.querySelectorAll('section')[4].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[4].children[1].offsetTop +
        document.querySelectorAll('section')[4].children[1].offsetHeight +
        document.querySelectorAll('section')[4].offsetTop;
    c = document.querySelectorAll('section')[5].children[1].offsetLeft + 150;
    d = document.querySelectorAll('section')[5].children[1].offsetTop +
        document.querySelectorAll('section')[5].offsetTop;
    
    line(a,b,c,d);
    
    // line 7
    a = document.querySelectorAll('section')[5].children[1].offsetLeft + 110;
    b = document.querySelectorAll('section')[5].children[1].offsetTop +
        document.querySelectorAll('section')[5].children[1].offsetHeight +
        document.querySelectorAll('section')[5].offsetTop;
    c = document.querySelectorAll('section')[6].children[1].offsetLeft + 50;
    d = document.querySelectorAll('section')[6].children[1].offsetTop +
        document.querySelectorAll('section')[6].offsetTop;
    
    line(a,b,c,d);
    
    // line 8
    a = document.querySelectorAll('section')[6].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[6].children[1].offsetTop +
        document.querySelectorAll('section')[6].children[1].offsetHeight +
        document.querySelectorAll('section')[6].offsetTop;
    c = document.querySelectorAll('section')[7].children[0].offsetLeft + 400;
    d = document.querySelectorAll('section')[7].children[0].offsetTop +
        document.querySelectorAll('section')[7].offsetTop - 20;
    
    line(a,b,c,d);
    
    // line 9
    a = document.querySelectorAll('section')[7].children[1].offsetLeft +
        document.querySelectorAll('section')[7].children[1].offsetWidth*4/11;
    b = document.querySelectorAll('section')[7].children[1].offsetTop +
        document.querySelectorAll('section')[7].children[1].offsetHeight +
        document.querySelectorAll('section')[7].offsetTop + 30;
    c = document.querySelectorAll('section')[8].children[1].offsetLeft +
        document.querySelectorAll('section')[8].children[1].offsetWidth*1/10;
    d = document.querySelectorAll('section')[8].children[1].offsetTop +
        document.querySelectorAll('section')[8].offsetTop;
    
    line(a,b,c,d);
    
    // line 10
    a = document.querySelectorAll('section')[8].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[8].children[1].offsetTop +
        document.querySelectorAll('section')[8].children[1].offsetHeight +
        document.querySelectorAll('section')[8].offsetTop;
    c = document.querySelectorAll('section')[9].children[1].offsetLeft +
        document.querySelectorAll('section')[9].children[1].offsetWidth*1/10;
    d = document.querySelectorAll('section')[9].children[1].offsetTop +
        document.querySelectorAll('section')[9].offsetTop;
    
    line(a,b,c,d);
    
    // line 11
    a = document.querySelectorAll('section')[9].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[9].children[1].offsetTop +
        document.querySelectorAll('section')[9].children[1].offsetHeight +
        document.querySelectorAll('section')[9].offsetTop;
    c = document.querySelectorAll('section')[10].children[1].offsetLeft + 250;
    d = document.querySelectorAll('section')[10].children[1].offsetTop +
        document.querySelectorAll('section')[10].offsetTop;
    
    line(a,b,c,d);
    
    // line 12
    a = document.querySelectorAll('section')[10].children[1].offsetLeft +
        document.querySelectorAll('section')[10].children[1].offsetWidth*1/7;
    b = document.querySelectorAll('section')[10].children[1].offsetTop +
        document.querySelectorAll('section')[10].children[1].offsetHeight +
        document.querySelectorAll('section')[10].offsetTop;
    c = document.querySelectorAll('section')[11].children[0].offsetLeft +
        document.querySelectorAll('section')[11].children[0].offsetWidth*2/5 + 30;
    d = document.querySelectorAll('section')[11].children[0].offsetTop +
        document.querySelectorAll('section')[11].offsetTop - 20;
    
    line(a,b,c,d);

}

configureLines();

// --- Heart Animation for Surprise Button ---
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = `<svg viewBox="0 0 32 29.6" width="32" height="32">
      <path fill="#e75480" d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4
      c0,6.1,5.6,11.1,14.1,18.7c0.6,0.5,1.5,0.5,2.1,0C26.4,21.5,32,16.5,32,10.4C32,4.7,27.3,0,23.6,0z"/>
    </svg>`;
    heart.style.left = (10 + Math.random() * 80) + 'vw';
    heart.style.top = (60 + Math.random() * 20) + 'vh';
    heart.style.transform = `scale(${0.8 + Math.random()*0.6}) rotate(${Math.random()*40-20}deg)`;
    const container = document.querySelector('.hearts-container');
    if (container) {
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1800);
    }
}

function burstHearts() {
    for(let i=0; i<12; i++) {
        setTimeout(createHeart, i*80 + Math.random()*60);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const landing = document.getElementById('landing-page');
    const btn = document.getElementById('surprise-btn');

    if (btn) {
        btn.addEventListener('click', function() {
            // Hide landing page
            landing.style.display = 'none';

            // Show burst background overlay and animate image
            const burstBg = document.getElementById('burst-bg-overlay');
            const burstImg = document.getElementById('burst-bg-img');
            burstBg.style.display = 'flex';
            burstImg.classList.remove('animate-center');
            burstImg.classList.remove('animate-spin');

            // Force reflow to apply initial small state
            void burstImg.offsetWidth;

            // Now add the spin class to trigger the animation
            burstImg.classList.add('animate-spin');

            // After spin, move to center position
            setTimeout(() => {
                burstImg.classList.remove('animate-spin');
                burstImg.classList.add('animate-center');
            }, 2000); // Spin duration in ms (2s)

            // Show emoji burst at the same time
            emojiBurst();

            // After the burst and silly transition, show confirmation overlay
            setTimeout(function() {
                burstBg.style.display = 'none';
                burstImg.classList.remove('animate-center');
                // Show confirmation overlay
                const loveConfirm = document.getElementById('love-confirm-overlay');
                loveConfirm.style.display = 'flex';
            }, 5500); // Match this to emojiBurst's duration
        });
    }

    const loveConfirmBtn = document.getElementById('love-confirm-btn');
    if (loveConfirmBtn) {
        loveConfirmBtn.addEventListener('click', function() {

            document.getElementById('love-confirm-overlay').style.display = 'none';
            showFunnyTransition();
        });
    }

    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.addEventListener('click', function(e) {
            console.log('Canvas clicked!');
            const audio = document.getElementById('love-music');
            if (audio) {
                audio.currentTime = 0;
                audio.play().then(() => {
                    console.log('Music started!');
                }).catch(err => {
                    console.error('Music play error:', err);
                });
            } else {
                console.log('Audio element not found!');
            }
        });
    }

    const audio = document.getElementById('love-music');
    if (audio) {
        audio.volume = 0.2; // Set volume to 20%
    }

    const seeHistoryBtn = document.getElementById('see-history-btn');
    if (seeHistoryBtn) {
        seeHistoryBtn.addEventListener('click', function() {
            emojiBurst(); // Burst effect
            // After burst, you can redirect or show your history overlay/page
            setTimeout(() => {
                // Example: Hide tree overlay, show history overlay
                document.getElementById('heart-tree-overlay').style.display = 'none';
                // Show your history overlay here, e.g.:
                // document.getElementById('history-overlay').style.display = 'flex';
            }, 1200); // Wait a bit for the burst to finish
        });
    }
});

// Confirmation button handler
document.getElementById('love-confirm-btn').addEventListener('click', function() {
    // Hide confirmation overlay
    document.getElementById('love-confirm-overlay').style.display = 'none';
    // Show heart tree overlay
    const overlay = document.getElementById('heart-tree-overlay');
    overlay.style.display = 'flex';
    overlay.classList.remove('background-only');
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('tree-text').style.display = 'block';
    document.getElementById('close-heart-tree').style.display = 'block';
    if (typeof window.initLove === 'function') {
        window.initLove();
    }
});

// --- Surprise Burst Animation ---
let burstInterval = null;
let burstTimeout = null;

function burstSurprise() {
    const burst = document.querySelector('.surprise-burst');
    const burstIcons = burst.querySelector('.burst-icons');
    burst.style.display = 'flex';

    function createBurstIcons() {
        burstIcons.innerHTML = '';
        const icons = ['💖','💝','💗','🌸','🌹','⭐','✨','🎉','🎊'];
        for(let i=0; i<20; i++) {
            const icon = document.createElement('span');
            icon.className = 'burst-icon';
            icon.textContent = icons[Math.floor(Math.random()*icons.length)];
            icon.style.position = 'absolute';
            icon.style.left = (10 + Math.random()*80) + '%';
            icon.style.top = (10 + Math.random()*80) + '%';
            icon.style.fontSize = (24 + Math.random()*16) + 'px';
            burstIcons.appendChild(icon);
        }
    }

    createBurstIcons();
    if (window.burstInterval) clearInterval(window.burstInterval);
    window.burstInterval = setInterval(createBurstIcons, 1800);

    // Hide burst after 3 seconds and show intro
    setTimeout(() => {
        burst.style.display = 'none';
        const intro = document.getElementById('intro-overlay');
        intro.style.display = 'flex';
        setTimeout(() => {
            intro.classList.remove('hide');
        }, 10);
    }, 3000);

    // Confetti burst (defensive)
    const confettiContainer = burst.querySelector('.confetti-container');
    if (confettiContainer) {
        confettiContainer.innerHTML = '';
        const confettiEmojis = ['💖','💝','💗','🌸','🌹','⭐','✨','🎉','🎊'];
        for(let i=0; i<30; i++) {
            const conf = document.createElement('span');
            conf.className = 'confetti';
            conf.textContent = confettiEmojis[Math.floor(Math.random()*confettiEmojis.length)];
            conf.style.position = 'absolute';
            conf.style.left = (Math.random()*100) + '%';
            conf.style.top = (Math.random()*100) + '%';
            confettiContainer.appendChild(conf);
        }
    } else {
        console.warn('No confetti container found in .surprise-burst!');
    }
}

// --- Heart Tree Animation (from happybday-main) ---
function showHeartTree() {
    const overlay = document.getElementById('heart-tree-overlay');
    overlay.style.background = "url('images/totoro030.jpg') center center / cover no-repeatrgb(255, 0, 0)";
    overlay.classList.remove('background-only');
    overlay.style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('tree-text').style.display = 'block';
    document.getElementById('close-heart-tree').style.display = 'block';
    if (typeof window.initLove === 'function') {
        window.initLove();
    }
}

// --- Emoji Burst Function ---
function emojiBurst() {
    const overlay = document.getElementById('emoji-burst-overlay');
    overlay.innerHTML = '';
    overlay.style.display = 'block';
    const emojis = ['💖','💝','💗','🌸','🌹','⭐','✨','🎉','🎊','😍','🥰','😘','💞','💕','💓','💘','💍','🌷','🌺'];
    const count =100; // Lowered for better performance
    for (let i = 0; i < count; i++) {
        const emoji = document.createElement('span');
        emoji.className = 'emoji-burst-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = (Math.random() * 98) + 'vw';
        emoji.style.top = (100 + Math.random() * 8) + 'vh';
        emoji.style.fontSize = (28 + Math.random() * 36) + 'px';
        emoji.style.animationDelay = (Math.random() * 1.5) + 's';
        overlay.appendChild(emoji);
    }
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
    }, 5200);
}

// --- Funny Transition Function ---
function showFunnyTransition() {
    const funnyOverlay = document.getElementById('funny-img-overlay');
    const funnyImg = document.getElementById('funny-img');
    funnyOverlay.style.display = 'flex';
    // Force reflow
    void funnyImg.offsetWidth;
    funnyImg.style.opacity = '1';
    funnyImg.style.transform = 'scale(1)';

    setTimeout(() => {
        funnyOverlay.style.display = 'none';
        funnyImg.style.opacity = '0';
        funnyImg.style.transform = 'scale(0.2)';
        // Now show the heart tree overlay
        const overlay = document.getElementById('heart-tree-overlay');
        overlay.style.display = 'flex';
        overlay.classList.remove('background-only');
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('tree-text').style.display = 'block';
        document.getElementById('close-heart-tree').style.display = 'block';
        if (typeof window.initLove === 'function') {
            window.initLove();
        }
    }, 1800); // Show funny image for 1.8s
}

document.getElementById('landing-envelope').onclick = function() {
    // Your surprise logic here
    // Example: hide landing, show burst, etc.
    // alert('Surprise! Envelope clicked!');
    // (Put your animation logic here)
};
