$(function(){ 
  var buildHTML = function(message) {
   if (message.content && message.image ) {
     var html =
      `<div class="chat-main__message__box" data-message-id=${message.id} >
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
         <img src="` + message.image + `" class="lower-message__image" >
      </div>` 
   } else if (message.content) {
     var html =
     `<div class="chat-main__message__box" data-message-id=${message.id} >
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
   } else if (message.image) {
    var html =
    `<div class="chat-main__message__box" data-message-id=${message.id} >
        <div class="chat-main__message__box__in">
          <p class="chat-main__message__box__in--name">
           ${message.user_name}
          </p>
          <p class="chat-main__message__box__in--date">
            ${message.created_at}
          </p>
        </div>
        <img src="` + message.image + `" class="lower-message__image" >
      </div>` 
     }; 
    return html;
  };
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
    $('.form__new-submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
});

  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message').append(insertHTML);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});