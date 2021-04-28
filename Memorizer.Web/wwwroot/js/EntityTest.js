var Entities = { 
    Data: EntityData,
    Order: [],
    Current: 0,
    ReversAccotiation: EntityRevers,
    ValueTag: $('#value'),
    Value: function() {
        return this.Data[this.Order[this.Current]].key;
    },
    Accociation: function() {
        return this.Data[this.Order[this.Current]].value;
    },
    Question: function() {
        return this.ReversAccotiation?this.Accociation():this.Value();
    },
    Answer: function() {
        return this.ReversAccotiation?this.Value():this.Accociation();
    },
    Shufle: function() {
        this.Order = new Array(Entities.Data.length);
        for (var i=0; i<this.Order.length; i++) this.Order[i] = i;
        for (var i = this.Order.length-1; i>0; i--)
        {
            var index = Math.floor(Math.random()*i);
            var buff = this.Order[i];
            this.Order[i] = this.Order[index];
            this.Order[index] = buff;
        }
        this.Current = 0;
    },
    MoveFromTop:function() {
        if (this.Current == this.Order.length - 1) return;
        var number = this.Order.length - this.Current-1;
        var random = Math.floor(number*Math.random()+this.Current+1);
        var buff = this.Order[this.Current];
        this.Order[this.Current] = this.Order[random];
        this.Order[random] = buff;
    },
    Move: function() {
        this.Current+=1;
        return this.Current<this.Order.length;
    }
};

$(document).ready(function(){
    StartTest(EntityRevers);  

    $('#next').bind('click', function(){
        if (Entities.Move()){
            Entities.ValueTag.text(Entities.Question());
        }
        else {
            $('#test').hide();
            $('#outTest').show();
        }
        
    });

    $('#show').bind('click', function() {
        ShowRetryButton();
        Entities.ValueTag.text(Entities.Answer());
    });

    $('#retry').bind('click', function() {
        HideRetryButton();
        Entities.MoveFromTop();
        Entities.ValueTag.text(Entities.Question());
    });

    $('#singleTest').bind('click', function() { StartTest(false); });
    $('#reversTest').bind('click', function() { StartTest(true); });

    function StartTest(revers) {
        Entities.ReversAccotiation = revers;
        Entities.Shufle();
        Entities.ValueTag.text (Entities.Question());
        $('#test').show();
        $('#outTest').hide();
        $('#show').show();
        $('#retry').hide();
    };

    function ShowRetryButton() {
        $('#show').hide();
        $('#retry').show();
    }

    function HideRetryButton() {
        $('#show').show();
        $('#retry').hide();
    }
});
