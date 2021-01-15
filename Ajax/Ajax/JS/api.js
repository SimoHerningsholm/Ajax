//Laver metode til at lave ajaxkald for at oprette varer, som modtager formdata der skal postes mod serveren
function OpretVare(formData) {
    //Tilgår ajax med jquery
    $.ajax({
        //Sætter url data skal eksekveres op imod
        url: 'http://www.service.bsuv.dk/api/varelager',
        //Sætter datatypen på data postes mod serveren
        dataType: "json",
        //Sætter data der skal eksekveres op imod serveren
        data: formData,
        //Sætter content type med tegnsæt indkodning for formdata
        contentType: "application/json; charset=utf-8",
        //Sætter eksekveringsmetoden, som i dette tilfælde er en post (indsæt)
        method: "POST",
        //Sætter metode der skal eksekveres når eksekvering er færdig. Denne metode modtager data fra eksekvering, og status på eksekveringen samt XMLHttpRequest (Objektet der bruges til udveksling af data med webserver)
        complete: function (data, status, xhr) {
            //hvis status på data er 200 har eksekvering været successfuld og der navigeres til index hvor den opdaterede vare kan observeres
            if (data.status == 200) {
                window.location.href = 'index.html';
            }
            else {
                //Hvis status på data ikke er 200 har der været et problem ved eksekvering, og objekter der kan fortælle noget om eksekveringen printes ud til konsollen
                console.log(data);
                console.log(status);
                console.log(xhr);
                //Der printes også en fejl ud til den stakkels bruger der poster data uden resultat
                alert("Der opstod en fejl ved kontakt til serveren");
            }
        }
    });
}
//Laver metode til at lave ajaxkald for at vise varer, som modtager parameter der anvendes til at data kan returneres ved metodekald (se metodekald på sider der anvender metoden)
function VisVareData(returnerAjaxData) {
    //Tilgår ajax med jquery
    return $.ajax({
        //Sætter url data skal eksekveres op imod
        url: 'http://www.service.bsuv.dk/api/varelager',
        //Sætter datatypen på data der hentes fra serveren
        dataType: 'json',
        //Sætter eksekveringsmetoden, som i dette tilfælde er en get
        method: 'GET',
        //Sætter metode der skal eksekveres hvis eksekvering mod serveren har været successfuld. Denne metode sætter data ind i parameter på metodens parameter så data kan hentes ved kald af metoden hvor metoden er inde i
        success: function (data) {
            returnerAjaxData(data);
        },
        //Sætter metode der skal eksekveres hvis eksekvering mod serveren ikke har været successfuld. Denne metode modtager data fra eksekvering, og status på eksekveringen samt XMLHttpRequest (Objektet der bruges til udveksling af data med webserver)
        error: function (data, status, xhr) {
            //Hvis eksekvering ikke har været successfuld printes objekter der kan fortælle noget om eksekveringen ud til konsollen
            console.log(data);
            console.log(status);
            console.log(xhr);
            //Der printes også en fejl ud til den stakkels bruger der ikke kan forstå hvorfor der ikke kommer nogen data frem
            alert("Der opstod en fejl ved kontakt til serveren");
        }
    });
}
//Laver metode til at lave ajaxkald for at slette varer, som modtager id på vare der skal slettes
function DeleteVare(id) {
    //Tilgår ajax med jquery
    return $.ajax({
        //Sætter url på vare der skal slettes hvor id bindes på url for at tilgå varen der skal slettes på basis af id
        url: 'http://www.service.bsuv.dk/api/varelager/' + id,
        //Sætter datatypen på data der slettes fra serveren
        dataType: 'json',
        //Sætter eksekveringsmetoden, som i dette tilfælde er en delete
        method: 'DELETE',
        //Sætter metode der skal eksekveres hvis eksekvering mod serveren har været successfuld. Ved success genindlæses delete siden i indholdscontainerkonrad
        success: function () {
            $("#indholdsContainer").load("../Partials/delete.html");
        },
        //Sætter metode der skal eksekveres hvis eksekvering mod serveren ikke har været successfuld. Denne metode modtager data fra eksekvering, og status på eksekveringen samt XMLHttpRequest (Objektet der bruges til udveksling af data med webserver)
        error: function (data, status, xhr) {
             //Hvis eksekvering ikke har været successfuld printes objekter der kan fortælle noget om eksekveringen ud til konsollen
            console.log(data);
            console.log(status);
            console.log(xhr);
            //Der printes også en fejl ud til den stakkels bruger der ikke kan forstå hvorfor varer ikke slettes
            alert("Der opstod en fejl ved kontakt til serveren");
        }
    });
}
//Laver metode til at lave ajaxkald for at opdatere varer, som modtager formdata der skal opdateres med og id på vare der skal opdateres
function UpdateVare(formData, id) {
        //Tilgår ajax med jquery
    $.ajax({
        //Sætter url på vare der skal opdateres hvor id bindes på url for at tilgå varen der skal opdateres på basis af id
        url: 'http://www.service.bsuv.dk/api/varelager/' + id,
        //Sætter datatypen på data opdateres mod serveren
        dataType: "json",
        //Sætter data der skal eksekveres op imod serveren
        data: formData,
        //Sætter content type med tegnsæt indkodning for formdata
        contentType: "application/json; charset=utf-8",
        //Sætter eksekveringsmetoden, som i dette tilfælde er put (opdater)
        method: "PUT",
        //Sætter metode der skal eksekveres når eksekvering er færdig. Denne metode modtager data fra eksekvering, og status på eksekveringen samt XMLHttpRequest (Objektet der bruges til udveksling af data med webserver)
        complete: function (data, status, xhr) {
            if (data.status == 200) {
                 //hvis status på data er 200 har eksekvering været successfuld og der navigeres til index hvor den opdaterede vare kan observeres
                window.location.href = 'index.html';
            }
            else {
                //Hvis status på data ikke er 200 har der været et problem ved eksekvering, og objekter der kan fortælle noget om eksekveringen printes ud til konsollen
                console.log(data);
                console.log(status);
                console.log(xhr);
                //Der printes også en fejl ud til den stakkels bruger der opdatere data uden resultat
                alert("Der opstod en fejl ved kontakt til serveren");
            }
        }
    });
}