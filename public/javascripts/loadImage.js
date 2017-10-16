$(window).load(function() {

    $(function() {
        fileOnload();

        function fileOnload() {
            var result = 'http://localhost:3000/images/proyectos/slide3.jpg';
            // 1920x1250

              $("#imageSlide").attr("width", "1920");
              $("#imageSlide").attr("heigth", "1250");
            $('#imageSlide').attr("src", result);
        }
    });
});

// $(document).ready(function() {
//     $('#imageSlide').css({ 'width':'1920px', 'height':'1250px' });
// });
