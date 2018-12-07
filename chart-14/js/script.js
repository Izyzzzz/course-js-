$(document).ready(function() {

    $('.main_btna, .main_btn, .main_nav li:eq(1)').on('click', function() {
        $('.overlay').fadeIn('slow');
        $('.modal').slideDown('slow')
            .animate({
                width: '60%',
                margin: '5rem 20% 0 20%',
            }, 'slow')
            .animate({
                width: '40%',
                margin: '5rem 30% 0 30%',
            }, 'slow');
        $('.modal_contact')
            .animate({
                opacity: '0'
            })
            .animate({
                opacity: '1'
            }, {
                duration: 3000, 
                specialEasing: {
                    opacity: 'linear',
                    height: 'swing'
                }
            }
            );
    });
    $('.close').on('click', function(){
        $('.overlay').fadeOut('slow');
        $('.modal').slideUp('slow');
    });

    //Email

    $(".form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "server.php", 
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
                $(".form").find("input, textarea").val("");
                $('.overlay').fadeOut('slow');
                $('.modal').slideUp('slow');
			}, 1000);
		});
		return false;
	});
    
});