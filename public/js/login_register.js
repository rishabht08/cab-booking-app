$('document').ready(function(){

  /*  $('#login-form').on('submit',function(event){

        event.preventDefault();

        var form = $(this);

        var email = $('#login-email').val().trim();

        var password = $('#login-password').val().trim() ;

        console.log(email,password);

        if(email!=="" && password!==""){
            $.ajax({
                
                url:"/login",
                method:"POST",
                data:{email:email, password:password},
                success:function(response){

                        $('span').text("");
                        if(response.status==401){
                        $('<span/>').text(response.message).css("color","red").appendTo($('#login-form'));
                        }
                        
                        {
                            
                            console.log(response.message);

                        }
                    //$('#SuccessMsg').html(msg);
                    },
                error: function(error){
                    console.log(error);
                }
                    
                    
                


        })
    }
}) */


   /* $('#signup-form').on('submit',function(event){

        event.preventDefault();

        var form = $(this);

        $('span').text("");

        var name = $('#signup-name').val().trim();

        var email = $('#signup-email').val().trim();

        var password = $('#signup-password').val().trim();

        var phonenumber = $('#signup-phonenumber').val().trim();

        console.log(name,email,password, phonenumber);

        
            $.ajax({
                
                url:"/signup",
                method:"POST",
                data:{name:name,email:email, password:password, phonenumber:phonenumber},
                success:function(response){

                    if(response.status==200){



                    }

                    else{
                            
                            $('<span/>').text(response.data.message).css("color","red").appendTo($('#signup-form'));
                    }
                }
                    //$('#SuccessMsg').html(msg);
                    
                    

        })
    

}) */

})