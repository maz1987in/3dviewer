<?php
return [
    'routes' => [
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'page#view', 'url' => '/view/{fileId}', 'verb' => 'GET'],
        ['name' => 'api#getModel', 'url' => '/api/model/{fileId}', 'verb' => 'GET'],
    ]
];