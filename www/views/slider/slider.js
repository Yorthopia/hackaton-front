(function($){
  setInterval(function(){
    $(".slider ul li:first-child").animate({"margin-left": -350}, 800, function(){
        $(this).css("margin-left",0).appendTo(".slider ul");
    });
  }, 3500);
})(jQuery);