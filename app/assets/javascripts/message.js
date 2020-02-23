$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message__box" data-message-id=${message.id}>
        <div class="chat-main__message__box__in">
          <p class="chat-main__message__box__in--name">
            ${message.user_name}
          </p>
          <p class="chat-main__message__box__in--date">
            ${message.created_at}
          </p>
        </div>
        <div class="message-text">
          <p class="chat-main__message__box--text">
            ${message.content}
          </p>
        </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message__box" data-message-id=${message.id}>
        <div class="chat-main__message__box__in">
         <p class="chat-main__message__box__in--name">
           ${message.user_name}
         </p>
         <p class="chat-main__message__box__in--date">
           ${message.created_at}
         </p>
        </div>
        <div class="message-text">
         <p class="chat-main__message__box--text">
           ${message.content}
         </p>
        </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message').append(html);      
    $('form')[0].reset();
    $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
  })
})
});