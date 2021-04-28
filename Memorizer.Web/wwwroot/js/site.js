

(function ($) {
    $(document).ready(function(){
        $('a.btn[role="delSubj"]').on('click', function() {
            $('#subjId').text($(this).attr('data-subj-name'));
            $('input[name="Id"]').attr('value', $(this).attr('data-subj-id'));
            $('#dellingForm').modal('show');
        })

        $('a.btn[role=delSet]').on('click', function(){
            $('#setText').text($(this).attr('data-set-name'));
            $('input[name="Id"]').attr('value', $(this).attr('data-set-id'));
            $('#dellingForm').modal('show');
        });

        $('a.btn[role=delEntity]').on('click', function(){
            var $data = JSON.parse($(this).attr('data-item-json'));
            $('#textEntity').text($data.Link + ' - ' + $data.Value);
            $('input[name="EntityId"]').attr('value', $data.Id);
            $('input[name="SetId"]').attr('value', $(this).attr('data-set-id'));
        });


        

    });
}(jQuery));