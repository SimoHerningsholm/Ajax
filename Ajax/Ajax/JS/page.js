//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Indhold der skal loades ind på siden lige så snart siden indlæses
    $("#headerContainer").load("../Partials/header.html");
    $("#footerContainer").load("../Partials/footer.html");
    $("#indholdsContainer").load("../Partials/varelager.html");
});