$(document).ready(function () {
    window.testeView = new testeView();
    window.testeView.Carregar();
});

function testeView() {

    var self = this;

    self.ObterFilmes = function () {

        $('#dErro').hide();

        var filmesDoGeorgeLucas = [];

        $.ajax({
            url: "/home/Obterfilmes",
            Type: "GET",
            dataType: "json",
            contentType: "application/json",
            data: {},
            beforeSend: function () {
                $('#modalCarregando').modal('show');
            },
            complete: function () {
                $('#modalCarregando').modal('hide');
            },
            success: function (data) {

                var resultados = JSON.parse(data);   

                filmesDoGeorgeLucas = resultados.results.filter(function (index2) {
                    return index2.director === "George Lucas";
                });

                $.each(filmesDoGeorgeLucas, function (index, value) {

                    $("#filmes").append("<p> Título: " + value.title + "</p>");
                    $("#filmes").append("<p> Diretor: " + value.director + "</p>");
                    $("#filmes").append("<p> Produtor: " + value.producer + "</p>");

                    $("#filmes").append("<br>");

                });                
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }

                $('#pErro').html(msg);
                $('#dErro').show();
            }
        });
    };

    self.Carregar = function () {
        self.ObterFilmes();
    };

}