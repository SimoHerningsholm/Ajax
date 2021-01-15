//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Tager imod api script og vis script for at kunne eksekvere metoder derfra. Når scripts er hentet kan metoder derfra eksekveres gennem donemetoden
    $.when($.getScript("JS/api.js", "JS/vis.js").done(function () {
        //Tilgår visvaredata metoden fra api.js og modtager data gennem anonym funktion der sættes som argument som modtager data output som argument (se metoden i api.js for at se hvordan det fungere)
        VisVareData(function (output) {
            //Kalder OpretTabel metoden som modtager argumenter der skal anvendes til at oprette tabellen
            OpretTabel("#tabelContainer", "vareDataTable", "Varer", 7, output);
            //Sætter deletebtn på tabellen
            AppendDeleteBtn();
            //sætter klik event på deletebutton 
            DeleteBtnClick();
        });
    }));
});
//Laver metode til sletning af varer ved klik på knap på række i tbody sektionen på tabellen
function DeleteBtnClick() {
    //tilgår knapper på hver række og sætter et klik event på
    $("#vareDataTable tbody tr button").on("click", function () {
        //tilgår id på button objektet der er lig id på varen på rækken hvor knappen er placeret og sender det ind i deletevare metoden som sletter vare på basis af id
        DeleteVare($(this).attr("id"));
    });
}
//Laver metode til at sætte en dele knap på tabellen der er oprettet med opretTabel metoden hentet fra vis.js
function AppendDeleteBtn() {
    //Sætter et th felt ind i anden række på thead sektionen i tabellen for at der er en th for den td hvor knappen sidder (Gøres af layoutmæssige årsage)
    $($("#vareDataTable thead tr")[1]).append($("<th></th>"));
    //Sætter knap ind på hver række i bodydelen af tabellen
    $("#vareDataTable tbody tr").append($("<td></td>").append($("<button> Delete </button>")));
    //for her knap i tr rækkerne i tabellen sættes der en id attribut som er lig id på den tablerow hvor knappen sidder. 
    $("#vareDataTable tbody tr button").each(function () {
        $(this).attr("id", $(this).parent().parent().attr("id"));
    });
}