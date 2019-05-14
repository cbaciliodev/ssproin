var windowHeight = 0;

function screen(){
    windowHeight = $( document ).height() - 0;
    controlTop = $( '.maximize' ).offset();

    $( '.maximize' ).css( 'height', (windowHeight - controlTop.top ) + 'px' );
}

