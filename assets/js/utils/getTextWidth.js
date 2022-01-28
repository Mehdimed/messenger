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

  export function calculInputSize(){
    this.style.width = getTextWidth($(this).val(), "normal 16px Roboto") + 'px';
    let margin = 0;

    if(getTextWidth($(this).val(), "normal 16px Roboto") > (($('#text-container').width() - 1) * 3) - margin){
        $('#text-message').width($('#text-container').width())
        $('#text-container').height(122)
        $('#text-message').height(120)
        $('#send-message').height(120)
        console.log('4eme ligne')
    }else if(getTextWidth($(this).val(), "normal 16px Roboto") > (($('#text-container').width()) * 2) - margin){
        $('#text-message').width($('#text-container').width())
        $('#text-container').height(92)
        $('#text-message').height(90)
        $('#send-message').height(90)
        console.log('3eme ligne')
    }else if(getTextWidth($(this).val(), "normal 16px Roboto") > ($('#text-container').width() - margin)){
        $('#text-message').width($('#text-container').width())
        $('#text-container').height(62)
        $('#text-message').height(60)
        $('#send-message').height(60)
        console.log('2eme ligne')
    }else if(getTextWidth($(this).val(), "normal 16px Roboto") < ($('#text-container').width())){
        this.style.width = (getTextWidth($(this).val(), "normal 16px Roboto") + 10) + 'px';
        $('#text-container').height(32)
        $('#text-message').height(30)
        $('#send-message').height(30)
    }

    if(getTextWidth($(this).val(), "normal 16px Roboto") > ($('#text-container').width()) * 4){
        this.style.overflowY = 'visible';
    }else{
        this.style.overflowY = 'hidden';
    }
}
  
  // console.log(getTextWidth("hello there!", "bold 12pt arial"));  // close to 86