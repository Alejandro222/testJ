// alert('ff');
$(window).load(function() {

    $(function() {
        //   $('#file-input').change(function(e) {
        //       addImage(e); 
        //      });

        //      function addImage(e){
        //       var file = e.target.files[0],
        //       imageType = /image.*/;

        //       if (!file.type.match(imageType))
        //        return;

        //       var reader = new FileReader();
        //       reader.onload = fileOnload;
        //       reader.readAsDataURL(file);
        //      }
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