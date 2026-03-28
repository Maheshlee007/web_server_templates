-- ============================================================
-- Migration: 003_create_permissions_table
-- Description: Create QC_Permissions table and seed default permissions
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_Permissions' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_Permissions (
        Id              INT                 IDENTITY(1,1) NOT NULL,
        Name            NVARCHAR(100)       NOT NULL,
        Description     NVARCHAR(255)       NULL,
        Resource        NVARCHAR(50)        NOT NULL,
        Action          NVARCHAR(50)        NOT NULL,
        CreatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT PK_QC_Permissions PRIMARY KEY (Id),
        CONSTRAINT UQ_QC_Permissions_Name UNIQUE (Name),
        CONSTRAINT UQ_QC_Permissions_Resource_Action UNIQUE (Resource, Action)
    );

    PRINT 'Table [dbo].[QC_Permissions] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_Permissions] already exists. Skipping.';
END
GO

-- Seed default permissions (idempotent)
IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'users:read')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('users:read', 'View user profiles and user listings', 'users', 'read');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'users:write')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('users:write', 'Create and update user profiles', 'users', 'write');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'users:delete')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('users:delete', 'Delete user accounts', 'users', 'delete');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'roles:manage')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('roles:manage', 'Create, update, and delete roles and assign permissions', 'roles', 'manage');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'admin:access')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('admin:access', 'Access admin panel and system configuration', 'admin', 'access');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'dashboard:view')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('dashboard:view', 'View main dashboard and widgets', 'dashboard', 'view');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'reports:view')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('reports:view', 'View reports and analytics', 'reports', 'view');

IF NOT EXISTS (SELECT 1 FROM dbo.QC_Permissions WHERE Name = 'settings:manage')
    INSERT INTO dbo.QC_Permissions (Name, Description, Resource, Action)
    VALUES ('settings:manage', 'Manage application settings and preferences', 'settings', 'manage');

PRINT 'Default permissions seeded.';
GO
