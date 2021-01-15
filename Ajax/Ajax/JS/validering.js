//Laver en metode der opsamler alt validering og som returnere false hvis der er en validering der ikke køre igennem
function BasisValidering(inForm) {
    if (IndholdsValidering(inForm) === false) {
        return false;
    }
    if (DataTypeValidering(inForm) === false) {
        return false;
    }
    return true;
}
//Laver metode til at opfange om der er null eller tomme værdier i form elementer. Hvis der er, sendes der en fejlmeddelelse og der returneres false
function IndholdsValidering(inForm) {
    if ($(inForm[0]).val() === "" || $(inForm[0]).val() === null) {
        alert("Der mangler et gyldigt id");
        return false;
    }
    if ($(inForm[1]).val() === "" || $(inForm[1]).val() === null) {
        alert("Der mangler et gyldigt varenavn");
        return false;
    }
    if ($(inForm[2]).val() === "" || $(inForm[2]).val() === null) {
        alert("Der mangler en gyldig varebeskrivelse");
        return false;
    }
    if ($(inForm[3]).val() === "" || $(inForm[3]).val() === null) {
        alert("Der mangler en gyldig varelokation");
        return false;
    }
    if ($(inForm[4]).val() === "" || $(inForm[4]).val() === null) {
        alert("Der mangler en gyldig lagerbeholdning");
        return false;
    }
    if ($(inForm[5]).val() === "" || $(inForm[5]).val() === null) {
        alert("Der mangler en gyldig indkøbspris");
        return false;
    }
    if ($(inForm[6]).val() === "" || $(inForm[6]).val() === null) {
        alert("Der mangler en gyldig fortjeneste");
        return false;
    }
    return true;
}
//Laver metode til at validere om de felter der indeholder tal faktisk også indeholder tal. Hvis der ikke er tale om tal sendes en fejlmeddelelse og der returneres false
function DataTypeValidering(inForm) {
    if (isNaN($(inForm[0]).val())) {
        alert("Id var ikke et tal");
        return false;
    }
    if (isNaN($(inForm[3]).val())) {
        alert("Varelokation var ikke et tal");
        return false;
    }
    if (isNaN($(inForm[4]).val())) {
        alert("Lagerbeholdning var ikke et tal");
        return false;
    }
    if (isNaN($(inForm[5]).val())) {
        alert("Indkøbspris var ikke et tal");
        return false;
    }
    if (isNaN($(inForm[6]).val())) {
        alert("fortjeneste var ikke et tal");
        return false;
    }
    return true;
}