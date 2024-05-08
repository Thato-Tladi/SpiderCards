CREATE TABLE SpiderCardsSchema.Cards
(
    card_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    scientific_name NVARCHAR(255) NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    habitat NVARCHAR(255) NOT NULL,
    toxicity_rating INT NOT NULL,
    type_id INT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES SpiderCardsSchema.CardTypes(type_id)
);
GO
