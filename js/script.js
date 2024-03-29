var text = [
    "des familles à se nourrir",
    "des villages à obtenir un puits",
    "des enfants à accéder à l'éducation",
];
var counter = 0;
var elem = document.getElementById("typed");

function change() {
    setTimeout(function () {
        $(elem).fadeTo(1500, 0, function () {
            this.innerHTML = text[counter];
            counter = ++counter % text.length;
            $(this).fadeTo(1500, 1, change);
        });
    }, 2000);
}

change();

var wellx;
var welly;
var bookx;
var booky;
var foodx;
var foody;
var healthx;
var healthy;
var windowx;
var windowy;
var halfwindowx;
// define x and y of each element, and change it on resize
function donationPosition() {
    wellx = Math.round($(".wellctn").offset().left + $(".wellctn").width() / 2);
    welly = $(".wellctn").offset().top + $(".wellctn").height() / 2;

    bookx = Math.round($(".bookctn").offset().left + $(".bookctn").width() / 2);
    booky = $(".bookctn").offset().top + $(".bookctn").height() / 2;

    foodx = Math.round($(".foodctn").offset().left + $(".foodctn").width() / 2);
    foody = $(".foodctn").offset().top + $(".foodctn").height() / 2;

    healthx = Math.round(
        $(".healthctn").offset().left + $(".healthctn").width() / 2
    );
    healthy = $(".healthctn").offset().top + $(".healthctn").height() / 2;

    windowx = $(window).width();
    windowy = $(window).height();
    halfwindowx = windowx / 2;
}

//Execute the fct when DOM and css is loaded
$(window).on("load resize", function () {
    donationPosition();
});

//function when the mouse move to interact with the ::before element
// $("window").on("mousemove", function (e) {
//     var miny = welly - windowy;
//     var maxy = healthy + windowy;

//     //only if mouse is on viewport of the el
//     if (e.pageY > miny && e.pageY < maxy) {
//         //for if the mouse is on top of the el
//         if (e.pageY > welly) {
//             let shadowY = (e.pageY * -10) / (welly - windowy);
//             $(".wellctn").css("--well-y", shadowY); // Modifiez la propriété top
//         }

//         //for if the mouse is under the el
//     }
// });

