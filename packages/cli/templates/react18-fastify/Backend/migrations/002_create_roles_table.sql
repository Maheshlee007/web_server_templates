-- ============================================================
-- Migration: 002_create_roles_table
-- Description: Create QC_Roles table and seed default roles
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_Roles' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_Roles (
        Id              INT                 IDENTITY(1,1) NOT NULL,
        Name            NVARCHAR(50)        NOT NULL,
        Description     NVARCHAR(255)       NULL,
        CreatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT PK_QC_Roles PRIMARY KEY (Id),
        CONSTRAINT UQ_QC_Roles_Name UNIQUE (Name)
    );

    PRINT 'Table [dbo].[QC_Roles] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_Roles] already exists. Skipping.';
END
GO

-- Seed default roles (idempotent)
IF NOT EXISTS (SELECT 1 FROM dbo.QC_Roles WHERE Name = 'Admin')
    INSERT INTO dbo.QC_Roles (Name, Description) VALUES ('Admin', 'Full system access. Can manage users, roles, permissions, and all resources.');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Roles WHERE Name = 'Dev')
    INSERT INTO dbo.QC_Roles (Name, Description) VALUES ('Dev', 'Developer access. Can view most resources and access development tools.');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Roles WHERE Name = 'Manager')
    INSERT INTO dbo.QC_Roles (Name, Description) VALUES ('Manager', 'Manager access. Can manage team members, view reports, and update settings.');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Roles WHERE Name = 'Guest')
    INSERT INTO dbo.QC_Roles (Name, Description) VALUES ('Guest', 'Read-only access. Can view dashboards and public resources only.');

PRINT 'Default roles seeded.';
GO
