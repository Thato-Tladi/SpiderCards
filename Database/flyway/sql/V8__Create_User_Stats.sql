USE spidercards;
GO

CREATE TABLE SpiderCardsSchema.UserStats
(
    user_stats_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    total_score INT NOT NULL,
    total_games_played INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES SpiderCardsSchema.Users(user_id)
);
GO