$("document").ready(function () {
    //Smooth scroll script
    $(".js-scrollTo").on("click", function () {
        // Au clic sur un élément
        var page = $(this).attr("href"); // Page cible
        var speed = 1000; // Durée de l'animation (en ms)
        $("html, body").animate({ scrollTop: $(page).offset().top }, speed); // Go
        return false;
    });

    //nav-active
    nav_active();
    $(document).on("scroll", nav_active);

    //Parallax donation shadow
    $(window).on("mousemove", function (e) {
        var miny = welly - windowy;
        var maxy = healthy + windowy;

        //only if mouse is on viewport of the el
        if (e.pageY > miny && e.pageY < maxy) {
            //for the y-axis shadow
            if (e.pageY > welly - windowy && e.pageY < welly + windowy) {
                let shadowY = ((e.pageY - welly) * -20) / windowy + "px";
                $(".wellctn").css("--well-y", shadowY);
            }
            if (e.pageY > booky - windowy && e.pageY < booky + windowy) {
                let shadowY = ((e.pageY - booky) * -20) / windowy + "px";
                $(".bookctn").css("--book-y", shadowY);
            }
            if (e.pageY > foody - windowy && e.pageY < foody + windowy) {
                let shadowY = ((e.pageY - foody) * -20) / windowy + "px";
                $(".foodctn").css("--food-y", shadowY);
            }
            if (e.pageY > healthy - windowy && e.pageY < healthy + windowy) {
                let shadowY = ((e.pageY - healthy) * -20) / windowy + "px";
                $(".healthctn").css("--health-y", shadowY);
            }

            //for the x-axis shadow

            //if the el is on the left of the screen
            if (wellx < halfwindowx) {
                let shadowX =
                    ((e.pageX - wellx) * -20) / (windowx - wellx) + "px";
                $(".wellctn").css("--well-x", shadowX);
            }
            if (bookx < halfwindowx) {
                let shadowX =
                    ((e.pageX - bookx) * -20) / (windowx - bookx) + "px";
                $(".bookctn").css("--book-x", shadowX);
            }
            if (foodx < halfwindowx) {
                let shadowX =
                    ((e.pageX - foodx) * -20) / (windowx - foodx) + "px";
                $(".foodctn").css("--food-x", shadowX);
            }
            if (healthx < halfwindowx) {
                let shadowX =
                    ((e.pageX - healthx) * -20) / (windowx - healthx) + "px";
                $(".healthctn").css("--health-x", shadowX);
            }

            //if the el is on the right or the center of the screen
            if (wellx > halfwindowx || wellx == halfwindowx) {
                let shadowX = ((e.pageX - wellx) * -20) / wellx + "px";
                $(".wellctn").css("--well-x", shadowX);
            }
            if (bookx > halfwindowx || bookx == halfwindowx) {
                let shadowX = ((e.pageX - bookx) * -20) / bookx + "px";
                $(".bookctn").css("--book-x", shadowX);
            }
            if (foodx > halfwindowx || foodx == halfwindowx) {
                let shadowX = ((e.pageX - foodx) * -20) / foodx + "px";
                $(".foodctn").css("--food-x", shadowX);
            }
            if (healthx > halfwindowx || healthx == halfwindowx) {
                let shadowX = ((e.pageX - healthx) * -20) / healthx + "px";
                $(".healthctn").css("--health-x", shadowX);
            }
        }
    });

    //Facebook cards loading
    // var token =
    //     "EAAEbgHkKPzcBADDkoneTZBqjhAU9ZBsKAxNCqFDS4RJiz66OAykbvkHZCCCk3CS5sgbBmfZC5npHYfusFmPtC7o3fGCFAV5ca25ZCU4S0kHqlhZBAkxjOxHhdJVnbbchfaLymZBGk3cyIFa1EkV0YHJdyULiGIBoxaMPZAwn2zp4vVqJ744WdUynJo5nCs9J9SQdrmbKaMrDY9hemQw4Wnfp";
    // var requestURL =
    //     "https://graph.facebook.com/837110672968905?fields=feed.limit(6){message,properties,attachments,permalink_url}&access_token=" +
    //     token;

    // var request = new XMLHttpRequest();
    // request.open("GET", requestURL);
    // request.responseType = "json";
    // request.send();

    // request.onload = function () {
    //     var cards = request.response;

    //     displayFB(cards);
    // };

    // function displayFB(jsonobj) {
    //     var json = jsonobj["feed"].data;

    //     for (var i = 0; i < json.length; i++) {
    //         var subtitle = json[i].message;
    //         var url = json[i].permalink_url;

    //         var type = (coverImg = uriimg = undefined);

    //         if (typeof json[i].attachments != "undefined") {
    //             var attachments = json[i].attachments.data[0];

    //             var type = attachments.type;
    //             var coverImg = attachments.media.image.src;
    //             var uriimg = attachments.url;
    //         }

    //         var container = document.createElement("div");
    //         container.className = "FBcontainer";

    //         var header = document.createElement("a");
    //         header.innerHTML =
    //             '<div class="user"><img src="img/logo/logo-dove-white.png"><h2>Fanantenana</h2><img class="fblogo" src="img/logo/facebook.png"></div>';
    //         header.href = "https://www.facebook.com/fanantenana619";
    //         header.setAttribute("target", "_blank");
    //         container.appendChild(header);

    //         var card = document.createElement("div");
    //         card.className = "FBcard";
    //         var cardContent = document.createElement("div");
    //         cardContent.className = "FBcard-content";
    //         var h2 = document.createElement("h2");
    //         var p = document.createElement("p");
    //         var imgContainer = document.createElement("div");

    //         var interaction = document.createElement("div");
    //         interaction.className = "interaction";
    //         interaction.innerHTML =
    //             `<a onclick='window.open("` +
    //             url +
    //             `", "_blank", "location=yes,height=900,width=500,scrollbars=yes,status=yes")'><button>Commenter</button></a><a onclick='window.open("` +
    //             url +
    //             `", "_blank", "location=yes,height=900,width=500,scrollbars=yes,status=yes")'><button>J\'aime</button></a><a onclick='window.open("https://www.facebook.com/sharer/sharer.php?u=` +
    //             url +
    //             `", "_blank", "location=yes,height=600,width=500,scrollbars=yes,status=yes")'><button>Partager</button></a>`;

    //         p.textContent = subtitle;
    //         if (typeof json[i].attachments != "undefined") {
    //             h2.textContent = attachments.title;

    //             if (typeof attachments.title == "undefined") {
    //                 h2.textContent = "Nouvelle publication";
    //             }
    //         } else {
    //             h2.textContent = "Nouvelle publication";
    //         }
    //         cardContent.appendChild(h2);
    //         cardContent.appendChild(p);

    //         if (type == "album") {
    //             var imgs = attachments.subattachments.data;

    //             for (var j = 0; j < imgs.length; j++) {
    //                 let albumImg = imgs[j].media.image.src;
    //                 let uriimg = imgs[j].url;

    //                 imgContainer.innerHTML +=
    //                     '<a target="_blank" href="' +
    //                     uriimg +
    //                     '"><img src="' +
    //                     albumImg +
    //                     '"/></a>';
    //             }

    //             cardContent.appendChild(imgContainer);
    //         }

    //         if (type == "video_autoplay" || type == "video") {
    //             imgContainer.innerHTML +=
    //                 '<a target="_blank" href="' +
    //                 uriimg +
    //                 '"><div class="FB_video"><img src="' +
    //                 coverImg +
    //                 '"/><button class="playbtn">&#9654;</button></div></a>';
    //             cardContent.appendChild(imgContainer);
    //         }

    //         if (type == "photo") {
    //             imgContainer.innerHTML +=
    //                 '<a target="_blank" href="' +
    //                 uriimg +
    //                 '"><img src="' +
    //                 coverImg +
    //                 '"/></a>';
    //             cardContent.appendChild(imgContainer);
    //         }

    //         card.appendChild(cardContent);
    //         card.appendChild(interaction);
    //         container.appendChild(card);
    //         document.getElementById("FB_content").appendChild(container);
    //     }
    // }

    particlesJS.load("particles-js", "js/particlesjs-config.json");
});

