$(document).ready(() => {
  $('#btnAjax').click(calc);
});

async function calc() {
  let id = $('#id').val();

  let data = await fetch(`/getPerson/${id}`, {
    method: 'GET',
  });
  let result = await data.json();
  $('#spnResult').text(
    `The person id is ${result.id} .`,
  );
}

// source: http://jsfiddle.net/9TP3e/
$('#id').on('keydown keyup', function(e){
    if ($(this).val() > 13 
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
    ){
        e.preventDefault();
        $(this).val(13);
        $(this).addClass('maxQuantity').focus();
    } else{
        $(this).removeClass("maxQuantity");
        $(this).attr("placeholder", "0");    
    }
});

