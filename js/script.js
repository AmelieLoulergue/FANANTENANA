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
        'background': 'rgba(0,0,0,.4)'
    });
}, function() {
    $('.navp').css({
        'opacity' : '0',
        'right' : '250px'
    });
    $('nav').css({
        'width': '80px',
        'background': 'rgba(0,0,0,.2)'
    });
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
})