import $ from 'jquery';
import '../../../css/secure/messagerie/index.scss';
import { calculInputSize } from '../../utils/getTextWidth.js';



$(window).on('load', function(){
    // gestion de la taille du textarea en fonction du texte
    $('#text-message').on('input', calculInputSize)
    document.querySelector('#text-message').addEventListener('keyup', function(e){
        e.key == 'Enter' ? $('#add-message').trigger('submit') : null
    })

    let currentConversationId, conversationUrl, ajoutMessageUrl;

    // selection d'une conversation

    function displayConversation(conversation){

        document.querySelector('#messages').innerHTML = ''

        $('#titre-conversation').text(conversation.titre)

        $('#add-message').css('display', 'flex')

        conversation.messages.forEach(message => {
            document.querySelector('#messages').insertAdjacentHTML('beforeend',`<div class="message ${usernameUser == message.emetteur.username ? 'right' : 'left'}">${message.message}</div>`)
        });

        $('#messages').animate({
            scrollTop: $('#messages').prop('scrollHeight')
        })
    }
    
    $('.conversation-card').on('click', function() {

        currentConversationId = $(this).data('conversation-id')
        conversationUrl = $(this).data('url')
        ajoutMessageUrl = $(this).data('url-message')

        $.get(conversationUrl)
            .done((resp) => {
                displayConversation(resp)
            })
            .fail(err => console.log(err))
    })


    

    
   
    


    // ajout de message
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
