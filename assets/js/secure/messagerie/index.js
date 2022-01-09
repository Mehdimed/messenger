import '../../../css/secure/messagerie/index.scss';

import $ from 'jquery';

/**
  * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
  * 
  * @param {String} text The text to be rendered.
  * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
  * 
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
  */
 function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  
  function getCssStyle(element, prop) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
  }
  
  function getCanvasFontSize(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
    
    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

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
    $('#text-message').on('input', function(){
        this.style.width = getTextWidth($(this).val(), "normal 16px Roboto") + 'px';

        console.log('container : ', $('#text-container').width())
        console.log('texte : ', getTextWidth($(this).val(), "normal 16px Roboto"))

        if(getTextWidth($(this).val()) > ($('#text-container').width() - 3) * 3){
            $('#text-message').width($('#text-container').width())
            $('#text-container').height(120)
            $('#text-message').height(120)
        }else if(getTextWidth($(this).val()) > ($('#text-container').width() - 2) * 2){
            $('#text-message').width($('#text-container').width())
            $('#text-container').height(90)
            $('#text-message').height(90)
        }else if(getTextWidth($(this).val()) > ($('#text-container').width())){
            $('#text-message').width($('#text-container').width())
            $('#text-container').height(60)
            $('#text-message').height(60)
        }else if(getTextWidth($(this).val()) < ($('#text-container').width())){
            this.style.width = (getTextWidth($(this).val(), "normal 16px Roboto") + 10) + 'px';
            $('#text-container').height(30)
            $('#text-message').height(30)
        }

        if(getTextWidth($(this).val()) > ($('#text-container').width() - 4) * 4){
            this.style.overflowY = 'visible';
        }else{
            this.style.overflowY = 'hidden';
        }
    })
   
    


    $('#add-message').on('submit' , function (e) {
        e.preventDefault();
        
        $.post(ajoutMessageUrl, $('#add-message').serialize())
            .done((resp) => {
                
            })
            .fail(err => console.log(err))

        $('#text-message').val('')
    })

})
