-- ============================================================
-- Migration: 004_create_role_permissions
-- Description: Create QC_RolePermissions junction table and seed mappings
-- Database: VIBE_Hackathon
-- ============================================================

USE [VIBE_Hackathon];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'QC_RolePermissions' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.QC_RolePermissions (
        RoleId          INT                 NOT NULL,
        PermissionId    INT                 NOT NULL,
        CreatedAt       DATETIME2           NOT NULL DEFAULT GETUTCDATE(),

        CONSTRAINT PK_QC_RolePermissions PRIMARY KEY (RoleId, PermissionId),
        CONSTRAINT FK_QC_RolePermissions_Roles FOREIGN KEY (RoleId) REFERENCES dbo.QC_Roles(Id) ON DELETE CASCADE,
        CONSTRAINT FK_QC_RolePermissions_Permissions FOREIGN KEY (PermissionId) REFERENCES dbo.QC_Permissions(Id) ON DELETE CASCADE
    );

    PRINT 'Table [dbo].[QC_RolePermissions] created successfully.';
END
ELSE
BEGIN
    PRINT 'Table [dbo].[QC_RolePermissions] already exists. Skipping.';
END
GO

-- ============================================================
-- Seed Role-Permission mappings
-- 
-- Permission Matrix:
-- +------------------+-------+-----+---------+-------+
-- | Permission       | Admin | Dev | Manager | Guest |
-- +------------------+-------+-----+---------+-------+
-- | users:read       |   Y   |  Y  |    Y    |       |
-- | users:write      |   Y   |     |    Y    |       |
-- | users:delete     |   Y   |     |         |       |
-- | roles:manage     |   Y   |     |         |       |
-- | admin:access     |   Y   |     |         |       |
-- | dashboard:view   |   Y   |  Y  |    Y    |   Y   |
-- | reports:view     |   Y   |  Y  |    Y    |       |
-- | settings:manage  |   Y   |     |    Y    |       |
-- +------------------+-------+-----+---------+-------+
-- ============================================================

-- Admin: ALL permissions
INSERT INTO dbo.QC_RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM dbo.QC_Roles r
CROSS JOIN dbo.QC_Permissions p
WHERE r.Name = 'Admin'
  AND NOT EXISTS (
      SELECT 1 FROM dbo.QC_RolePermissions rp WHERE rp.RoleId = r.Id AND rp.PermissionId = p.Id
  );

-- Dev: users:read, dashboard:view, reports:view
INSERT INTO dbo.QC_RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM dbo.QC_Roles r
CROSS JOIN dbo.QC_Permissions p
WHERE r.Name = 'Dev'
  AND p.Name IN ('users:read', 'dashboard:view', 'reports:view')
  AND NOT EXISTS (
      SELECT 1 FROM dbo.QC_RolePermissions rp WHERE rp.RoleId = r.Id AND rp.PermissionId = p.Id
  );

-- Manager: users:read, users:write, dashboard:view, reports:view, settings:manage
INSERT INTO dbo.QC_RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM dbo.QC_Roles r
CROSS JOIN dbo.QC_Permissions p
WHERE r.Name = 'Manager'
  AND p.Name IN ('users:read', 'users:write', 'dashboard:view', 'reports:view', 'settings:manage')
  AND NOT EXISTS (
      SELECT 1 FROM dbo.QC_RolePermissions rp WHERE rp.RoleId = r.Id AND rp.PermissionId = p.Id
  );

-- Guest: dashboard:view only
INSERT INTO dbo.QC_RolePermissions (RoleId, PermissionId)
SELECT r.Id, p.Id
FROM dbo.QC_Roles r
CROSS JOIN dbo.QC_Permissions p
WHERE r.Name = 'Guest'
  AND p.Name IN ('dashboard:view')
  AND NOT EXISTS (
      SELECT 1 FROM dbo.QC_RolePermissions rp WHERE rp.RoleId = r.Id AND rp.PermissionId = p.Id
  );

PRINT 'Role-Permission mappings seeded.';
GO
