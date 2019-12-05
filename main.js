$(document).ready(function() {

    for (var nomeConversazione in conversazioni) {

        var contenitoreMessaggi = $('.template .messages').clone();

        contenitoreMessaggi.attr('data-nome', nomeConversazione);

        var messaggi = conversazioni[nomeConversazione];

        for (var i = 0; i < messaggi.length; i++) {

            var singoloMessaggio = messaggi[i];

            var testo_messaggio = singoloMessaggio.testo;

            var direzioneMessaggio = singoloMessaggio.direzione;
            // creo una variabile per clonare il template del messaggio, cosi facendo vado a lavorare su quello specifico template
            var nuovoMessaggio = $('.template .message').clone();
            // con children selezione lo span con la classe .message-text e con .text vado a modificare il testo dello span sostuuendolo con la variabile testoMessaggio che leggerà dentro il mio valore del'input
            nuovoMessaggio.children('.message-text').text(testo_messaggio);
            // aggiungo la classe .sent che ha il float right, il background verde
            nuovoMessaggio.addClass(direzioneMessaggio);
            // aggiungo questo messaggio al suo container con la funzione append
            contenitoreMessaggi.append(nuovoMessaggio);
        }
        $('.message-container').append(contenitoreMessaggi);
    }


    // intercetto il click sulle chat
    $('.chat').click(function() {
        // rimuovo il mio layout
        $('.intro-layout').addClass('no-active');
    });

    // intercetto il click dell'icona di invio
    $('.text-area i:last-child').click(function() {
        // richiamo la funzione che ho creato
        inviaMessaggio();
    });

    // intercetto il clicci del pulsante invio grazie a keypress
    $('.message-user').keypress(function(event) {
        // il pulsante invia equivale a 13
        if(event.which == 13 ){
            inviaMessaggio();
        }
    });

    // cambio l'icona quando scrivo sull'input
    // seleziono l'input e per riconoscere che sto sctivendo uno keyup
    $('.message-user').keyup(function() {
        // rimuovo il microfono
        $('.text-area i:last-child').removeClass('fas fa-microphone');
        // aggiungo l'aeroplanino
        $('.text-area i:last-child').addClass('fas fa-paper-plane');
    });

    // viceversa quando io clicco su un'altra zona del documento che non è l'input selezionato
    $('.message-user').keyup(function(event) {
        if(event.which == 13 ){
            // rimuovo l'aeroplanino
            $('.text-area i:last-child').removeClass('fas fa-paper-plane');
            // aggiungo il microfono
            $('.text-area i:last-child').addClass('fas fa-microphone');
        }
    });

    // ora riesco a visualizzare il nome della conversazione che ho cercato
    $('.search').keyup(function() {
        // richiamo la funzione
        cercaConversazione();
    });

    // intercetto il click sulle chat a sinistra
    $('.chat').click(function() {
        // rimuovo la classe active, che mi evidenzia la chat attiva da tutte le chat
        $('.chat').removeClass('active');
        // e la vado ad aggiunge solamente a uella cliccata
        $(this).addClass('active');
        // creo una variabile dove vado a leggere dentro l'attributo data-nome dela mia cat selezionata
        var nomeChat = $(this).attr('data-nome');
        // dai container a destra rimuovo la classe active, che mi da il display block per visualizzare tutta la conversazione
        $('.messages').removeClass('active');
        // con un selettore seleziono il container che ha come data-nome la mia variabile della chat attiva e aggiungo la classe active per farla spuntare nello schermo
        $('.messages[data-nome="' + nomeChat + '"]').addClass('active');
        // cambio anche la parte alta dela chat con il nome e immagine
        // creo una variabile che mi va a leggere lo span che contine il nome dentro la chat
        var nomeContatto = $(this).find('span').text();
        // lo sostituisco al nome nell'header
        $('.current-chat span').text(nomeContatto);
        // stessa cosa con ll'immagine
        var immagineContatto = $(this).find('img').attr('src');
        // sostituisco l'immagine
        $('.header-right img').attr('src', immagineContatto);
    });
});

$(document).on('click','.message i', function () {
    $(this).next().toggleClass('active');
});

$(document).on('click', '.message-delete', function(){
    $(this).parents('.message').addClass('no-active');
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

        // setTimeout(function() {
        //     if ($('.messages').hasClass('active')) {
        //         $('.header-right').find('p').text('Online');
        //     } else {
        //         $('.header-right').find('p').text();
        //     }
        // }, 400)
        //
        // setTimeout(function() {
        //     if ($('.messages').hasClass('active')) {
        //         $('.header-right').find('p').text('Sta scrivendo...');
        //     } else {
        //         $('.header-right').find('p').text();
        //     }
        // }, 1000);

        // imposto un timeout per la risposta del computer;
        setTimeout(rispostaComputer, 2000);
        // quando io scrivo nela chat, la chat attiva si posizione nella prima posizione
        $('.chat.active').prependTo('.container-chat');
        // vado a trovare nelle chat il messaggio che io ho scritto e lo vado a sostituire nel p
        $('.chat.active .name-message').find('p').text(testoMessaggio);
        // vado a selezionare lo span del tempo nel mio template e gli scrivo il tempo reale
        nuovoMessaggio.children('.message-time').text(tempoReale());
        // riporto il tempo reale sulla chat a sinistra al mio invio del messaggio
        $('.chat.active .clock').text(tempoReale());
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
    // vado a riportare il messaggio di risposta del pc nella chat a sinistra
    $('.chat.active .name-message').find('p').text('Got it');
    // vado a selezionare lo span del tempo nel mio template e gli scrivo il tempo reale
    messaggioComputer.children('.message-time').text(tempoReale());
    // riporto il tempo reale sulla chat a sinistra all'invio del messaggio computer
    $('.chat.active .clock').text(tempoReale());
    $('.header-right').find('p').text('Online');
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
        $('.chat').show();
    }
}

// creo una funzione per andare a ricreare il tempo reale
function tempoReale() {
    // creo una var con new Date() assegnato
    var orarioMessaggio = new Date();
    // estraggo le ore e le converto in stringhe
    var ora = orarioMessaggio.getHours().toString();
    // estraggo i minuti, faccio quel passaggio per far si da riportare lo zero, in caso i minuti fossero minori di dieci
    var minuti = (orarioMessaggio.getMinutes() < 10 ? '0':'') + orarioMessaggio.getMinutes();
    // concateno le due variabili per riprodurre l'orario complessivo
    var oraMinuti = ora + "." + minuti;
    // chiudo la funzione con la variabile oraMinuti returnata
    return oraMinuti
}

var conversazioni = {
    'Vera': [
        {
            'testo':'You better step it up',
            'direzione':'received'
        }
    ],
    'Pino': [
        {
            'testo':'Ciao, sono Pino',
            'direzione':'received'
        }
    ],
    'Martino': [
        {
            'testo':'Ciao, sono Martino',
            'direzione':'received',
        }
    ],
    'Martina': [
        {
            'testo':'Ciao, sono Martina',
            'direzione':'received',
        }
    ],
    'Gina': [
        {
            'testo':'Ciao, sono Gina',
            'direzione':'received',
        }
    ],
    'Paolo': [
        {
            'testo':'Ciao, sono Paolo',
            'direzione':'received',
        }
    ],
    'Antonio': [
        {
            'testo':'Ciao, sono Antonio',
            'direzione':'received',
        }
    ],
    'Peppino': [
        {
            'testo':'Ciao, sono Peppino',
            'direzione':'received',
        }
    ]
};
