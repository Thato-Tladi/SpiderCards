IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'SpiderCardsSchema')
BEGIN
    EXEC('CREATE SCHEMA SpiderCardsSchema;');
END
GO
