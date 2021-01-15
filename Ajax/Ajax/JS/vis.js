//Loader indhold der skal eksekveres eller være tilgængelig når siden er loadet
$(function () {
    //Modtager api.js for at kunne tilgå dens metoder
    $.getScript("JS/api.js", function () {
        //kalder visvaredata metoden fra api.js og modtager dataoutput derfra gennem parameteren
        VisVareData(function (output) {
            //Opretter tabel der skal vise data som modtagere forskellige argumenter der skal anvendes for at vise data og formatere tabel korrekt
            OpretTabel("#tabelContainer", "vareDataTable", "Varer", 6, output);
            //Sætter et rowklik event på tabellen med henblik på at kunne se data associeret med et tr element
            RowKlik();
        })
    });
});
//Laver en rowklik metode med  henblik på at vise data fra tablerows ved klik
function RowKlik() {
    //laver et klik event på hver række på tabellen som eksekvere en alert metode der udskriver id på rækken og varenavn som læses fra rækken
    $("#vareDataTable tbody tr").on("click", function () {
          alert("Id: " + $(this).attr("id") + ", Varenavn: " + $(this).children().first().text());
    });
}
//laver en metode til at oprette thead på en tabel, som modtager overskrift på tabellen, antal kolonner samt data således der kan læses navn på attributter som sættes til overskrifter for hver td kolonner
function OpretThead(overSkrift, antalKolonner, data) {
    //Laver et thead tag
    var thead = $("<thead></thead>");
    //laver en tr til overskriften som modtager en th hvortil der indsættes en colspan attribut således at kolonne spanner over x antal kolonner. th'en modtager overskrift
    var overskrift = $("<tr></tr>").append($("<th></th>").attr("colspan", antalKolonner).text(overSkrift));
    //laver række til kolonneoverskrifter
    var kolonneOverskrifterRow = $("<tr></tr>");
    //Tilgår første json objekt med henblik på at kunne fange navnet på det enkelte json attributter
    $(data[0]).each(function () {
        //Da id ikke skal listes fjernes id attributten fra json objektet
        delete this.id;
        //Iterere igennem alle atributter med henblik på at appende navnet på dem til en th kolonne
        $(Object.keys(this)).each(function () {
            //sætter overskriften på attribut ind i th og appender den til overskriftrækken
            $("<th></th>").text(this).appendTo(kolonneOverskrifterRow);
        })
    });
    //Appender række med overskrift til thead
    thead.append(overskrift);
    //appender række med attributt overskrifter til thead
    thead.append(kolonneOverskrifterRow);
    //returnere thead sektion
    return thead;
}
//Laver metode til at fylde tbody på tabel med jason data modtaget med ajax
function OpretTBody(data) {
    //laver tbody tag
    var tbody = $("<tbody></tbody>");
    //iterere igennem alle json objekter med henblik på at kunne tilgå data associeret med attributter
    $(data).each(function () {
        //iterere igennem data associeret med attributter på json objekt den er nået til
        $(this).each(function () {
            //skal kun vise data for objekter der har fået sat deres varelokation til 20
            if (this.vareLokation == "20") {
                //for hvert objekt laves en række der skal indeholde data associeret med objektet. Rækken indeholder id på objektet
                var vareDataRow = $("<tr></tr>").attr("id", this.id);
                //Laver tabledata kolonner som modtager varerdata som tekst og hver kolonne sættes ind i den ovenstående varedatarow
                $("<td></td>").text(this.vareNavn).appendTo(vareDataRow);
                $("<td></td>").text(this.vareBeskrivelse).appendTo(vareDataRow);
                $("<td></td>").text(this.vareLokation).appendTo(vareDataRow);
                $("<td></td>").text(this.lagerBeholdning).appendTo(vareDataRow);
                $("<td></td>").text(this.indkoebspris).appendTo(vareDataRow);
                $("<td></td>").text(this.fortjeneste).appendTo(vareDataRow);
                //til sidst appendes varedata rækken i tbody
                $(tbody).append(vareDataRow);
            }
        });
    });
    //tbody returneres tilbage 
    return tbody;
}
//Laver metode til at oprette tabel der har diverse parametre der indeholder data der skal bruges for at oprette tabel
function OpretTabel(div, tabelId, overskrift, kolonner, data) {
    //Laver tabel og giver den et id
    var tabel = $("<table></table>").attr("id", tabelId);
    //laver en thead sektion på tabellen med opretthead metoden 
    tabel.append(OpretThead(overskrift, kolonner, data));
    //laver en tbody sektion på tabellen med oprettbody metoden
    tabel.append(OpretTBody(data));
    //til sidste sættes tabellen ind i html element med id modtaget som parameter
    $(div).append(tabel);
}