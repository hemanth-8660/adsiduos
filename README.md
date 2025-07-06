#Auth
POST /register – Register a new user
POST /login – Login and receive JWT

#Files
POST /upload – Upload a file (image, video, audio, or PDF)
PATCH /files/:id/view – Increment view count of a specific file

#Search
POST /search?keyword=example – Search files by keyword, sorted by relevance and view count

