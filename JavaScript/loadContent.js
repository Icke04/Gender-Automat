$(document).ready(function(){
    $('#content').load('./start.html');
    $('#gender').removeClass('active');
    $('#home').addClass('active');

    $('#home').click(function(){
        $('#content').empty();
        $('#content').load('./start.html');
        $('#gender').removeClass('active');
        $('#home').addClass('active');
    });

    $('#gender').click(function(){
        $('#content').empty();
        $('#content').load('./gender.html');
        $('#home').removeClass('active');
        $('#gender').addClass('active');
    });

    $('#imprint').click(function(){
        $('#content').empty();
        $('#content').load('./imprint.html');
        $('#home').removeClass('active');
        $('#gender').removeClass('active');
    });

    $('#privacy').click(function(){
        $('#content').empty();
        $('#content').load('./privacy.html');
        $('#home').removeClass('active');
        $('#gender').removeClass('active');
    });

    $('#cookies').click(function(){
        $('#content').empty();
        $('#content').load('./cookies.html');
        $('#home').removeClass('active');
        $('#gender').removeClass('active');
    });

    $('#termsofuse').click(function(){
        $('#content').empty();
        $('#content').load('./termsofuse.html');
        $('#home').removeClass('active');
        $('#gender').removeClass('active');
    });
});