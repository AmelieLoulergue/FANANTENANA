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

$('document').ready(function() {    

    //Smooth scroll script
    $('.js-scrollTo').on('click', function() { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 1000; // Durée de l'animation (en ms)
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });

    //nav-active
    nav_active();
    $(document).on('scroll', nav_active);

    //Facebook cards loading
    var token = "EAAEbgHkKPzcBACoqww2Wj9v5imehyE3E2TxemsZA07cct2GdBDP0Ew3X1JxOEUpI49dGgzTZBButxPnOzvv9a5VPZCZClmRZAxECKtJVf6OZBFLLJBlJbDlxUdT5ZB9OhqcZCUQ5GPBE8wIK7MLaCDfCZCqMfekE1ZCGIxHZBm6FqOODnvgMHA7iT1l";
var requestURL = 'https://graph.facebook.com/837110672968905?fields=feed.limit(6){message,properties,attachments,permalink_url}&access_token=' + token;

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var cards = request.response;
    
    displayFB(cards);
  }

function displayFB(jsonobj) {
    var json = jsonobj['feed'].data;
    
    for (var i = 0; i < json.length; i++) {
        var subtitle = json[i].message;
        var url = json[i].permalink_url;
        
        var type = coverImg = uriimg = undefined;

        if (typeof json[i].attachments != "undefined") {
            var attachments = json[i].attachments.data[0];
            
            var type = attachments.type;
            var coverImg = attachments.media.image.src;
            var uriimg = attachments.url;
        }

        var container = document.createElement('div');
        container.className = 'FBcontainer';

        var header = document.createElement('a');
        header.innerHTML= '<div class="user"><img src="img/logo/logo-dove-white.png"><h2>Fanantenana</h2><img class="fblogo" src="img/logo/facebook.png"></div>'
        header.href = "https://www.facebook.com/fanantenana619";
        header.setAttribute('target', '_blank');
        container.appendChild(header);

        var card = document.createElement('div');
        card.className = 'FBcard';
        var cardContent = document.createElement('div');
        cardContent.className = 'FBcard-content';
        var h2 = document.createElement('h2');
        var p = document.createElement('p');
        var imgContainer = document.createElement('div');

        var interaction = document.createElement('div');
        interaction.className = 'interaction';
        interaction.innerHTML = `<a onclick='window.open("` + url + `", "_blank", "location=yes,height=900,width=500,scrollbars=yes,status=yes")'><button>Commenter</button></a><a onclick='window.open("` + url + `", "_blank", "location=yes,height=900,width=500,scrollbars=yes,status=yes")'><button>J\'aime</button></a><a onclick='window.open("https://www.facebook.com/sharer/sharer.php?u=` + url + `", "_blank", "location=yes,height=600,width=500,scrollbars=yes,status=yes")'><button>Partager</button></a>`;

        p.textContent = subtitle;
        if (typeof json[i].attachments != "undefined") {
            h2.textContent = attachments.title;

            if (typeof attachments.title == "undefined") {
                h2.textContent = "Nouvelle publication"
            }
        } else {
            h2.textContent = "Nouvelle publication"
        }
        cardContent.appendChild(h2);
        cardContent.appendChild(p);

        if (type == "album") {
            var imgs = attachments.subattachments.data;
            
            for (var j = 0; j < imgs.length; j++) {
                let albumImg = imgs[j].media.image.src;
                let uriimg = imgs[j].url;

                imgContainer.innerHTML += '<a target="_blank" href="' + uriimg + '"><img src="' + albumImg + '"/></a>';
            }

            cardContent.appendChild(imgContainer);
        }

        if (type == "video_autoplay" || type == "video") {
            imgContainer.innerHTML += '<a target="_blank" href="' + uriimg + '"><div class="FB_video"><img src="' + coverImg + '"/><button class="playbtn">&#9654;</button></div></a>';
            cardContent.appendChild(imgContainer);
        }

        if (type == "photo") {
            imgContainer.innerHTML += '<a target="_blank" href="' + uriimg + '"><img src="' + coverImg + '"/></a>';
            cardContent.appendChild(imgContainer);
        }

        card.appendChild(cardContent);
        card.appendChild(interaction);
        container.appendChild(card);
        document.getElementById('FB_content').appendChild(container);
    }

}

    particlesJS.load('particles-js', 'js/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
});

const swiper = new Swiper('.swiper-container', {

    centeredSlides: true,
    direction: 'horizontal',
    loop: true,
    speed: 400,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 1200,
        modifier: 1,
        slideShadows: false,
    },

    
    
    slidesPerView: 1.5,
    
    keyboard: {
        enabled: true,
    },
    mousewheel: false,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    on: {
        init: function() {
            var n = this.activeIndex;

            this.slides[n-2].classList.add('slide-visible');
            this.slides[n-1].classList.add('slide-visible');
            this.slides[n].classList.add('slide-visible');
            this.slides[n+1].classList.add('slide-visible');
            this.slides[n+2].classList.add('slide-visible');
        }
    },

    // Responsive breakpoints
    breakpoints: {
        1650: {
            slidesPerView: 3
        },
        650: {
            slidesPerView: 2
        },
    },
});

//function on slide change for fading cards
swiper.on('slideChange breakpoint', function() {
    var n = swiper.activeIndex;

    $('.slide-visible').removeClass('slide-visible');

    swiper.slides[n-2].classList.add('slide-visible');
    swiper.slides[n-1].classList.add('slide-visible');
    swiper.slides[n].classList.add('slide-visible');
    swiper.slides[n+1].classList.add('slide-visible');
    swiper.slides[n+2].classList.add('slide-visible');
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

var anchorfocus; var h; var result; var testimonial; var donation; var about; var y;
$(window).on('resize', initsectioncoor)
function initsectioncoor() {
    about = $('#about').position().top;
    donation = $('#donation').position().top;
    testimonial = $('#testimonial').position().top;
    result = $('#result').position().top;
    
    h = $(window).height();
}
initsectioncoor();

function nav_active() {
    y = $(window).scrollTop();
    y = y + h/2;

    if (y >= 0 && y < donation && anchorfocus !== "about") {
        $('.nav-active').removeClass('nav-active nav-scroll');
        $('#about-nav').addClass('nav-active nav-scroll');
        anchorfocus = "about";
    }
    if (y >= donation && y < testimonial && anchorfocus !== "donation") {
        $('.nav-active').removeClass('nav-active nav-scroll');
        $('#donation-nav').addClass('nav-active nav-scroll');
        anchorfocus = "donation";
    }
    if (y >= testimonial && y < result && anchorfocus !== "testimonial") {
        $('.nav-active').removeClass('nav-active nav-scroll');
        $('#testimonial-nav').addClass('nav-active nav-scroll');
        anchorfocus = "testimonial";
    }
    if (y >= result && anchorfocus !== "result") {
        $('.nav-active').removeClass('nav-active nav-scroll');
        $('#result-nav').addClass('nav-active nav-scroll');
        anchorfocus = "result";
    }
}

$('.inline-item').hover(function() {$(this).not('.nav-scroll').addClass('nav-active')}, function() {$(this).not('.nav-scroll').removeClass('nav-active')})