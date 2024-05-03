CREATE TABLE SpiderCardsSchema.Users
(
    user_id INT PRIMARY KEY IDENTITY(1,1),
    auth0_id NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    username NVARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);
GO
