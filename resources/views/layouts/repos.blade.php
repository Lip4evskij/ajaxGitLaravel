@extends('layouts.app')

@section('title', 'репозетории')

@section('content')

    <div class="col-md-12 myheader">
        <input type="text" class="search_word">
        <button class="search_repos">Искать</button>
        <button class="show_all_repos">Показать все</button>
        <input type="hidden" class="user_name" value="{{$authorized_user}}">
        <input type="hidden" class="cur_user" value="{{$current_user}}">
    </div>

    <div class="loader">
        <img src="{{asset('img/loading.gif')}}" class="ajaxLoader">
    </div>
        <div class="all_repos">
         @foreach($repositories as $repos)
        <div class="col-md-12 reposit_st">
            <div class="author_info">
                <img src="{{$repos->owner->avatar_url}}" alt="" class="avatar">
                <h4>{{$repos->owner->login}}</h4>
            </div>
            <h3 data-url_repo="{{$repos->url}}" class="repos_name">{{$repos->name}}</h3>
            <span>@if($repos->description)
                    {{$repos->description}}
                  @else Нету описания! @endif
            </span>
            @if(isset($repos->deslike) && $repos->deslike !=1)
            <i class="fa fa-thumbs-down @if(isset($repos->like) && $repos->like !=1) lp_hidden active_deslike @endif dislike_repos" data-id="{{$repos->id}}" data-id_author="{{$current_user}}"></i>
            <i class="fa fa-heart like_repos @if(isset($repos->like) && $repos->like ==1) lp_hidden active_like @endif" data-id="{{$repos->id}}" data-id_author="{{$current_user}}"></i>
            @endif
        </div>
             <hr>
        @endforeach
        </div>

@endsection