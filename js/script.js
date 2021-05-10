var text = ["des familles à se nourrir", "des villages à obtenir un puits", "des enfants à accéder à l'éducation"];
var counter = 0;
var elem = document.getElementById("typed");

function change() {
    setTimeout( function() {
        $(elem).fadeTo(1500, 0, function() {
            this.innerHTML = text[counter];
            counter = ++counter % text.length;
            $(this).fadeTo(1500, 1, change)
          })
    }, 2000)
 
}

change()

$('nav').hover(function() {
    $('.navp').css({
        'opacity' : '1',
        'right' : '0'
    });
    $('nav').css({
        'width': '260px',
        'background': 'rgba(0,0,0,.5)'
    });
    $('.logo').css({'filter': 'brightness(1)'})
}, function() {
    $('.navp').css({
        'opacity' : '0',
        'right' : '250px'
    });
    $('nav').css({
        'width': '80px',
        'background': 'rgba(0,0,0,.2)'
    });
    $('.logo').css({'filter': 'brightness(10)'})
});

$('document').ready(function() {
    var n = 0;
    setInterval(() => {
        if (n === 1) {
            $("#donation").css('background-image', 'url(img/donation1-d.jpg)');
            $("#donation-light-bg").css('background-image', 'url(img/donation1-l.jpg)');
            n = 0;
        } else {
            $("#donation").css('background-image', 'url(img/donation2-d.jpg)');
            $("#donation-light-bg").css('background-image', 'url(img/donation2-l.jpg)');
            n = 1;
        }
    }, 5000);


    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 1000; // Durée de l'animation (en ms)
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });
});

const swiper = new Swiper('.swiper-container', {

    direction: 'horizontal',
    loop: true,
    speed: 500,

    spaceBetween: 100,

    slidesPerView: 1,

    keyboard: {
        enabled: true,
    },
    mousewheel: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

$('#parrain-btn').hover(function() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var diagonale = Math.sqrt((vw/2) * (vw/2) + vh * vh);
    
    $("#landing-img-light").css({
        'clip-path': 'circle('+diagonale+'px at 50% 90vh)'
    });
    $("#lightlogo").css({
        'clip-path': 'circle('+diagonale+'px at 50% 90vh)'
    });
},
function() {
    $("#landing-img-light").css({
        'clip-path': 'circle(0% at 50% 90vh)'
    });

    $("#lightlogo").css({
        'clip-path': 'circle(0% at 50% 90vh)'
    });
})