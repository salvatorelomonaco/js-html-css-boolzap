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
    }
}
