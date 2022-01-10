import $ from 'jquery';
import '../../../css/secure/messagerie/index.scss';
import { calculInputSize } from '../../utils/getTextWidth.js';

$(window).on('load', function(){
    let currentConversationId, conversationUrl, ajoutMessageUrl;

    $('.conversation-card').on('click', function() {

        currentConversationId = $(this).data('conversation-id')
        conversationUrl = $(this).data('url')
        ajoutMessageUrl = $(this).data('url-message')

        $.get(conversationUrl)
            .done((resp) => {
                console.log(resp)
            })
            .fail(err => console.log(err))
    })

    
    // gestion de la taille du textarea en fonction du texte
    $('#text-message').on('input', calculInputSize)

    
   
    


    $('#add-message').on('submit' , function (e) {
        e.preventDefault();

        if($('#text-message').val() == '') return;
        
        $.post(ajoutMessageUrl, $('#add-message').serialize())
            .done((resp) => {
                
            })
            .fail(err => console.log(err))

        $('#text-message').val('')
    })

})
