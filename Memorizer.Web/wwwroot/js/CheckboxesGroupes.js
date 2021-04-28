$(document).ready(function () {
    //help functions
    function zeroDisabled(groupe, option){
        $('[data-grope-enebled=' + groupe + ']').prop('disabled', option);  
        $('[data-grope-disabled=' + groupe + ']').prop('disabled', !option);
    }
    
    //PREPARE ELEMENTS
    $('[data-grope-enebled]').prop('disabled', true);
    
    //BIND checkbox event
    $('input[data-group]').bind('change', function () {
        var groupName = $(this).attr('data-group');
        //alert($('input[data-group=' + groupName + ']').length);
        if ($('input:checked[data-group=' + groupName + ']').length > 0) {           
            $('input[data-group-main=' + groupName + ']').closest('.checkbox').addClass('checked');
            $('input[data-group-main=' + groupName + ']').prop('checked', true);
            zeroDisabled(groupName, false);           
        } else {           
            $('input[data-group-main=' + groupName + ']').closest('.checkbox').removeClass('checked');
            $('input[data-group-main=' + groupName + ']').prop('checked', false);
            zeroDisabled(groupName, true);
        }
    });
    
    //BIND MAIN checkbox event
    $('input[data-group-main]').bind('change', function (){
        var groupName = $(this).attr('data-group-main');
        var checked = $(this).prop('checked');
        $('input[data-group=' + groupName + ']').prop('checked', checked);
        if (checked) {
            $('input[data-group=' + groupName + ']').closest('.checkbox').addClass('checked');
            zeroDisabled(groupName, false);
        }
        else{
            $('input[data-group=' + groupName + ']').closest('.checkbox').removeClass('checked');
            zeroDisabled(groupName, true);
        }
    });
    
});