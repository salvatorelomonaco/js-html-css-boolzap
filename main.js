$(document).ready(function() {

    $('.chat').click(function() {
        $('.intro-layout').addClass('no-active');
    });

    // intercetto il click dell'icona di invio
    $('.text-area i:last-child').click(function() {
        // richiamo la funzione che ho creato
        inviaMessaggio();
    })

    // intercetto il clicci del pulsante invio grazie a keypress
    $('.message-user').keypress(function(event) {
        // il pulsante invia equivale a 13
        if(event.which == 13 ){
            inviaMessaggio();
        }
    })

    // cambio l'icona quando clicco sull'input
    // seleziono l'input e per riconoscere che è attivo uso .focus
    $('.message-user').focus(function() {
        // seleziono l'icona e faccio toggle classe con la classe dell'aeroplanino aggiunta
        $('.text-area i:last-child').toggleClass('fas fa-microphone fas fa-paper-plane')
    })

    // viceversa quando io clicco su un'altra zona del documento che non è l'input selezionato
    $('.message-user').blur(function() {
        $('.text-area i:last-child').toggleClass('fas fa-microphone fas fa-paper-plane')
    })

    // ora riesco a visualizzare il nome della conversazione che ho cercato
    $('.search').keyup(function() {
        // richiamo la funzione
        cercaConversazione();
    })

    $('.chat').click(function() {
        var nomeChat = $(this).find('span').text();
        $('.header-right').hide();
        $('.header-right[data-nome="' + nomeChat + '"]').show();
        $('.messages').removeClass('active');
        $('.messages[data-nome="' + nomeChat + '"]').addClass('active');
        $('.chat').removeClass('active');
        $(this).addClass('active');
    })


});

$(document).on('click','.message i', function () {
    $(this).next().toggleClass("active");
});

$(document).on("click", ".message-delete", function(){
    $(this).parents(".message").remove();
});

// creo una funzione per l'invio messaggio
function inviaMessaggio() {
    // creo una variabile per andare a leggere il contenuto della value del input, selezioni la classe di questo input e con .val(), vuoto all'interno mi permette di leggere quello che io scrivo
    var testoMessaggio = $('.message-user').val();
    // faccio un controllo per capire se la lunghezza di quello che sto scrivendo è diverso da zero, così cliccando sulla icona di invio non mi spunta nessuna casela del messaggio vuota
    // invece se la lunghezza è diversa da zero
    if (testoMessaggio.length != 0) {
        // creo una variabile per clonare il template del messaggio, cosi facendo vado a lavorare su quello specifico template
        var nuovoMessaggio = $('.template .message').clone();
        // con children selezione lo span con la classe .message-text e con .text vado a modificare il testo dello span sostuuendolo con la variabile testoMessaggio che leggerà dentro il mio valore del'input
        nuovoMessaggio.children('.message-text').text(testoMessaggio);
        // aggiungo la classe .sent che ha il float right, il background verde
        nuovoMessaggio.addClass('sent');
        // aggiungo questo messaggio al suo container con la funzione append
        $('.messages.active').append(nuovoMessaggio);
        // e infine vado a rempostare il valore del mio input con una stringa vuota
        $('.message-user').val('');

        setTimeout(rispostaComputer, 1000);
    }
}

// Creo una funzione per una risposta automatica del pc
function rispostaComputer() {
    // creo una variabile per il messaggio del pc e gli clono il template
    var messaggioComputer = $('.template .message').clone();
    // a questo vado a selezionare il figlio sotto .message, quelo con la classe .message-text e con la funzione .text scrivendo dentro imposto il messaggio
    messaggioComputer.children('.message-text').text('Got it');
    //aggiungo la classe .receive, con float left e background bianco alla classe .messagge
    messaggioComputer.addClass('received');
    // appendo il messaggio del pc sul container
    $('.messages.active').append(messaggioComputer);
}

// Creo una funzione per cercare le conversazioni
function cercaConversazione() {
    // leggo il contenuto dell'input con .val()
    var ricercaNome = $('.search').val();
    // se la barra di ricerca non è vuota
    if (ricercaNome.lenght != 0) {
        //controllo singolarmente le classi .chat
        $('.chat').each(function() {
            // creo una variabile e nella .chat presa singolarmente con this trovo lo span e leggo il suo contenuto con .text()
            var nome = $(this).find('span').text();
            // se la variabile nome è uguale alla variabile ricercaNome
            if (nome.toLowerCase().includes(ricercaNome.toLowerCase())) {
                // allora mostro solo quella chat
                $(this).show();
            } else {
                // altrimenti la nascondo
                $(this).hide();
            }
        });
    // altrimenti le la barra di ricerca è vuota
    } else {
        //mostro tutte le chat
        $('.chat').show()
    }
}
