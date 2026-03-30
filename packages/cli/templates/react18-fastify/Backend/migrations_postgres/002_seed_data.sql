-- ============================================================
-- PostgreSQL Migration: Seed Data
-- Description: Seeds default roles, permissions, and admin user
-- Run: psql -U postgres -d your_database -f 002_seed_data.sql
-- ============================================================

-- ============================================================
-- Seed: Roles
-- ============================================================
INSERT INTO qc_roles (name, description) VALUES
    ('Admin', 'Full system access. Can manage users, roles, permissions, and all resources.'),
    ('Dev', 'Developer access. Can view most resources and access development tools.'),
    ('Manager', 'Manager access. Can manage team members, view reports, and update settings.'),
    ('Guest', 'Read-only access. Can view dashboards and public resources only.')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- Seed: Permissions
-- ============================================================
INSERT INTO qc_permissions (name, description, resource, action) VALUES
    -- User permissions
    ('user:read', 'View user profiles', 'user', 'read'),
    ('user:create', 'Create new users', 'user', 'create'),
    ('user:update', 'Update user profiles', 'user', 'update'),
    ('user:delete', 'Delete users', 'user', 'delete'),
    -- Role permissions
    ('role:read', 'View roles', 'role', 'read'),
    ('role:assign', 'Assign roles to users', 'role', 'assign'),
    ('role:manage', 'Manage roles and permissions', 'role', 'manage'),
    -- Dashboard permissions
    ('dashboard:view', 'View dashboard', 'dashboard', 'view'),
    ('dashboard:admin', 'View admin dashboard', 'dashboard', 'admin'),
    -- Settings permissions
    ('settings:read', 'View settings', 'settings', 'read'),
    ('settings:update', 'Update settings', 'settings', 'update'),
    -- System permissions
    ('system:audit', 'View audit logs', 'system', 'audit'),
    ('system:config', 'Configure system settings', 'system', 'config')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- Seed: Role-Permission Mappings
-- ============================================================

-- Admin: All permissions
INSERT INTO qc_role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM qc_roles r, qc_permissions p
WHERE r.name = 'Admin'
ON CONFLICT DO NOTHING;

-- Dev: Read + dashboard + settings read
INSERT INTO qc_role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM qc_roles r, qc_permissions p
WHERE r.name = 'Dev' AND p.name IN (
    'user:read', 'role:read', 'dashboard:view', 'settings:read'
)
ON CONFLICT DO NOTHING;

-- Manager: Read + User management + Dashboard
INSERT INTO qc_role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM qc_roles r, qc_permissions p
WHERE r.name = 'Manager' AND p.name IN (
    'user:read', 'user:create', 'user:update', 'role:read', 'role:assign',
    'dashboard:view', 'settings:read'
)
ON CONFLICT DO NOTHING;

-- Guest: Dashboard view only
INSERT INTO qc_role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM qc_roles r, qc_permissions p
WHERE r.name = 'Guest' AND p.name IN ('dashboard:view')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Seed: Default Admin User
-- Email: admin@app.local
-- Password: Admin@123 (bcrypt hash, 10 rounds)
-- ============================================================
DO $$
DECLARE
    admin_id UUID;
    admin_role_id INT;
BEGIN
    -- Check if admin already exists
    IF NOT EXISTS (SELECT 1 FROM qc_users WHERE email = 'admin@app.local') THEN
        -- Insert admin user
        INSERT INTO qc_users (email, password_hash, first_name, last_name, is_active)
        VALUES (
            'admin@app.local',
            '$2b$10$kxX97dnUZicvIw0AoHgEM.49yddEJLXyiyDXPY07lyM8v66PImwCG',
            'System',
            'Admin',
            TRUE
        )
        RETURNING id INTO admin_id;

        -- Get Admin role ID
        SELECT id INTO admin_role_id FROM qc_roles WHERE name = 'Admin';

        -- Assign Admin role
        INSERT INTO qc_user_roles (user_id, role_id) VALUES (admin_id, admin_role_id);

        RAISE NOTICE 'Default admin user created: admin@app.local / Admin@123';
    ELSE
        RAISE NOTICE 'Admin user already exists. Skipping.';
    END IF;
END $$;

-- ============================================================
-- Seed complete
-- ============================================================
DO $$ BEGIN
    RAISE NOTICE 'Seed data migration completed successfully.';
END $$;
