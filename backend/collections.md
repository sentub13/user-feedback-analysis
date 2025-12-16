{
    "info": {
        "name": "Post API Collection",
        "description": "Postman collection for managing Post resources in the application.",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Get All Posts",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/posts",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "posts"
                    ]
                }
            }
        },
        {
            "name": "Get Post By ID",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/posts/1",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "posts",
                        "1"
                    ]
                }
            }
        },
        {
            "name": "Create Post",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n  \"title\": \"New Post\",\n  \"content\": \"This is a new post.\"\n}"
                },
                "url": {
                    "raw": "{{baseUrl}}/posts",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "posts"
                    ]
                }
            }
        },
        {
            "name": "Update Post",
            "request": {
                "method": "PUT",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n  \"title\": \"Updated Post\",\n  \"content\": \"This post has been updated.\"\n}"
                },
                "url": {
                    "raw": "{{baseUrl}}/posts/1",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "posts",
                        "1"
                    ]
                }
            }
        },
        {
            "name": "Delete Post",
            "request": {
                "method": "DELETE",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/posts/1",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "posts",
                        "1"
                    ]
                }
            }
        }
    ],
    "variable": [
        {
            "key": "baseUrl",
            "value": "http://localhost:8080"
        }
    ]
}