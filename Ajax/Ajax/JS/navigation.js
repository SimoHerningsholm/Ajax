//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Det er måske ikke det smarteste at tilgå knapperne via deres index. i navigationscontaineren, men jeg har jo styr på hvor de er, så det gør jeg. 
    //Arbejdede jeg sammen med andre kan det være jeg ville gøre det på en anden måde. Ved klik på knapper loades forskellige sider idn i indholdscontainer
    $("#navigationContainer button").eq(0).on("click", function () {
        $("#indholdsContainer").load("../Partials/varelager.html");
    });
    $("#navigationContainer button").eq(1).on("click", function () {
        $("#indholdsContainer").load("../Partials/opret.html");
    });
    $("#navigationContainer button").eq(2).on("click", function () {
        $("#indholdsContainer").load("../Partials/opdater.html");
    });
    $("#navigationContainer button").eq(3).on("click", function () {
        $("#indholdsContainer").load("../Partials/delete.html");
    });
});
