(function ($) {
    // current date for user
    $('#currentDay').text(moment().format('LL'));
    // current time (footer)
    let updateTime = () => {
      $('#currentTime').text(moment().format('HH:mm'));
      // update hourly
      setInterval(updateTime, 60000);
    };
        setTimeout(updateTime, 0);
        // hours
        let blocks = [];
        let hours = {
          start: 08,
          end: 20,
        };
})(jQuery);