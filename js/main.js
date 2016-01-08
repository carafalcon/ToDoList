$(document).ready(function() {
    var openList = $('#open-list');
    var completedList = $('#completed-list');
    var openItem = $('#open-item');
    var warning = $('.warning');
    var removeItem = $('.glyphicon-remove-circle');
    
    // Function to Count Checked items
    var countCompleted = function() {
        var n = $("input:checked").length;
        $('#count-completed').text(n);
    };
    
    // Function to Count Unchecked items
    var countOpen = function() {
        var n = $("input[type=checkbox]").length - $("input:checked").length;
        $('#count-open').text(n);
    };
    
    countCompleted();
    countOpen();
    
    // Add item to Open Items list
    openItem.keypress(function(event) {
        if (event.which == 13) {
            warning.empty();
            warning.removeClass('warning-style');
            
            if (!openItem.val() || openItem.val()==" ") {
                warning.addClass('warning-style');
                warning.append(' <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp; Please enter some text.');
                openItem.val('');
            } else {
                event.preventDefault();
                openList.append('<label class="list-item" id="item1"><input type="checkbox"><span>' + openItem.val() + '</span><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span><br></label>');
                
                openItem.val('');
                countOpen();
            }
        }
    });
    
    // Add checked item to completed list
    $(document).on('change', '.list-item', function() {

        completedList.append('<label class="completed-item"><input type="checkbox" checked><span>' + $(this).text() + '</span><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span><br></label>');
        
        $(this).remove();
    });
    
    // Add unchecked item to open list
    $(document).on('change', '.completed-item', function() {

        openList.append('<label class="list-item"><input type="checkbox"><span>' + $(this).text() + '</span><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span><br></label>');

        $(this).remove();
    });
    
     // Delete item
    $(document).on('click', 'span.glyphicon-remove-circle',function() {
        $(this).parents()[0].remove(); /* remove item */
        
        countCompleted();
        countOpen();
    });
    
    // Count Completed items
    $(document).on('change', 'input[type=checkbox]', countCompleted);
    
    // Count Open items
    $(document).on('change', 'input[type=checkbox]', countOpen);
    
   
});