const swiper = new Swiper(".swiper-container", {
    centeredSlides: true,
    direction: "horizontal",
    loop: false,
    speed: 400,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: -50,
        depth: 1200,
        modifier: 1,
        slideShadows: false,
    },
    slidesPerView: 1,

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

    // Responsive breakpoints
    breakpoints: {
        1650: {
            slidesPerView: 2,
        },
        1000: {
            slidesPerView: 2,
            coverflowEffect: {
                stretch: -100,
            },
        },
    },
});

const mameAtropos = Atropos({
    el: ".mame-atropos",
    activeOffset: 30,
    rotateXMax: 5,
    rotateYMax: 5,
});
const papeAtropos = Atropos({
    el: ".pape-atropos",
    activeOffset: 30,
    rotateXMax: 5,
    rotateYMax: 5,
});

$("#parrain-btn").hover(
    function () {
        $("#landing-img-light").css({
            "clip-path": "circle(100% at 50% 80vh)",
        });
        $("#lightlogo").css({
            "clip-path": "circle(100% at 50% 80vh)",
        });
    },
    function () {
        $("#landing-img-light").css({ "clip-path": "circle(0% at 50% 80vh)" });
        $("#lightlogo").css({
            "clip-path": "circle(0% at 50% 80vh)",
        });
    }
);

var anchorfocus;
var h;
var result;
var testimonial;
var donation;
var about;
var y;
$(window).on("resize", initsectioncoor);
function initsectioncoor() {
    about = $("#about").position().top;
    donation = $("#donation").position().top;
    testimonial = $("#testimonial").position().top;
    result = $("#result").position().top;
}
initsectioncoor();

function nav_active() {
    y = $(window).scrollTop();

    if (y >= 0 && y < donation && anchorfocus !== "about") {
        $(".nav-active").removeClass("nav-active nav-scroll");
        $("#about-nav").addClass("nav-active nav-scroll");
        anchorfocus = "about";
    }
    if (y >= donation && y < testimonial && anchorfocus !== "donation") {
        $(".nav-active").removeClass("nav-active nav-scroll");
        $("#donation-nav").addClass("nav-active nav-scroll");
        anchorfocus = "donation";
    }
    if (y >= testimonial && y < result && anchorfocus !== "testimonial") {
        $(".nav-active").removeClass("nav-active nav-scroll");
        $("#testimonial-nav").addClass("nav-active nav-scroll");
        anchorfocus = "testimonial";
    }
    if (y >= result && anchorfocus !== "result") {
        $(".nav-active").removeClass("nav-active nav-scroll");
        $("#result-nav").addClass("nav-active nav-scroll");
        anchorfocus = "result";
    }
}

$(".inline-item").hover(
    function () {
        $(this).not(".nav-scroll").addClass("nav-active");
    },
    function () {
        $(this).not(".nav-scroll").removeClass("nav-active");
    }
);
