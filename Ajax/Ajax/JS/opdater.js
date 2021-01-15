//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Loader api og validering scripts ind og når de er loadet ind kan deres metoder anvendes. Dette gøres gennem done metoden (man gør dette fordi ajax køre asynkront)
    $.when($.getScript("JS/api.js"), $.getScript("JS/validering.js")).done(function () {
        //Kalder visvare data og modtager data med henblik på at fylde select tag med id'er
        VisVareData(function (output) {
            //kalder metode til at fylde select tag på siden med mulige id'er der skal vises varedata ud fra
            FyldSelectInput(output);
            //kalder metode der sætter change event på select tag således at data kan loades ind i txt inputs på basis af id
            LoadVareFraId(output);
            //kalder metode der sætter submit event på submit btn som opdatere vare med specifikt id
            Opdater();
        });
    });
});
//Laver metode der fylder select tag med data der modtages som argument
function FyldSelectInput(data) {
    //Iterere gennem data (json objekter) med henblik på at tilgå hvert id
    $(data).each(function () {
        //looper igennem alle json objekters attributter med henblik på at kunne tilgå id og varelokation
        $(this).each(function () {
            //hvis varelokationen er 20 (den jeg har fået tildelt) skal id på denne vare tilgåes
            if (this.vareLokation == "20") {
                //laver en ny option til select tag som får sat et id og en text der er lig id på vare på json objekt.
                var appendStr = $("<option></option>").text(this.id).attr("id", this.id);
                //appender option til select tag (select tag har id som id)
                $("#id").append(appendStr);
            }
        });
    });
}
//laver metode til at loade varer data i input felter på basis af id på select tag
function LoadVareFraId(data) {
    //laver et change event på select tag der hapser valgt id i select tagget med henblik på at kunne finde varer data tilhørende det id
    $("#id").change(function () {
        //modtager id fra select tag drop down listen ved at modtage værdien på det option object under select tagget der er valgt
        var chosenId = $(this).val();
        //iterere igenne data (json objekter) for at kunne tilgå hvert enkelt element
        $(data).each(function () {
            //iterere gennem attributter på objekt man er nået til for at tilgå id attribut og holde den op imod valgt id
            $(this).each(function () {
                //hvis id på element er værdi der er valgt loades data tilknyttet objekt attributter ind i de forskellige tekstfelter
                if (this.id == chosenId) {
                    //tilgår input elementer på deres id med jquery og hapser attribut værdier på objektet  som sættes i inputfelterne med jquerys val metode
                    $("#vareNavn").val(this.vareNavn);
                    $("#vareBeskrivelse").val(this.vareBeskrivelse);
                    $("#vareLokation").val(this.vareLokation);
                    $("#lagerBeholdning").val(this.lagerBeholdning);
                    $("#indkoebspris").val(this.indkoebspris);
                    $("#fortjeneste").val(this.fortjeneste);
                }
            });
        });
    });
}
//Laver metode til at opdatere varer
function Opdater() {
    //Tilknytter submit event opdater formen 
    $("#opdaterForm").on("submit", function (event) {
        //Når man submitter på formen sendes formen ind som et objekt og de forskellige form elementer kan derfor tilgåes med "this" som er form objektet
        //Hvis form elementerne kommer successfuldt gennem basisvaliderings metoden kan opdatering finde sted
        if (BasisValidering(this)) {
            //Kalder updatevarer metoden fra api.js og sætter formen ind som json string ved at sætte den ind som parameter gennem converttojson metoden
            //Derudover sættes id på varen der skal opdateres ind. Dette gøres ved at tilgå værdi på html elementet. Egentlig kunne man også bare have tilgået id på formen ¯\_(ツ)_/¯
            UpdateVare(ConvertFormToJSON(this), Number($("#id").val()));
            //den skal ikke bare pr automatik gå til index
            event.preventDefault();
        }
        else {
            //hvis ikke formen kom successfuldt gennem validering får brugeren besked
            alert("Noget gik galt")
        }
   });
}
//laver metode til at konvertere formen til json format. Akurat samme metode laves i opret.js så egentlig burde den ligges ekstern og kaldes fra eksternt dokument. Metoden modtager formen den skal konvertere som argument
function ConvertFormToJSON(inForm) {
    //Bruger stringify metoden på json objektet til at lave json string med værdierne i formen. Det er vigtigt at sørge for at data har de rigtige datatyper. Derfor bruges number metoden til konvertering
    //Valideringen sørge for at der er tale om tal før denne metode kaldes
    return JSON.stringify({
        "vareNavn": $(inForm[1]).val(),
        "vareBeskrivelse": $(inForm[2]).val(),
        "vareLokation": Number($(inForm[3]).val()),
        "lagerBeholdning": Number($(inForm[4]).val()),
        "indkoebspris": Number($(inForm[5]).val()),
        "fortjeneste": Number($(inForm[6]).val())
    });
}