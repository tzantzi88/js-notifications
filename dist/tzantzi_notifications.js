var messages = [],
    current_notifications = 0,
    fade_time = 3000,
    position = 'bottom-right',
    current_position = position,
    default_type = 'success',
    default_message = 'Operation completed successfully',
    positions = [];

/**
 *
 * @param message
 * @param message_type
 * @param message_position
 */
function tzShowNotification(message, message_type, message_position){
    var type = default_type;
    var msg = default_message;
    if (message) { msg = message; }
    if (message_type) { type = message_type; }
    if (message_position) { current_position = message_position; }
    messages.push({ type: type, message: msg, position: current_position });
    tzShowNotifications();
}

window.addEventListener('load',function(){
    tzShowNotifications();
});

function tzShowNotifications() {
    tzCheckWrapper();
    if(typeof messages != 'undefined'){
        tzAppendNotification();
    }
}
function tzCheckWrapper(pos) {
    if (!pos) {
        pos = current_position;
        current_position = position;
    }

    if (positions.indexOf(pos) == -1 ) {
        document.body.innerHTML += '<div class="tzantzi_notifications ' + pos + '"><div class="tzantzi_notifications_wrapper"></div></div>';
        positions.push(pos);
    }
}
function tzAppendNotification() {
    if (messages[0]) {
        current_notifications++;
        var type = 'info';
        if (messages[0].type) { type = messages[0].type }
        var notification = '';
        notification += '<div id="notif-' + current_notifications + '" class="tzantzi_item remove ' + type + '">';
        notification += '<span class="message">' + messages[0].message + '</span>';
        notification += '<span class="tzantzi_close_notification">&#x2716</span>';
        notification += '</div>';

        var wrapper = tzGetMessageContainer();

        if (position.indexOf("top") != -1 || position.indexOf("center") != -1) {
            wrapper.innerHTML += notification;
        } else {
            wrapper.innerHTML = notification + wrapper.innerHTML;
        }

        tzAnimateNotification(current_notifications);
        messages.shift();

        if (messages.length) {
            tzAppendNotification();
        }


        var element = document.querySelectorAll('.tzantzi_close_notification');

        for(var i=0;i<element.length;i++){
            element[i].addEventListener('click',function (e) {
                var id = this.parentNode.getAttribute('id').substr(6);
                tzRemoveNotification(id);
            },false);
        }
    }
}

function tzGetMessageContainer() {
    tzCheckWrapper(messages[0].position);

    var position_class = '';
    if (messages[0].position) {
        position_class = '.' + messages[0].position;
    }
    var container = document.querySelector(".tzantzi_notifications" + position_class);
    return container.childNodes[0];
}

function tzAnimateNotification(id) {
    if (id) {
        setTimeout(function () {
            document.getElementById('notif-' + id).className = document.getElementById('notif-' + id).className.replace(/\bremove\b/,'');
        }, 100);
        setTimeout(function () {
            tzRemoveNotification(id);
        }, fade_time);
    }
}
function tzRemoveNotification(id) {
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