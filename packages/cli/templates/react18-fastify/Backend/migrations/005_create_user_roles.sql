-- ============================================================
-- Migration: 005_create_user_roles
-- Description: Create QC_UserRoles junction table (many-to-many)
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_UserRoles' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_UserRoles (
        UserId          UNIQUEIDENTIFIER    NOT NULL,
        RoleId          INT                 NOT NULL,
        AssignedAt      DATETIME2           NOT NULL DEFAULT GETUTCDATE(),
        AssignedBy      UNIQUEIDENTIFIER    NULL,

        CONSTRAINT PK_QC_UserRoles PRIMARY KEY (UserId, RoleId),
        CONSTRAINT FK_QC_UserRoles_Users FOREIGN KEY (UserId) REFERENCES dbo.QC_Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_QC_UserRoles_Roles FOREIGN KEY (RoleId) REFERENCES dbo.QC_Roles(Id) ON DELETE CASCADE,
        CONSTRAINT FK_QC_UserRoles_AssignedBy FOREIGN KEY (AssignedBy) REFERENCES dbo.QC_Users(Id)
    );

    CREATE NONCLUSTERED INDEX IX_QC_UserRoles_UserId ON dbo.QC_UserRoles (UserId);
    CREATE NONCLUSTERED INDEX IX_QC_UserRoles_RoleId ON dbo.QC_UserRoles (RoleId);

    PRINT 'Table [dbo].[QC_UserRoles] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_UserRoles] already exists. Skipping.';
END
GO
