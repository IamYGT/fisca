<?php

return [
    'groups' => [
        'admin' => [
            'management.admin.*',
            'admin.*',
            'management.profile.*',
            'language.switch',
            'logout',
            'password.*',
        ],
        'user' => [
            'user.*',
            'management.user.*',
            'management.profile.*',
            'language.switch',
            'logout',
            'password.*',
        ],
        'guest' => [
            'password.*',
            'login',
            'register',
            'home',
            'front.*',
        ],
    ],
]; 