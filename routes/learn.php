<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('learn')->name('learn.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => Inertia::render('learn/index'))->name('index');
    Route::get('/setup', fn () => Inertia::render('learn/setup'))->name('setup');
    Route::get('/web-recap', fn () => Inertia::render('learn/web-recap'))->name('web-recap');
    Route::get('/mental-model', fn () => Inertia::render('learn/mental-model'))->name('mental-model');
    Route::get('/jsx-komponen', fn () => Inertia::render('learn/jsx-komponen'))->name('jsx-komponen');
    Route::get('/state', fn () => Inertia::render('learn/state'))->name('state');
    Route::get('/effect', fn () => Inertia::render('learn/effect'))->name('effect');
    Route::get('/list-form', fn () => Inertia::render('learn/list-form'))->name('list-form');
    Route::get('/task-manager', fn () => Inertia::render('learn/task-manager'))->name('task-manager');
});
