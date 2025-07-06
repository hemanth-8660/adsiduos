#Auth
POST /register – Register a new user

Request body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response
{
  "message": "User registered successfully",
}

POST /login – Login and receive JWT
Request Body
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response 
{  
  "message": "Login successful",
  "token": "jwt_token"
}



#Files
POST /upload – Upload a file (image, video, audio, or PDF)
Headers:
Content-Type: multipart/form-data
Authorization: Bearer <token>

Response
{
  "message": "File uploaded successfully",
  "file": {
    "id": "file_id",
    "filename": "abc.pdf",
    "url": "https://...",
    "views": 0,
    "uploadedBy": "user_id"
  }
}

#increment count
PATCH /files/:id/view – Increment view count of a specific file
:id – File ID
Response 
{
  "message": "Updated File View Count Successfully.",
}

#Search
POST /search?keyword=example – Search files by keyword, sorted by relevance and view count
Request: keyword
Response:
[
  {
    "id": "file_id",
    "filename": "report.pdf",
    "views": 30,
  },
  {
    "id": "file_id_2",
    "filename": "budget2023.pdf",
    "views": 15,
  }
]


