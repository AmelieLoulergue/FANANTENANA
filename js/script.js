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