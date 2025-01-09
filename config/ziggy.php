<?php

return [
    'groups' => [
        'admin' => [
            'management.admin.*',
            'admin.*',
            'management.profile.*',
        ],
        'user' => [
            'user.*',
            'management.user.*',
            'management.profile.*',
        ],
    ],
]; 