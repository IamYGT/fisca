<?php

return [
    'groups' => [
        'admin' => [
            'management.admin.*',
            'admin.*',
            'management.profile.*',
            'language.switch',
        ],
        'user' => [
            'user.*',
            'management.user.*',
            'management.profile.*',
            'language.switch',
        ],
    ],
]; 