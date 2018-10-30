 $(document).ready(function(){
  
    
    $('.menu_icon').click(function() {
       $(this).siblings("nav").toggleClass('active-menu');
       $(this).toggleClass('active'); 
    });          
    
     
});