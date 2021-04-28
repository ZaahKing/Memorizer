Learning = {
    Data: EntityData,
    showBoth: false,
    Current: 0,
    Order: [],
    StartTest: function() {
        this.Current = 0;
        this.Order = new Array(this.Data.length);
        for (var i=0; i<this.Order.length; i++) this.Order[i] = i;
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
}


$(function() {
    function ShowBothToggle(state){
        Learning.showBoth = state;
        if (Learning.showBoth){
            $('#key').show();
            $('#value').show();
            $('#turnOver').hide();
            $('#bothSide').hide();
            $('#singleSide').show();
        }
        else {
            $('#key').show();
            $('#value').hide();
            $('#turnOver').show();
            $('#bothSide').show();
            $('#singleSide').hide();
        }
    }

    function PutDataInControls(){
        let index = Learning.Order[Learning.Current];
        $('#key').html(Learning.Data[index].key);
        $('#value').html(Learning.Data[index].value);
    }

    function StartTest(){
        Learning.StartTest();
        $('#learn').show();
        $('#outLearn').hide();
        ShowBothToggle(Learning.showBoth);
        ShowKey();
        PutDataInControls();
    }

    function ShowKey(){
        if (!Learning.showBoth){
            $('#key').show();
            $('#value').hide();
        }
    }

    function EndTest(){
        Learning.StartTest();
        $('#learn').hide();
        $('#outLearn').show();
    }

    StartTest();

    $('#learning').bind('click', function(){
        StartTest();
    });
    $('#bothSide').bind('click', function(){
        ShowBothToggle(true);
    });
    $('#singleSide').bind('click', function(){
        ShowBothToggle(false);
    });
    $('#turnOver').bind('click', function(){
        $('#key, #value').toggle(300);
    });
    $('#retry').bind('click', function() {
        Learning.MoveFromTop();
        PutDataInControls();
        ShowKey();
    });
    $('#next').bind('click', function(){
        if (Learning.Move()){
            PutDataInControls();
            ShowKey();
        }
        else {
            EndTest();
        }

    });
});
