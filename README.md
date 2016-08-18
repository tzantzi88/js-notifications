Tzantzi Js Notifications
===========================

Js-notifications is a simple plugin based on javascript for on-screen notifications.

Demo
----------------------------
http://tzantzi.com/notifications


Instalation
----------------------------
Package can be found on github https://github.com/tzantzi88/js-notifications

**Github**

git clone https://github.com/tzantzi88/js-notifications.git


**Bower**

bower install tzantzi-js-notifications


How to use
----------------------------
```
Default: showNotification();

All options enabled: showNotification('Centered Message', 'info', 'center');

<a href="#" onclick="showNotification(); return false;">Default: showNotification();</a>
```

Notification options
----------------------------

Message: "Whatever you want to display as a message" (defaults to 'Operation completed successfully')

Type: available options: 'success' / 'danger' / 'warning' / 'info' (defaults to 'success')

Message positioning: available options: 'bottom-right' / 'bottom-left' / 'top-right' / 'top-left' / 'center' (defaults to 'bottom-right')


Default options
----------------------------

var fade_time = 5000; -> Time in ms it takes the message to dissapear

var position = 'bottom-right'; -> Default message position

var default_type = 'success'; -> Default message type

var default_message = 'Operation completed successfully'; -> Default message


Recomandations
===========================

I personally would recommend to move these 2 variables in the header of your application so that you would be able to use notifications that are loaded before the plugin (for example session messages)

var messages = [];
var current_notifications = 0;