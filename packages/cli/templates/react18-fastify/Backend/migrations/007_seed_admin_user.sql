-- ============================================================
-- Migration: 007_seed_admin_user
-- Description: Seed a default Admin user for initial system access
-- Database: VIBE_Hackathon
--
-- Default Admin Credentials:
--   Email:    admin@app.local
--   Password: Admin@123
--   (bcrypt hash generated with 10 salt rounds)
-- ============================================================

USE [VIBE_Hackathon];
GO

-- Insert admin user if not exists
IF NOT EXISTS (SELECT 1 FROM dbo.QC_Users WHERE Email = 'admin@app.local')
BEGIN
    DECLARE @AdminId UNIQUEIDENTIFIER = NEWID();

    -- Password: Admin@123 (bcrypt 10 rounds)
    INSERT INTO dbo.QC_Users (Id, Email, PasswordHash, FirstName, LastName, IsActive)
    VALUES (
        @AdminId,
        'admin@app.local',
        '$2b$10$8K1p/a0dL1LXMw0gfQ5dCOzKkKx0w0K4F8MYBPB6aN0eTIqxX4r3e',
        'System',
        'Admin',
        1
    );

    -- Assign Admin role
    INSERT INTO dbo.QC_UserRoles (UserId, RoleId)
    SELECT @AdminId, Id FROM dbo.QC_Roles WHERE Name = 'Admin';

    PRINT 'Default admin user created: admin@app.local / Admin@123';
END
ELSE
BEGIN
    PRINT 'Admin user already exists. Skipping.';
END
GO
