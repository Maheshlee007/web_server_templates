-- ============================================================
-- PostgreSQL Migration: Full Schema Setup
-- Description: Creates all tables for the Fastify React App
-- Run: psql -U postgres -d your_database -f 001_full_schema.sql
-- ============================================================

-- Enable UUID extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Table: qc_users
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    first_name      VARCHAR(100)    NOT NULL,
    last_name       VARCHAR(100)    NOT NULL,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qc_users_email ON qc_users (email);

-- ============================================================
-- Table: qc_roles
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_roles (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(50)     NOT NULL UNIQUE,
    description     VARCHAR(255),
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Table: qc_permissions
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_permissions (
    id              SERIAL          PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL UNIQUE,
    description     VARCHAR(255),
    resource        VARCHAR(50)     NOT NULL DEFAULT 'system',
    action          VARCHAR(50)     NOT NULL DEFAULT 'access',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Table: qc_role_permissions (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_role_permissions (
    role_id         INT             NOT NULL REFERENCES qc_roles(id) ON DELETE CASCADE,
    permission_id   INT             NOT NULL REFERENCES qc_permissions(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    PRIMARY KEY (role_id, permission_id)
);

-- ============================================================
-- Table: qc_user_roles (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_user_roles (
    user_id         UUID            NOT NULL REFERENCES qc_users(id) ON DELETE CASCADE,
    role_id         INT             NOT NULL REFERENCES qc_roles(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_qc_user_roles_user ON qc_user_roles (user_id);
CREATE INDEX IF NOT EXISTS idx_qc_user_roles_role ON qc_user_roles (role_id);

-- ============================================================
-- Table: qc_refresh_tokens
-- ============================================================
CREATE TABLE IF NOT EXISTS qc_refresh_tokens (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID            NOT NULL REFERENCES qc_users(id) ON DELETE CASCADE,
    token           TEXT            NOT NULL,
    expires_at      TIMESTAMPTZ     NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    revoked_at      TIMESTAMPTZ,
    replaced_by_token TEXT
);

CREATE INDEX IF NOT EXISTS idx_qc_refresh_tokens_token ON qc_refresh_tokens (token);
CREATE INDEX IF NOT EXISTS idx_qc_refresh_tokens_user ON qc_refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_qc_refresh_tokens_expires ON qc_refresh_tokens (expires_at) WHERE revoked_at IS NULL;

-- ============================================================
-- Function: update_updated_at_column
-- Auto-update updated_at on row changes
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for qc_users
DROP TRIGGER IF EXISTS update_qc_users_updated_at ON qc_users;
CREATE TRIGGER update_qc_users_updated_at
    BEFORE UPDATE ON qc_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Migration complete
-- ============================================================
DO $$ BEGIN
    RAISE NOTICE 'Schema migration completed successfully.';
END $$;
