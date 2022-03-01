
       $(document).ready(function () {
           $.CityID = $("#City").val();
           GetirIlceler($.CityID);
           $("#City").change(function () {
               $.CityID = $(this).val();
               GetirIlceler($.CityID);


           });
       });
function GetirIlceler(CityID) {
    $("#County").empty();
    $.ajax({
        type: "POST",
        url: '@Url.Action("GetirIlceler", "AdvertTransaction")',
        data: { CityID: $.CityID },
        dataType: "json",
        success: function (CountyList) {
            $("#County").append("<option value=" + -1 + ">" + 'İlçe Seçiniz' + "</option>");
            $.each(CountyList, function (index, ilce) {
                $("#County").append("<option value=" + ilce.CountyID + ">" + ilce.CountyName + "</option>");
            });
        }


    });

}


    $(document).ready(function () {
        $.CountyID = $("#County").val();
        GetirSemtler($.CountyID);
        $("#County").change(function () {
            $.CountyID = $(this).val();
            GetirSemtler($.CountyID);


        });
    });
function GetirSemtler(CountyID) {
    $("#Semt").empty();
    $.ajax({
        type: "POST",
        url: '@Url.Action("GetirSemtler", "AdvertTransaction")',
        data: { CountyID: $.CountyID },
        dataType: "json",
        success: function (SemtList) {
            $("#Semt").append("<option value=" + -1 + ">" + 'Semt Seçiniz' + "</option>");
            $.each(SemtList, function (index, semt) {
                $("#Semt").append("<option value=" + semt.CountyID + ">" + semt.CountyName + "</option>");
            });
        }


    });

}


    $(document).ready(function () {
        $.SemtID = $("#Semt").val();
        GetirMahalleler($.SemtID);
        $("#Semt").change(function () {
            $.SemtID = $(this).val();
            GetirMahalleler($.SemtID);


        });
    });
function GetirMahalleler(SemtID) {
    $("#Quarter").empty();
    $.ajax({
        type: "POST",
        url: '@Url.Action("GetirMahalleler", "AdvertTransaction")',
        data: { SemtID: $.SemtID },
        dataType: "json",
        success: function (MahalleList) {
            $("#Quarter").append("<option value=" + -1 + ">" + 'Mahale Seçiniz' + "</option>");
            $.each(MahalleList, function (index, Mah) {
                $("#Quarter").append("<option value=" + Mah.CountyID + ">" + Mah.CountyName + "</option>");
            });
        }


    });

}


   

