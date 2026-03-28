-- ============================================================
-- Migration: 001_create_users_table
-- Description: Create the QC_Users table for authentication
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_Users' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_Users (
        Id              UNIQUEIDENTIFIER    NOT NULL DEFAULT NEWID(),
        Email           NVARCHAR(255)       NOT NULL,
        PasswordHash    NVARCHAR(255)       NOT NULL,
        FirstName       NVARCHAR(100)       NOT NULL,
        LastName        NVARCHAR(100)       NOT NULL,
        IsActive        BIT                 NOT NULL DEFAULT 1,
        CreatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
        UpdatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT PK_QC_Users PRIMARY KEY (Id),
        CONSTRAINT UQ_QC_Users_Email UNIQUE (Email)
    );

    CREATE NONCLUSTERED INDEX IX_QC_Users_Email ON dbo.QC_Users (Email);
    
    PRINT 'Table [dbo].[QC_Users] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_Users] already exists. Skipping.';
END
GO
