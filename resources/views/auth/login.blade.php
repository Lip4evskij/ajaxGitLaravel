@extends('layouts.app')

@section('title', 'Авторизация')

@section('content')
    <div class="all_body">
    <div class="login_container">
         <div class="title m-b-md">
             gitHub
         </div>
        <div class="error_message">

        </div>
        <label for="login">Логиин</label>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="login" aria-describedby="basic-addon3">
        </div>
        <label for="password">Пароль</label>
        <div class="input-group mb-3">
            <input type="password" class="form-control" id="password" aria-describedby="basic-addon3">
        </div>
        <button type="button" class="btn btn-primary come_in">Войти</button>
    </div>
        <div class="body_all_repos">
            <div class="col-md-12 myheader">
                <input type="text" class="search_word">
                <button class="search_repos">Искать</button>
                <button class="show_all_repos">Показать все</button>
                <div class="col_and_text">
                   <span class="green_square"></span>
                    Публичный
                </div>
                <div class="col_and_text">
                    <span class="red_square"></span>
                    Приватный
                </div>
                {{--<input type="hidden" class="user_name" value="{{$authorized_user}}">--}}
                {{--<input type="hidden" class="cur_user" value="{{$current_user}}">--}}
            </div>
            <div class="all_repos"></div>
        </div>

    </div>
@endsection