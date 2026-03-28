import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Users,
  Shield,
  ShieldCheck,
  Activity,
  Search,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX,
  Loader2,
  RefreshCw,
  AlertCircle,
  Monitor,
  Lock,
  Unlock,
  Plus,
  Save,
  Trash2,
  RotateCcw,
  Edit3,
  X,
} from 'lucide-react';
import { Button } from '@/components/UI/Buttons/Button';
import { Input } from '@/components/UI/Input';
import { toast } from '@/components/UI/Feedback/Toast';
import { useAuthStore } from '@/store/authStore';
import {
  adminApi,
  type AdminUser,
  type RoleWithDetails,
  type SystemStats,
  type ScreenAccessMapping,
} from '@/services/adminService';
import { getScreenPermissionMatrix } from '@/config/routeRegistry';

// ═══════════════════════════════════════════
//  STAT CARD
// ═══════════════════════════════════════════
function StatCard({
  label,
  value,
  icon: Icon,
  color = 'brand',
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="glass-strong rounded-xl p-5 border border-(--color-border)">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-(--color-text-muted)">{label}</p>
          <p className="text-2xl font-bold text-(--color-text) mt-1">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-(--color-${color})/10`}
        >
          <Icon className={`w-6 h-6 text-(--color-${color})`} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  ROLE BADGE
// ═══════════════════════════════════════════
const roleColors: Record<string, string> = {
  Admin: 'bg-red-500/20 text-red-400 border-red-500/30',
  Manager: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Dev: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Guest: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[role] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
    >
      {role}
    </span>
  );
}

// ═══════════════════════════════════════════
//  ROLE EDITOR MODAL (inline)
// ═══════════════════════════════════════════
function RoleEditor({
  user,
  allRoles,
  onSave,
  onCancel,
}: {
  user: AdminUser;
  allRoles: RoleWithDetails[];
  onSave: (userId: string, roles: string[]) => Promise<void>;
  onCancel: () => void;
}) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user.roles);
  const [saving, setSaving] = useState(false);
  const currentUserId = useAuthStore((s) => s.user?.id);

  const handleToggle = (roleName: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  const handleSave = async () => {
    if (selectedRoles.length === 0) {
      toast.error('At least one role must be selected');
      return;
    }
    setSaving(true);
    try {
      await onSave(user.id, selectedRoles);
    } finally {
      setSaving(false);
    }
  };

  const isCurrentUser = currentUserId === user.id;

  return (
    <div className="mt-3 p-4 rounded-lg bg-(--color-bg)/50 border border-(--color-border)">
      <p className="text-sm font-medium text-(--color-text) mb-3">
        Edit roles for <span className="text-(--color-brand)">{user.email}</span>
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {allRoles.map((role) => {
          const isSelected = selectedRoles.includes(role.name);
          const isDisabled = isCurrentUser && role.name === 'Admin';
          return (
            <button
              key={role.id}
              onClick={() => !isDisabled && handleToggle(role.name)}
              disabled={isDisabled}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                isSelected
                  ? 'bg-(--color-brand)/20 text-(--color-brand) border-(--color-brand)/40'
                  : 'bg-(--color-bg) text-(--color-text-muted) border-(--color-border) hover:border-(--color-brand)/30'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {role.name}
              {role.description && (
                <span className="text-xs ml-1 opacity-60">— {role.description}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" isLoading={saving} onClick={handleSave}>
          Save Roles
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  USER ROW
// ═══════════════════════════════════════════
function UserRow({
  user,
  allRoles,
  isExpanded,
  onToggleExpand,
  onRolesSaved,
  onStatusToggle,
}: {
  user: AdminUser;
  allRoles: RoleWithDetails[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRolesSaved: () => void;
  onStatusToggle: (userId: string, isActive: boolean) => void;
}) {
  const [editingRoles, setEditingRoles] = useState(false);
  const currentUserId = useAuthStore((s) => s.user?.id);

  const handleSaveRoles = async (userId: string, roles: string[]) => {
    try {
      const result = await adminApi.updateUserRoles(userId, roles);
      if (result.success) {
        toast.success(`Roles updated for ${user.email}`);
        setEditingRoles(false);
        onRolesSaved();
      } else {
        toast.error(result.message || 'Failed to update roles');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update roles');
    }
  };

  return (
    <div className="border border-(--color-border) rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-(--color-bg)/50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              user.isActive
                ? 'bg-(--color-brand)/20 text-(--color-brand)'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </div>

          {/* Name + Email */}
          <div className="min-w-0">
            <p className="font-medium text-(--color-text) truncate">
              {user.firstName} {user.lastName}
              {currentUserId === user.id && (
                <span className="text-xs ml-2 text-(--color-brand)">(You)</span>
              )}
            </p>
            <p className="text-sm text-(--color-text-muted) truncate">{user.email}</p>
          </div>
        </div>

        {/* Roles */}
        <div className="hidden md:flex items-center gap-1.5 mx-4">
          {user.roles.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              user.isActive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {user.isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-(--color-text-muted)" />
          ) : (
            <ChevronDown className="w-4 h-4 text-(--color-text-muted)" />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-(--color-border) bg-(--color-bg)/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
            <div>
              <p className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-1">
                Roles
              </p>
              <div className="flex flex-wrap gap-1">
                {user.roles.map((r) => (
                  <RoleBadge key={r} role={r} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-1">
                Permissions
              </p>
              <div className="flex flex-wrap gap-1">
                {user.permissions.length > 0 ? (
                  user.permissions.map((p) => (
                    <span
                      key={p}
                      className="inline-flex px-2 py-0.5 rounded text-xs bg-(--color-bg) border border-(--color-border) text-(--color-text-muted)"
                    >
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-(--color-text-muted) italic">
                    No permissions
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-(--color-text-muted)">
              <p>
                <span className="font-medium">Created:</span>{' '}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              {user.updatedAt && (
                <p>
                  <span className="font-medium">Updated:</span>{' '}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Shield className="w-3.5 h-3.5" />}
              onClick={(e) => {
                e.stopPropagation();
                setEditingRoles(!editingRoles);
              }}
            >
              Edit Roles
            </Button>
            <Button
              variant={user.isActive ? 'danger' : 'primary'}
              size="sm"
              leftIcon={
                user.isActive ? (
                  <UserX className="w-3.5 h-3.5" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5" />
                )
              }
              onClick={(e) => {
                e.stopPropagation();
                onStatusToggle(user.id, !user.isActive);
              }}
              disabled={currentUserId === user.id}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>

          {/* Role Editor */}
          {editingRoles && (
            <RoleEditor
              user={user}
              allRoles={allRoles}
              onSave={handleSaveRoles}
              onCancel={() => setEditingRoles(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MAIN ADMIN PAGE
// ═══════════════════════════════════════════
export function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<RoleWithDetails[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'screens'>('users');
  const screenMatrix = useMemo(() => getScreenPermissionMatrix(), []);

  // Screen access state (dynamic from backend)
  const [screenMappings, setScreenMappings] = useState<ScreenAccessMapping[]>([]);
  const [editingScreen, setEditingScreen] = useState<ScreenAccessMapping | null>(null);
  const [addingScreen, setAddingScreen] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  // ──── Fetch data ────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, rolesRes, statsRes] = await Promise.all([
        adminApi.listUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: search || undefined,
          role: roleFilter || undefined,
        }),
        adminApi.listRoles(),
        adminApi.getStats(),
      ]);

      if (usersRes.success && usersRes.data) {
        setUsers(usersRes.data.items);
        setPagination((prev) => ({
          ...prev,
          total: usersRes.data!.total,
          totalPages: usersRes.data!.totalPages,
        }));
      }
      if (rolesRes.success && rolesRes.data) setRoles(rolesRes.data);
      if (statsRes.success && statsRes.data) setStats(statsRes.data);

      // Load screen access mappings from backend
      try {
        const screenRes = await adminApi.getScreenAccess();
        if (screenRes.success && screenRes.data) {
          setScreenMappings(screenRes.data);
        } else {
          // Fallback: use static registry (backend table might not exist yet)
          setScreenMappings(
            screenMatrix.map((s) => ({
              screenId: s.path.replace(/\//g, '') || 'home',
              screenName: s.screen,
              path: s.path,
              category: s.category,
              description: s.description,
              roles: s.roles,
              permissions: s.permissions,
            }))
          );
        }
      } catch {
        // First time — seed from registry
        setScreenMappings(
          screenMatrix.map((s) => ({
            screenId: s.path.replace(/\//g, '') || 'home',
            screenName: s.screen,
            path: s.path,
            category: s.category,
            description: s.description,
            roles: s.roles,
            permissions: s.permissions,
          }))
        );
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to load admin data';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, roleFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ──── Handlers ────
  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      const result = await adminApi.toggleUserStatus(userId, isActive);
      if (result.success) {
        toast.success(result.data?.message || 'Status updated');
        fetchData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text) flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-(--color-brand)" />
            Administration
          </h1>
          <p className="text-(--color-text-muted) mt-1">
            Manage users, roles, and system permissions
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={fetchData}
          isLoading={loading}
        >
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats.users.totalUsers} icon={Users} />
          <StatCard label="Active Users" value={stats.users.activeUsers} icon={UserCheck} color="brand" />
          <StatCard label="Inactive Users" value={stats.users.inactiveUsers} icon={UserX} color="brand" />
          <StatCard
            label="Roles"
            value={stats.roleDistribution.length}
            icon={Shield}
            color="brand"
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-(--color-border)">
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'users'
              ? 'text-(--color-brand) border-(--color-brand)'
              : 'text-(--color-text-muted) border-transparent hover:text-(--color-text)'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users className="w-4 h-4 inline mr-1.5" />
          Users ({pagination.total})
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'roles'
              ? 'text-(--color-brand) border-(--color-brand)'
              : 'text-(--color-text-muted) border-transparent hover:text-(--color-text)'
          }`}
          onClick={() => setActiveTab('roles')}
        >
          <Shield className="w-4 h-4 inline mr-1.5" />
          Roles & Permissions
        </button>
        <button
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'screens'
              ? 'text-(--color-brand) border-(--color-brand)'
              : 'text-(--color-text-muted) border-transparent hover:text-(--color-text)'
          }`}
          onClick={() => setActiveTab('screens')}
        >
          <Monitor className="w-4 h-4 inline mr-1.5" />
          Screen Access
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-(--color-brand)" />
        </div>
      )}

      {/* ═══════ Users Tab ═══════ */}
      {!loading && activeTab === 'users' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                leftIcon={<Search className="w-4 h-4" />}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <option value="">All Roles</option>
              {roles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name} ({r.userCount})
                </option>
              ))}
            </select>
          </div>

          {/* User List */}
          <div className="space-y-2">
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                allRoles={roles}
                isExpanded={expandedUserId === user.id}
                onToggleExpand={() =>
                  setExpandedUserId(expandedUserId === user.id ? null : user.id)
                }
                onRolesSaved={fetchData}
                onStatusToggle={handleStatusToggle}
              />
            ))}

            {users.length === 0 && (
              <div className="text-center py-12 text-(--color-text-muted)">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No users found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-(--color-border)">
              <p className="text-sm text-(--color-text-muted)">
                Showing {(pagination.page - 1) * pagination.limit + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════ Roles Tab ═══════ */}
      {!loading && activeTab === 'roles' && (
        <div className="space-y-4">
          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="glass-strong rounded-xl p-5 border border-(--color-border)"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <RoleBadge role={role.name} />
                    <span className="text-sm text-(--color-text-muted)">
                      {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <Activity className="w-4 h-4 text-(--color-text-muted)" />
                </div>

                {role.description && (
                  <p className="text-sm text-(--color-text-muted) mb-3">{role.description}</p>
                )}

                <div>
                  <p className="text-xs text-(--color-text-muted) uppercase tracking-wider mb-2">
                    Permissions
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.permissions.length > 0 ? (
                      role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-(--color-bg) border border-(--color-border) text-(--color-text)"
                        >
                          <ShieldCheck className="w-3 h-3 mr-1 opacity-60" />
                          {perm}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-(--color-text-muted) italic">
                        No permissions assigned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Permission Matrix */}
          {stats && (
            <div className="glass-strong rounded-xl p-5 border border-(--color-border)">
              <h3 className="text-lg font-semibold text-(--color-text) mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Role Distribution
              </h3>
              <div className="space-y-3">
                {stats.roleDistribution.map((rd) => (
                  <div key={rd.role} className="flex items-center gap-3">
                    <span className="text-sm text-(--color-text) w-24">{rd.role}</span>
                    <div className="flex-1 h-6 bg-(--color-bg) rounded-full overflow-hidden border border-(--color-border)">
                      <div
                        className="h-full bg-(--color-brand)/40 rounded-full transition-all"
                        style={{
                          width: `${stats.users.totalUsers > 0 ? (rd.count / stats.users.totalUsers) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-(--color-text-muted) w-8 text-right">
                      {rd.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════ Screen Access Tab ═══════ */}
      {!loading && activeTab === 'screens' && (
        <ScreenAccessTab
          screenMappings={screenMappings}
          roles={roles}
          screenMatrix={screenMatrix}
          editingScreen={editingScreen}
          addingScreen={addingScreen}
          screenLoading={screenLoading}
          onSetEditingScreen={setEditingScreen}
          onSetAddingScreen={setAddingScreen}
          onSetScreenLoading={setScreenLoading}
          onSetScreenMappings={setScreenMappings}
          onRefresh={fetchData}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
//  SCREEN ACCESS TAB — Editable matrix
// ═══════════════════════════════════════════
function ScreenAccessTab({
  screenMappings,
  roles,
  screenMatrix,
  editingScreen,
  addingScreen,
  screenLoading,
  onSetEditingScreen,
  onSetAddingScreen,
  onSetScreenLoading,
  onSetScreenMappings,
  onRefresh,
}: {
  screenMappings: ScreenAccessMapping[];
  roles: RoleWithDetails[];
  screenMatrix: ReturnType<typeof getScreenPermissionMatrix>;
  editingScreen: ScreenAccessMapping | null;
  addingScreen: boolean;
  screenLoading: boolean;
  onSetEditingScreen: (s: ScreenAccessMapping | null) => void;
  onSetAddingScreen: (v: boolean) => void;
  onSetScreenLoading: (v: boolean) => void;
  onSetScreenMappings: (m: ScreenAccessMapping[]) => void;
  onRefresh: () => void;
}) {
  // The effective data: merge backend data with static registry for display
  const displayMappings = screenMappings.length > 0
    ? screenMappings
    : screenMatrix.map((s) => ({
        screenId: s.path.replace(/\//g, '') || 'home',
        screenName: s.screen,
        path: s.path,
        category: s.category,
        description: s.description,
        roles: s.roles,
        permissions: s.permissions,
      }));

  const handleToggleRole = async (screen: ScreenAccessMapping, roleName: string) => {
    onSetScreenLoading(true);
    const updatedRoles = screen.roles.includes(roleName)
      ? screen.roles.filter((r) => r !== roleName)
      : [...screen.roles, roleName];

    const updated: ScreenAccessMapping = { ...screen, roles: updatedRoles };
    try {
      const result = await adminApi.upsertScreenAccess(updated);
      if (result.success) {
        onSetScreenMappings(
          displayMappings.map((s) => (s.screenId === screen.screenId ? updated : s))
        );
        toast.success(`Updated roles for "${screen.screenName}"`);
      } else {
        toast.error(result.message || 'Failed to update');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update screen access');
    } finally {
      onSetScreenLoading(false);
    }
  };

  const handleSyncFromRegistry = async () => {
    onSetScreenLoading(true);
    try {
      const entries = screenMatrix.map((s) => ({
        screenId: s.path.replace(/\//g, '') || 'home',
        screenName: s.screen,
        path: s.path,
        category: s.category,
        description: s.description,
        roles: s.roles,
        permissions: s.permissions,
      }));
      const result = await adminApi.seedScreenAccess(entries);
      if (result.success) {
        toast.success(result.data?.message || 'Synced successfully');
        onRefresh();
      } else {
        toast.error(result.message || 'Sync failed');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to sync');
    } finally {
      onSetScreenLoading(false);
    }
  };

  const handleSaveNew = async (entry: ScreenAccessMapping) => {
    onSetScreenLoading(true);
    try {
      const result = await adminApi.upsertScreenAccess(entry);
      if (result.success) {
        toast.success('Screen mapping added');
        onSetAddingScreen(false);
        onRefresh();
      } else {
        toast.error(result.message || 'Failed to save');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      onSetScreenLoading(false);
    }
  };

  const handleDelete = async (screenId: string) => {
    if (!confirm('Remove this screen mapping?')) return;
    onSetScreenLoading(true);
    try {
      const result = await adminApi.deleteScreenAccess(screenId);
      if (result.success) {
        toast.success('Screen mapping removed');
        onSetScreenMappings(displayMappings.filter((s) => s.screenId !== screenId));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      onSetScreenLoading(false);
    }
  };

  const categoryColor = (cat: string) =>
    cat === 'admin'
      ? 'bg-red-500/20 text-red-400'
      : cat === 'settings'
        ? 'bg-amber-500/20 text-amber-400'
        : cat === 'demo'
          ? 'bg-blue-500/20 text-blue-400'
          : 'bg-green-500/20 text-green-400';

  return (
    <div className="space-y-4">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-(--color-text) flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Screen-Role Permission Matrix
          </h3>
          <p className="text-sm text-(--color-text-muted) mt-1">
            Click the lock/unlock icons to toggle access. Add new screens or sync from registry.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={handleSyncFromRegistry}
            isLoading={screenLoading}
          >
            Sync from Registry
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => onSetAddingScreen(true)}
          >
            Add Screen
          </Button>
        </div>
      </div>

      {/* Add Screen Form */}
      {addingScreen && (
        <ScreenEditor
          roles={roles}
          onSave={handleSaveNew}
          onCancel={() => onSetAddingScreen(false)}
          saving={screenLoading}
        />
      )}

      {/* Matrix Table */}
      <div className="glass-strong rounded-xl border border-(--color-border) overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--color-border) bg-(--color-bg)/50">
                <th className="text-left p-3 text-(--color-text-muted) font-medium">Screen</th>
                <th className="text-left p-3 text-(--color-text-muted) font-medium">Path</th>
                <th className="text-left p-3 text-(--color-text-muted) font-medium">Category</th>
                {roles.map((r) => (
                  <th key={r.id} className="text-center p-3 font-medium">
                    <RoleBadge role={r.name} />
                  </th>
                ))}
                <th className="text-center p-3 text-(--color-text-muted) font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayMappings.map((screen) => (
                <tr
                  key={screen.screenId}
                  className="border-b border-(--color-border) hover:bg-(--color-bg)/30 transition-colors"
                >
                  <td className="p-3">
                    <div>
                      <span className="text-(--color-text) font-medium">{screen.screenName}</span>
                      {screen.description && (
                        <p className="text-xs text-(--color-text-muted) mt-0.5">
                          {screen.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <code className="text-xs bg-(--color-bg) px-1.5 py-0.5 rounded border border-(--color-border) text-(--color-text)">
                      {screen.path}
                    </code>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor(screen.category)}`}
                    >
                      {screen.category}
                    </span>
                  </td>
                  {roles.map((r) => {
                    const hasAccess =
                      screen.roles.length === 0 || screen.roles.includes(r.name);
                    return (
                      <td key={r.id} className="text-center p-3">
                        <button
                          onClick={() => handleToggleRole(screen, r.name)}
                          disabled={screenLoading}
                          className="cursor-pointer hover:scale-125 transition-transform disabled:opacity-50"
                          title={`${hasAccess ? 'Revoke' : 'Grant'} ${r.name} access to ${screen.screenName}`}
                        >
                          {hasAccess ? (
                            <Unlock className="w-4 h-4 mx-auto text-green-400" />
                          ) : (
                            <Lock className="w-4 h-4 mx-auto text-red-400/40" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                  <td className="text-center p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onSetEditingScreen(screen)}
                        className="p-1 rounded hover:bg-(--color-bg) text-(--color-text-muted) hover:text-(--color-brand) transition-colors"
                        title="Edit screen details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(screen.screenId)}
                        className="p-1 rounded hover:bg-red-500/10 text-(--color-text-muted) hover:text-red-400 transition-colors"
                        title="Remove screen mapping"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayMappings.length === 0 && (
                <tr>
                  <td colSpan={4 + roles.length} className="text-center py-8 text-(--color-text-muted)">
                    No screen mappings found. Click "Sync from Registry" to initialize.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Screen Modal (inline) */}
      {editingScreen && (
        <ScreenEditor
          screen={editingScreen}
          roles={roles}
          onSave={async (entry) => {
            onSetScreenLoading(true);
            try {
              const result = await adminApi.upsertScreenAccess(entry);
              if (result.success) {
                toast.success('Screen mapping updated');
                onSetEditingScreen(null);
                onRefresh();
              }
            } catch (err: any) {
              toast.error(err.response?.data?.message || 'Failed to update');
            } finally {
              onSetScreenLoading(false);
            }
          }}
          onCancel={() => onSetEditingScreen(null)}
          saving={screenLoading}
        />
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-(--color-text-muted)">
        <div className="flex items-center gap-1.5">
          <Unlock className="w-4 h-4 text-green-400" />
          <span>Has Access — click to revoke</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-red-400/40" />
          <span>Restricted — click to grant</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs italic">
            Screens with no role restriction are accessible to all authenticated users
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  SCREEN EDITOR — Add/Edit form
// ═══════════════════════════════════════════
function ScreenEditor({
  screen,
  roles,
  onSave,
  onCancel,
  saving,
}: {
  screen?: ScreenAccessMapping;
  roles: RoleWithDetails[];
  onSave: (entry: ScreenAccessMapping) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ScreenAccessMapping>(
    screen ?? {
      screenId: '',
      screenName: '',
      path: '/',
      category: 'core',
      description: '',
      roles: [],
      permissions: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.screenId || !form.screenName || !form.path) {
      toast.error('Screen ID, Name, and Path are required');
      return;
    }
    onSave(form);
  };

  const toggleRole = (roleName: string) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter((r) => r !== roleName)
        : [...prev.roles, roleName],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong rounded-xl p-5 border border-(--color-brand)/30 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-(--color-text)">
          {screen ? 'Edit Screen Mapping' : 'Add New Screen Mapping'}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded hover:bg-(--color-bg) text-(--color-text-muted)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-(--color-text-muted) block mb-1">Screen ID</label>
          <input
            type="text"
            value={form.screenId}
            onChange={(e) => setForm({ ...form, screenId: e.target.value })}
            placeholder="e.g. reports"
            disabled={!!screen}
            className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label className="text-xs text-(--color-text-muted) block mb-1">Screen Name</label>
          <input
            type="text"
            value={form.screenName}
            onChange={(e) => setForm({ ...form, screenName: e.target.value })}
            placeholder="e.g. Reports"
            className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-(--color-text-muted) block mb-1">Path</label>
          <input
            type="text"
            value={form.path}
            onChange={(e) => setForm({ ...form, path: e.target.value })}
            placeholder="e.g. /reports"
            className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-(--color-text-muted) block mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm"
          >
            <option value="core">Core</option>
            <option value="admin">Admin</option>
            <option value="demo">Demo</option>
            <option value="settings">Settings</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-(--color-text-muted) block mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Brief description"
            className="w-full px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg) text-(--color-text) text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-(--color-text-muted) block mb-2">Allowed Roles</label>
        <p className="text-xs text-(--color-text-muted) mb-2 italic">
          Leave all unchecked = accessible to all authenticated users
        </p>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => {
            const isSelected = form.roles.includes(role.name);
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => toggleRole(role.name)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-(--color-brand)/20 text-(--color-brand) border-(--color-brand)/40'
                    : 'bg-(--color-bg) text-(--color-text-muted) border-(--color-border) hover:border-(--color-brand)/30'
                }`}
              >
                {role.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          isLoading={saving}
          leftIcon={<Save className="w-3.5 h-3.5" />}
        >
          {screen ? 'Update' : 'Add Screen'}
        </Button>
      </div>
    </form>  );
}