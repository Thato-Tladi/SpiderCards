CREATE TABLE SpiderCardsSchema.GameSessions
(
    session_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    score INT NOT NULL,
    current_round INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES SpiderCardsSchema.Users(user_id)
);
GO
