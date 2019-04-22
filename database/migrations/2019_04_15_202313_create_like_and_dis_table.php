<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLikeAndDisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('like_and_dis', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_author');
            $table->integer('id_repos');
            $table->integer('like')->nullable();
            $table->integer('deslike')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('like_and_dis');
    }
}
