<?php

return [
    'groups' => [
        'admin' => [
            'management.admin.*',
            'admin.*',
        ],
        'user' => [
            'user.*',
            'management.user.*',
        ],
    ],
]; 