(function ($) {
    // current date for user
    $('#currentDay').text(dayjs().format('MMMM DD YYYY'));
    // current time (footer)
    let updateTime = () => {
      $('#currentTime').text(dayjs().format('HH:mm'));
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
        blocks.push(dayjs().hour(i).format('HH:00'));
      }
      let today = dayjs().format('MMMM DD YYYY');
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
                  <i class="fa-regular fa-circle-xmark"></i>
                </button>
              </div>
          </div>`
        );
        }
         // save button/
        $('#container').append(
                `<div class="row ultimate-buttons-wrapper d-flex justify-content-end align-items-center border-0">
                  <button id="ultimate-save" class="btn btn-outline-primary rounded-0 text-uppercase mr-2">Save</button>
                  <button id="ultimate-clear" class="btn btn-outline-secondary rounded-0 text-uppercase">Clear</button>
                </div>`
              );
        }
    renderBlocks();

// SAVE callback
    function saveTask() {
        let icon = $(this).children('i');
        // animate icon
        icon.removeClass('fa-plus').addClass('fa-check saved');
        let i = $(this).data('index');
        let task = $(`textarea[data-index=${i}]`).val();
        
        saveToLocal(i, task);
// return icon to default
        setTimeout(() => {
            icon.removeClass('fa-check saved').addClass('fa-plus');
            }, 1000);
        }
// save to Local for event listeners
    function saveToLocal(i, task) {
        let date = dayjs().format('HH:00 DD/MM/YY');
// create new object if doesn't exist...
        if (!taskData[i]) {
          taskData[i] = {
            blockTime: blocks[i],
            task: task,
            date: date,
          };
// otherwise update values in the object
        } else {
          taskData[i].blockTime = blocks[i];
          taskData[i].task = task;
          taskData[i].date = date;
        }
        localStorage.setItem('taskData', JSON.stringify(taskData));
        }

    // chain event listeners
    $('#container')
    .on('click', '.save-button', saveTask)
    .on('keyup', 'textarea.daily-task', function (e) {
    // on pressing enter from input, call function passing 'this' arguments
        if (e.which === 13 && !e.shiftKey) {
         e.stopPropagation();
         e.preventDefault();
     // unfocus input
        $(this).blur();
        saveTask.call(this);
        }
    })
    .on('click', '.clear-button', function () {
        let i = $(this).data('index');
        let icon = $(this).children('i');
    // animate icon
        icon.removeClass('fa-circle-xmark').addClass('fa-check saved');
        $(`textarea[data-index=${i}]`).val('');
        let task = '';
        saveToLocal(i, task);
        setTimeout(() => {
        icon.removeClass('fa-check saved').addClass('fa-circle-xmark');
        }, 1000);
    });

// save
    $('main').on('click', '#ultimate-save', function () {
        let saveAllBtn = $('#ultimate-save');
        saveAllBtn.prop('disabled', true).text('Wait...');
        $('textarea.daily-task').each(function () {
        let i = $(this).data('index');
        let task = $(this).val();
        saveToLocal(i, task);
        });
        setTimeout(() => {
         saveAllBtn.text('Saved!');
         setTimeout(() => {
         saveAllBtn.prop('disabled', false).text('Save');
         }, 250);
        }, 500);
    });

// clear
    $('#ultimate-clear').on('click', function () {
 // create the dialog
        $('main').append(
        `<div id="confirm-delete"><p>Are you sure you want to delete all tasks?</p></div>`
        );
 // jQuery dialog
        $('#confirm-delete').dialog({
            resizable: false,
            height: 'auto',
            width: 400,
            modal: true,
            buttons: {
        'Delete all tasks': function () {
            localStorage.removeItem('taskData');
            $('textarea').val('');
            $(this).dialog('close').remove();
        },
        Cancel: function () {
            $(this).dialog('close').remove();
        },
        },
        });
    });

    // Colorise function
    function colorise() {
      let now = dayjs().hour(); // Get the current hour
      $('.daily-task').each(function () {
          let index = $(this).data('index');
          let blockHour = parseInt(blocks[index].substr(0, 2)); // Get the hour from the block time
          let row = $(this).closest('.row');
          row.removeClass(['past', 'present', 'future']);
          if (blockHour < now) {
              row.addClass('past');
          } else if (blockHour === now) {
              row.addClass('present').css({
                  'background-color': 'green',
                  'color': 'white'
              });
          } else {
              row.addClass('future');
          }
      });
  }

  // Call colorise function initially
  colorise();

  // Set interval to update colors every hour

// main section height
    let height = () => {
        $('main').css({
            'min-height': `calc( 100vh - ${
            $('header').outerHeight() + $('footer').outerHeight(true)
              }px )`,
             });
            };
            height();
        
     window.onresize = function () {
            height();
            };

    function init() {
        var localJson = localStorage.getItem("taskData")
        var data = JSON.parse(localJson)
        console.log(data)
        //for loop below
        var eightInput = $("[data-index='0']")
        eightInput.val(data[0].task)
    }
    init();
})(jQuery);