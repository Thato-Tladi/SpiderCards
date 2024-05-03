-- NOTE: the id here is purposefulyl being manually set so we can always know what it is ()
CREATE TABLE SpiderCardsSchema.CardTypes
(
    type_id INT PRIMARY KEY,
    description NVARCHAR(255) NOT NULL,
    CONSTRAINT CHK_CardTypes_Description CHECK (description IN ('Venomous', 'Non_Venomous'))
);
GO

