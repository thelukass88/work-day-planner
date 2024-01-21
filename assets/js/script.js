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
    
    
    // get stored tasks
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
    // render blocks
    function renderBlocks() {
      for (let i = hours.start; i <= hours.end; i++) {
        blocks.push(moment().hour(i).format('HH:00'));
      }
      let today = moment().format('LL');
      for (let i = 0; i < blocks.length; i++) {
        $('#container').append(
          `<div class="row">
              <div class="hour col-2 d-flex justify-content-left align-items-center h-100">
                <span class="block-time" data-index="${i}">
                  ${blocks[i]}
                </span>
              </div>
              <div class="col-7 col-md-8 d-flex w-100 h-100 p-0">
                <textarea class="daily-task w-100 h-100" data-index="${i}">${
            taskData[i] && taskData[i].date === today ? taskData[i].task : ''
          }</textarea>
              </div>
              <div class="buttons-wrapper col-3 col-md-2 d-flex p-0 w-100 h-100">
                <button class="btn save-button d-flex align-items-center justify-content-center w-100 h-100" data-index="${i}">
                  <i class="fa-solid fa-plus"></i>
                </button>
                <button class="btn clear-button d-flex align-items-center justify-content-center w-100 h-100" data-index="${i}">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
          </div>`
        );
      }
    }
    renderBlocks();

    
})(jQuery);