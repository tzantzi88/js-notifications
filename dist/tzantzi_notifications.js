var messages = [];
var current_notifications = 0;
var fade_time = 3000;
var position = 'bottom-right';
var current_position = position;
var default_type = 'success';
var default_message = 'Operation completed successfully';
var positions = [];

/**
 *
 * @param message
 * @param message_type
 * @param message_position
 */
function showNotification(message, message_type, message_position){
    var type = default_type;
    var msg = default_message;
    if (message) { msg = message; }
    if (message_type) { type = message_type; }
    if (message_position) { current_position = message_position; }
    messages.push({ type: type, message: msg, position: current_position });
    showNotifications();
}

window.addEventListener('load',function(){
    showNotifications();
});

function showNotifications() {
    checkWrapper();
    if(typeof messages != 'undefined'){
        appendNotification();
    }
}
function checkWrapper(pos) {
    if (!pos) {
        pos = current_position;
        current_position = position;
    }

    if (positions.indexOf(pos) == -1 ) {
        document.body.innerHTML += '<div class="tzantzi_notifications ' + pos + '"><div class="tzantzi_notifications_wrapper"></div></div>';
        positions.push(pos);
    }
}
function appendNotification() {
    if (messages[0]) {
        current_notifications++;
        var type = 'info';
        if (messages[0].type) { type = messages[0].type }
        var notification = '';
        notification += '<div id="notif-' + current_notifications + '" class="tzantzi_item remove ' + type + '">';
        notification += '<span class="message">' + messages[0].message + '</span>';
        notification += '<span class="tzantzi_close_notification">&#x2716</span>';
        notification += '</div>';

        var wrapper = getMessageContainer();

        if (position.indexOf("top") != -1 || position.indexOf("center") != -1) {
            wrapper.innerHTML += notification;
        } else {
            wrapper.innerHTML = notification + wrapper.innerHTML;
        }

        animateNotification(current_notifications);
        messages.shift();

        if (messages.length) {
            appendNotification();
        }


        var element = document.querySelectorAll('.tzantzi_close_notification');

        for(var i=0;i<element.length;i++){
            element[i].addEventListener('click',function (e) {
                var id = this.parentNode.getAttribute('id').substr(6);
                removeNotification(id);
            },false);
        }
    }
}

function getMessageContainer() {
    checkWrapper(messages[0].position);

    var position_class = '';
    if (messages[0].position) {
        position_class = '.' + messages[0].position;
    }
    var container = document.querySelector(".tzantzi_notifications" + position_class);
    return container.childNodes[0];
}

function animateNotification(id) {
    if (id) {
        setTimeout(function () {
            document.getElementById('notif-' + id).className = document.getElementById('notif-' + id).className.replace(/\bremove\b/,'');
        }, 100);
        setTimeout(function () {
            removeNotification(id);
        }, fade_time);
    }
}
function removeNotification(id) {
    if (id) {
        var elem = document.getElementById('notif-' + id);
        if (elem != null) {
            elem.className += " remove";
        }
        setTimeout(function () {
            if (elem != null && elem.parentNode != null) {
                elem.parentNode.removeChild(elem);
            }
        }, 600);
    }
}