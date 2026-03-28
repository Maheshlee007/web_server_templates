-- ============================================================
-- Migration: 006_create_refresh_tokens
-- Description: Create QC_RefreshTokens table for JWT refresh flow
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_RefreshTokens' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_RefreshTokens (
        Id              UNIQUEIDENTIFIER    NOT NULL DEFAULT NEWID(),
        UserId          UNIQUEIDENTIFIER    NOT NULL,
        Token           NVARCHAR(500)       NOT NULL,
        ExpiresAt       DATETIME2           NOT NULL,
        CreatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
        RevokedAt       DATETIME2           NULL,
        ReplacedByToken NVARCHAR(500)       NULL,

        CONSTRAINT PK_QC_RefreshTokens PRIMARY KEY (Id),
        CONSTRAINT FK_QC_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.QC_Users(Id) ON DELETE CASCADE
    );

    CREATE NONCLUSTERED INDEX IX_QC_RefreshTokens_Token ON dbo.QC_RefreshTokens (Token);
    CREATE NONCLUSTERED INDEX IX_QC_RefreshTokens_UserId ON dbo.QC_RefreshTokens (UserId);
    CREATE NONCLUSTERED INDEX IX_QC_RefreshTokens_ExpiresAt ON dbo.QC_RefreshTokens (ExpiresAt) WHERE RevokedAt IS NULL;

    PRINT 'Table [dbo].[QC_RefreshTokens] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_RefreshTokens] already exists. Skipping.';
END
GO
