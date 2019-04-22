/**
 * Created by Администратор on 13.04.2019.
 */
$( document ).ready(function() {
       $(document).on('click', '.like_repos', function(e) {
        var id = $(this).attr('data-id');
        var id_author = $(this).attr('data-id_author');
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        $(this).css({'color':'red'})
        $(this).fadeOut();
        setTimeout(function() { $('[data-id='+id+']').removeClass('hidden_dislike'); }, 400);

        $.ajax({
            /* the route pointing to the post function */
            url: '/postajax',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: {_token: CSRF_TOKEN, id: id, id_author: id_author, action: 'like'},
            dataType: 'JSON',
            /* remind that 'data' is the response of the AjaxController */
            success: function (data) {

            }
        });

    });
    $(document).on('click', '.dislike_repos', function(e) {
        var id = $(this).attr('data-id');
        var id_author = $(this).attr('data-id_author');
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        $(this).css({'color':'#3ea6ff'});
        $(this).fadeOut(300);
        $.ajax({
            /* the route pointing to the post function */
            url: '/postajax',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: {_token: CSRF_TOKEN, id: id, id_author: id_author, action: 'dislike'},
            dataType: 'JSON',
            /* remind that 'data' is the response of the AjaxController */
            success: function (data) {
                console.log(data);
            }
        });

    });

    $(document).on('click', '.come_in', function(e) {
        var login = $('#login').val();
        var password = $('#password').val();
        var html = '<div class="alert alert-danger" role="alert">Заполните все поля</div>';
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        if(login == '' || password == '')
        {
            if(login == '')
            {
                $('#login').removeClass('success_input');
                $('#login').addClass('error_input');
            }
            else
            {
                $('#login').removeClass('error_input');
                $('#login').addClass('success_input');
            }
            if(password == '')
            {
                $('#login').removeClass('success_input');
                $('#password').addClass('error_input');
            }
            else
            {
                $('#password').removeClass('error_input');
                $('#password').addClass('success_input');
            }
            $('.error_message').html(html);
        }
        else
        {
            $('#login').removeClass('error_input');
            $('#login').addClass('success_input');
            $('#password').removeClass('error_input');
            $('#password').addClass('success_input');
            $('.error_message').fadeOut(300);
            $('.loader').css({'display':'block'});

            $.ajax({
                /* the route pointing to the post function */
                url: '/postajax',
                type: 'POST',
                /* send the csrf-token and the input to the controller */
                data: {_token: CSRF_TOKEN, login:login, password:password, action: 'show_all'},
                dataType: 'JSON',
                /* remind that 'data' is the response of the AjaxController */
                success: function (data) {
                    if(data == 'Bad credentials')
                    {
                        $('.error_message').fadeIn(300);
                        html = '<div class="alert alert-danger" role="alert">'+data+'</div>';
                        $('.error_message').html(html);
                    }
                    else
                    {
                        $('.login_container').hide();
                        var html = '';
                        var answerAPI = data;
                        if(typeof answerAPI != 'undefined')
                        {
                            answerAPI.forEach(function(element) {
                                var desc = '';
                                var private = '';
                                if(element.description == null)
                                {
                                    desc = 'Нету описания';
                                }
                                else
                                {
                                    desc = element.description;
                                }
                                if(element.private == true)
                                {
                                    private = 'private';
                                }
                                else
                                {
                                    private = 'public';
                                }
                                html +='<div class="col-md-12 reposit_st '+ private+'">' +
                                    '<div class="author_info">' +
                                    '<img src="'+element.owner.avatar_url +'" alt="" class="avatar">' +
                                    '<h4 class="owner_name">'+element.owner.login+'</h4>' +
                                    '</div>' +
                                    '<h3 data-url_repo="'+element.url+'" class="repos_name">'+element.name+'</h3>' +
                                    '<span>'+ desc +'</span>';
                                if(element.like ==1 && element.deslike ==1)
                                {
                                    html += '</div>';
                                }
                                else if (element.like == 0)
                                {
                                    html += '<i class="fa fa-heart like_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                    html += '<i class="fa fa-thumbs-down dislike_repos hidden_dislike" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                    html += '</div>';
                                }
                                else if(element.like ==1 && element.deslike ==0)
                                {
                                    html += '<i class="fa fa-thumbs-down dislike_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                    html += '</div>';
                                }
                            });
                            if(answerAPI.length <= 0)
                                html = '<div class="null_array"><h2>Ничего не найдено!</h2> </div>';
                            $('.all_repos').html(html);
                            $('.body_all_repos').fadeIn(300);
                        }
                    }
                    $('.loader').css({'display':'none'});

                },
                error: function (error) {
                    console.log(error);
                }
            });
        }


    });

    $(document).on('click', '.search_repos', function(e) {
        // var user_name = $('.user_name').val();
        var search_word = $('.search_word').val();
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        if(search_word != '')
        {
            $('.loader').css({'display':'block'});
            $.ajax({
                /* the route pointing to the post function */
                url: '/postajax',
                type: 'POST',
                /* send the csrf-token and the input to the controller */
                data: {_token: CSRF_TOKEN, search_word: search_word, action: 'search'},
                dataType: 'JSON',
                /* remind that 'data' is the response of the AjaxController */
                success: function (data) {
                    $('.loader').css({'display':'none'});
                    console.log(data.items);
                    var html = '';
                    var answerAPI = data.items;
                    if(typeof answerAPI != 'undefined')
                    {
                        answerAPI.forEach(function(element) {
                            var desc = '';
                            var private = '';
                            if(element.description == null)
                            {
                                desc = 'Нету описания';
                            }
                            else
                            {
                                desc = element.description;
                            }
                            if(element.private == true)
                            {
                                private = 'private';
                            }
                            else
                            {
                                private = 'public';
                            }
                            html +='<div class="col-md-12 reposit_st '+ private+'">' +
                                '<div class="author_info">' +
                                '<img src="'+element.owner.avatar_url +'" alt="" class="avatar">' +
                                '<h4 class="owner_name">'+element.owner.login+'</h4>' +
                                '</div>' +
                                '<h3 data-url_repo="'+element.url+'" class="repos_name">'+element.name+'</h3>' +
                                '<span>'+ desc +'</span>';
                            if(element.like ==1 && element.deslike ==1)
                            {
                                html += '</div>';
                            }
                            else if (element.like == 0)
                            {
                                html += '<i class="fa fa-heart like_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                html += '<i class="fa fa-thumbs-down dislike_repos hidden_dislike" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                html += '</div>';
                            }
                            else if(element.like ==1 && element.deslike ==0)
                            {
                                html += '<i class="fa fa-thumbs-down dislike_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                                html += '</div>';
                            }

                        });
                        if(answerAPI.length <= 0)
                            html = '<div class="alert alert-danger" role="alert">Ничего не найдено!</div>';
                        $('.all_repos').html(html);
                    }
                }
            });
        }
        else
        {
            $('.search_word').addClass('error_input');
        }
    });

    $(document).on('click', '.show_all_repos', function(e) {
        $('.loader').css({'display':'block'});
        var cur_user = 'Lip4evskij';
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

        $.ajax({
            /* the route pointing to the post function */
            url: '/postajax',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: {_token: CSRF_TOKEN, cur_user:cur_user, action: 'show_all'},
            dataType: 'JSON',
            /* remind that 'data' is the response of the AjaxController */
            success: function (data) {
                $('.loader').css({'display':'none'});
                var html = '';
                var answerAPI = data;
                if(typeof answerAPI != 'undefined')
                {
                    answerAPI.forEach(function(element) {
                        var desc = '';
                        var private = '';
                        if(element.description == null)
                        {
                            desc = 'Нету описания';
                        }
                        else
                        {
                            desc = element.description;
                        }
                        if(element.private == true)
                        {
                            private = 'private';
                        }
                        else
                        {
                            private = 'public';
                        }
                        html +='<div class="col-md-12 reposit_st '+ private+'">' +
                            '<div class="author_info">' +
                            '<img src="'+element.owner.avatar_url +'" alt="" class="avatar">' +
                            '<h4 class="owner_name">'+element.owner.login+'</h4>' +
                            '</div>' +
                            '<h3 data-url_repo="'+element.url+'" class="repos_name">'+element.name+'</h3>' +
                            '<span>'+ desc +'</span>';
                        if(element.like ==1 && element.deslike ==1)
                        {
                            html += '</div>';
                        }
                        else if (element.like == 0)
                        {
                            html += '<i class="fa fa-heart like_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                            html += '<i class="fa fa-thumbs-down dislike_repos hidden_dislike" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                            html += '</div>';
                        }
                        else if(element.like ==1 && element.deslike ==0)
                        {
                            html += '<i class="fa fa-thumbs-down dislike_repos" data-id="'+element.id+'" data-id_author="'+element.owner.id+'"></i>';
                            html += '</div>';
                        }



                    });
                    if(answerAPI.length <= 0)
                        html = '<div class="alert alert-danger" role="alert">Ничего не найдено!</div>';
                    $('.all_repos').html(html);
                    $('.body_all_repos').fadeIn(300);
                }
            }
        });
    });

    $(document).on('click', '.repos_name', function(e) {
        $('.loader').css({'display':'block'});
        var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
        var url_value = $(this).attr('data-url_repo');
        $.ajax({
            /* the route pointing to the post function */
            url: '/postajax',
            type: 'POST',
            /* send the csrf-token and the input to the controller */
            data: {_token: CSRF_TOKEN,  url_value:url_value, action: 'show_one'},
            dataType: 'JSON',
            /* remind that 'data' is the response of the AjaxController */
            success: function (data) {
                $('.loader').css({'display':'none'});
                var html = '';
                var desc = '';
                var private = '';
                if(data.description == null)
                {
                    desc = 'Нету описания';
                }
                else
                {
                    desc = data.description;
                }
                if(data.private == true)
                {
                    private = 'private';
                }
                else
                {
                    private = 'public';
                }
                html +='<div class="col-md-12 reposit_st '+ private+'">' +
                    '<div class="author_info">' +
                    '<img src="'+data.owner.avatar_url +'" alt="" class="avatar">' +
                    '<h4>'+data.owner.login+'</h4>' +
                    '</div>' +
                    '<h3>'+data.name+'</h3>' +
                    '<span>'+ desc +'</span>'+
                    '<i class="fa fa-thumbs-down icon-down">'+data.count_deslike+'</i>'+
                    '<i class="fa fa-heart icon-heart">'+data.count_like+'</i>'+
                    '</div>';
                if(data.length <= 0)
                    html = '<div class="null_array"><h2>Ничего не найдено!</h2> </div>';
                $('.all_repos').html(html);
            }
        });

    });


});
