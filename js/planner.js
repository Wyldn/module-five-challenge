$(function () {
    // Function to generate time blocks and apply styles based on current time
    function generateTimeBlocks() {
      var currentHour = dayjs().hour();
      console.log(currentHour);
      var timeBlockContainer = $('#time-blocks');
  
      for (var i = 9; i <= 17; i++) {
        var displayHour = i;
        var displayPeriod = 'AM';
  
        if (i >= 12) {
          displayHour = i === 12 ? 12 : i - 12;
          displayPeriod = 'PM';
        }
  
        var timeBlock = $('<div>').attr('id', 'hour-' + i).addClass('row time-block');
        var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + displayPeriod);
        var descriptionTextarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
        var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');
  
        timeBlock.append(hourCol, descriptionTextarea, saveButton);
        timeBlockContainer.append(timeBlock);
  
        // Get user input saved in localStorage and set textarea values
        var savedEvent = localStorage.getItem('hour-' + i);
        if (savedEvent) {
          descriptionTextarea.val(savedEvent);
        }
      }
  
      // Color-code the time blocks based on current time
      $('#time-blocks .time-block').each(function() {
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
        if (blockHour < currentHour) {
          $(this).addClass('past');
        } else if (blockHour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }
      });
    }
  
    // Event listener for save button clicks
    $('#time-blocks').on('click', '.saveBtn', function() {
      var hourId = $(this).closest('.time-block').attr('id');
      var userInput = $(this).siblings('.description').val();
      localStorage.setItem(hourId, userInput);
    });
  
    // Display the current date in the header of the page
    var currentDay = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDay);
  
    // Call the function to generate time blocks
    generateTimeBlocks();
  });
  