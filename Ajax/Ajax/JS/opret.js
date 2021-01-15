//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Loader api og validering scripts ind og når de er loadet ind kan deres metoder anvendes. Dette gøres gennem done metoden (man gør dette fordi ajax køre asynkront)
    $.when($.getScript("JS/api.js"), $.getScript("JS/Validering.js")).done(function () {
        //Sætter et submit event på opretformen som skal sende data fra formen og poste det til serveren
        $("#opretForm").on("submit", function (event) {
            //Den skal ikke være uartig og bare navigere til forsiden medmindre jeg siger den skal
            event.preventDefault();
            //formen skal gennem basisvalidering før den får mulighed for at blive postet. Da submit event sættes på formen smides form objektet ind og kan tilgåes med "this" 
            if (BasisValidering(this)) {
                //Hvis formen er successfuldt kommet gennem basisvalidering kaldes opretvare metoden fra api.js og formen sættes derind gennem convertformtojson metoden
                //som laver formen om til json format
                OpretVare(ConvertFormToJSON(this));
            }
            else {
                //hvis ikke formen gik gennem validering får brugeren at vide at noget gik galt. Egentlig er det ikke nødvendigt da brugeren allerede får besked gennem validerings metoderne
                alert("Noget gik galt");
            }
        });
    });
});
//laver metode til at konvertere formen til json format. Akurat samme metode laves i opdater.js så egentlig burde den ligges ekstern og kaldes fra eksternt dokument. Metoden modtager formen den skal konvertere som argument
function ConvertFormToJSON(inForm) {
    return JSON.stringify({
            //Bruger stringify metoden på json objektet til at lave json string med værdierne i formen. Det er vigtigt at sørge for at data har de rigtige datatyper. Derfor bruges number metoden til konvertering
    //Valideringen sørge for at der er tale om tal før denne metode kaldes
        "id": Number($(inForm[0]).val()),
        "vareNavn": $(inForm[1]).val(),
        "vareBeskrivelse": $(inForm[2]).val(),
        "vareLokation": Number($(inForm[3]).val()),
        "lagerBeholdning": Number($(inForm[4]).val()),
        "indkoebspris": Number($(inForm[5]).val()),
        "fortjeneste": Number($(inForm[6]).val())
    });
}