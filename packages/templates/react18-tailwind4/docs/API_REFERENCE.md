# API Reference

Complete prop tables and TypeScript types for all components.

---

## Button Props

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 
            'success' | 'warning' | 'glass' | 'link' | 'gradient' | 'gradient-border';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Visual style - controls background, text color, borders |
| `size` | `ButtonSize` | `'md'` | Size - affects padding, text size, icon size |
| `fullWidth` | `boolean` | `false` | If `true`, button takes full width of container |
| `isLoading` | `boolean` | `false` | Shows spinner, disables button, hides icon |
| `icon` | `ReactNode` | - | Icon component to display (typically from lucide-react) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of icon relative to text |
| `disabled` | `boolean` | `false` | Disables button (50% opacity, no pointer events) |
| `className` | `string` | - | Additional Tailwind classes to merge |
| `children` | `ReactNode` | - | Button text/content |
| ...rest | `ButtonHTMLAttributes` | - | All standard button HTML attributes (onClick, type, etc.) |

---

## Input Props

```tsx
interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  maxLength?: number;
  showCharCount?: boolean;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
}

interface SingleLineInputProps extends BaseInputProps, 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  multiline?: false;
}

interface MultiLineInputProps extends BaseInputProps, 
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'> {
  type?: 'textarea';
  multiline: true;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

type InputProps = SingleLineInputProps | MultiLineInputProps;
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `InputType` | `'text'` | Input type - controls keyboard, validation, features |
| `label` | `string` | - | Label text shown above input |
| `placeholder` | `string` | - | Placeholder text when empty |
| `error` | `string` | - | Error message - shows below input, changes border to red |
| `helperText` | `string` | - | Helper text shown below input (gray text) |
| `required` | `boolean` | `false` | Shows red asterisk (*) on label |
| `disabled` | `boolean` | `false` | Disables input, 50% opacity, gray background |
| `leftIcon` | `ReactNode` | - | Icon on left side (adds pl-11 padding) |
| `rightIcon` | `ReactNode` | - | Icon on right side (adds pr-11 padding) |
| `maxLength` | `number` | - | Maximum character length |
| `showCharCount` | `boolean` | `false` | Shows "X / maxLength" below input |
| `multiline` | `boolean` | `false` | If `true`, renders textarea instead of input |
| `rows` | `number` | `3` | Textarea rows (only when multiline=true) |
| `resize` | `ResizeType` | `'vertical'` | Textarea resize behavior (only when multiline=true) |
| `className` | `string` | - | Classes for input element |
| `wrapperClassName` | `string` | - | Classes for wrapper div |

**Special Behavior:**
- `type="password"` - Auto-adds show/hide eye icon
- `showCharCount` - Requires `maxLength` to be set
- `error` prop - Overrides border color to red, adds red text below

---

## Card Props

```tsx
interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardStyles> {
  variant?: 'default' | 'elevated' | 'outline' | 'glass' | 'glass-strong' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'auto';
  hoverable?: boolean;
  className?: string;
  children?: ReactNode;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `CardVariant` | `'default'` | Visual style - controls background, borders, shadows |
| `padding` | `CardPadding` | `'md'` | Internal padding: none=0, sm=16px, md=24px, lg=32px |
| `size` | `CardSize` | `'auto'` | Max width constraint (sm=384px ... 4xl=896px) |
| `hoverable` | `boolean` | `false` | Adds hover scale effect (1.02x) and pointer cursor |
| `className` | `string` | - | Additional Tailwind classes |
| `children` | `ReactNode` | - | Card content (use compound components) |

**Compound Components:**
- `CardHeader` - Top section with bottom border
- `CardTitle` - Main heading (text-xl font-semibold)
- `CardDescription` - Secondary text (text-sm text-muted)
- `CardContent` - Main content area
- `CardFooter` - Bottom section with top border, flex layout

---

## Dialog Props

```tsx
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  description?: string;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open`⚠️ | `boolean` | - | **Required** - Controls dialog visibility |
| `onOpenChange`⚠️ | `(open: boolean) => void` | - | **Required** - Callback when dialog opens/closes |
| `title` | `string` | - | Dialog title in header |
| `description` | `string` | - | Dialog description below title |
| `children` | `ReactNode` | - | Dialog content (below header) |
| `position` | `DialogPosition` | `'center'` | Position on screen (center/top/bottom/left/right) |
| `size` | `DialogSize` | `'md'` | Dialog width: sm=384px, md=448px, lg=512px, xl=576px, full=100% |
| `showClose` | `boolean` | `true` | Shows X close button in header |
| `closeOnOverlayClick` | `boolean` | `true` | Closes when clicking outside dialog |
| `className` | `string` | - | Classes for dialog content |

**Animations by Position:**
- `center` - Fade + zoom in/out
- `top` - Slide from top
- `bottom` - Slide from bottom
- `left` - Slide from left
- `right` - Slide from right

---

## Dropdown (Select) Props

```tsx
interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  colorPalette?: string[];
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value`⚠️ | `string` | - | **Required** - Currently selected value (option.value) |
| `onValueChange`⚠️ | `(value: string) => void` | - | **Required** - Callback when selection changes |
| `options`⚠️ | `SelectOption[]` | - | **Required** - Array of options |
| `placeholder` | `string` | `'Select...'` | Text shown when no selection |
| `label` | `string` | - | Label above dropdown |
| `disabled` | `boolean` | `false` | Disables dropdown |
| `maxHeight` | `string` | `'384px'` | Max height of dropdown list |
| `className` | `string` | - | Classes for trigger button |

**SelectOption Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Unique identifier (returned in onValueChange) |
| `label` | `string` | Main display text |
| `description` | `string` | Secondary text below label (optional) |
| `icon` | `ReactNode` | Icon or emoji to show (optional) |
| `colorPalette` | `string[]` | Array of hex colors to show as circles (optional) |
| `disabled` | `boolean` | Disables this option (optional) |

---

## Combobox Props

```tsx
interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  keywords?: string[];
  disabled?: boolean;
}

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: string;
  emptyMessage?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value`⚠️ | `string` | - | **Required** - Currently selected value |
| `onValueChange`⚠️ | `(value: string) => void` | - | **Required** - Callback when selection changes |
| `options`⚠️ | `ComboboxOption[]` | - | **Required** - Array of searchable options |
| `placeholder` | `string` | `'Select...'` | Button placeholder when nothing selected |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `label` | `string` | - | Label above combobox |
| `disabled` | `boolean` | `false` | Disables combobox |
| `maxHeight` | `string` | `'384px'` | Max height of dropdown |
| `emptyMessage` | `string` | `'No results'` | Message when search has no matches |
| `className` | `string` | - | Classes for trigger button |

**ComboboxOption Props:**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Unique identifier |
| `label` | `string` | Main display text (searchable) |
| `description` | `string` | Secondary text (searchable) |
| `icon` | `ReactNode` | Icon or emoji |
| `keywords` | `string[]` | **Additional search terms** - e.g., ['usa', 'america'] for 'United States' |
| `disabled` | `boolean` | Disables this option |

**Search Logic:**
- Searches `label`, `description`, and `keywords` arrays
- Case-insensitive matching
- Filters as you type

---

## Toast API

```tsx
// Toaster component props
interface ToasterProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 
             'bottom-left' | 'bottom-right' | 'bottom-center';
  theme?: 'light' | 'dark' | 'system';
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  closeButton?: boolean;
}

// Toast functions
toast.success(message: string, options?: ToastOptions)
toast.error(message: string, options?: ToastOptions)
toast.info(message: string, options?: ToastOptions)
toast.warning(message: string, options?: ToastOptions)
toast.loading(message: string, options?: ToastOptions)
toast.promise(promise: Promise, messages: PromiseMessages)
toast.custom(message: string, options?: ToastOptions)
toast.dismiss(id?: string | number)
```

**Toaster Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'top-right'` | Where toasts appear on screen |
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Toast color scheme |
| `richColors` | `boolean` | `true` | Better colors for success/error/warning |
| `expand` | `boolean` | `false` | Expand on hover to show more toasts |
| `duration` | `number` | `4000` | Auto-dismiss time in milliseconds |
| `closeButton` | `boolean` | `true` | Show X close button |

**Toast Options:**

| Option | Type | Description |
|--------|------|-------------|
| `description` | `string` | Secondary text below main message |
| `duration` | `number` | Override default duration for this toast |
| `action` | `{ label: string, onClick: () => void }` | Action button (e.g., "Undo") |
| `cancel` | `{ label: string, onClick: () => void }` | Cancel button |
| `onDismiss` | `() => void` | Callback when toast is dismissed |
| `onAutoClose` | `() => void` | Callback when toast auto-closes |

---

## Spinner Props

```tsx
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'current';
  label?: string;
  className?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `SpinnerSize` | `'md'` | Spinner diameter: xs=12px, sm=16px, md=24px, lg=32px, xl=48px |
| `variant` | `SpinnerVariant` | `'primary'` | Color: primary=brand, secondary=gray, white=white, current=inherit |
| `label` | `string` | - | Text shown below spinner |
| `className` | `string` | - | Additional classes |

---

## Skeleton Props

```tsx
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `SkeletonVariant` | `'rectangular'` | Shape: text=h-4 rounded, circular=rounded-full, rectangular=rounded-lg |
| `width` | `string \| number` | - | Width (number=px, string='100%'/'50%'/etc) |
| `height` | `string \| number` | - | Height (number=px, string='100px'/etc) |
| `animation` | `SkeletonAnimation` | `'pulse'` | Animation: pulse=opacity, wave=shimmer, none=static |
| `className` | `string` | - | Additional classes |

**Compound Components:**
- `SkeletonText({ lines?: number })` - Multiple text lines
- `SkeletonCard()` - Image + 2 text lines (200px height)
- `SkeletonAvatar({ size?: number })` - Circular avatar
- `SkeletonButton()` - Button-shaped (40x100px)

---

## Progress Props

```tsx
// Linear Progress
interface ProgressProps {
  value?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

// Circular Progress
interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
}
```

**Progress (Linear) Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Progress 0-100, `undefined` for indeterminate (loading) |
| `variant` | `ProgressVariant` | `'default'` | Color: default=brand, success=green, warning=amber, error=red, gradient |
| `size` | `ProgressSize` | `'md'` | Height: sm=4px, md=8px, lg=12px, xl=16px |
| `showLabel` | `boolean` | `false` | Shows percentage or custom label |
| `label` | `string` | - | Custom label text (instead of percentage) |
| `className` | `string` | - | Additional classes |

**CircularProgress Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Progress 0-100, `undefined` for indeterminate (spinning) |
| `size` | `number` | `48` | Circle diameter in pixels |
| `strokeWidth` | `number` | `4` | Stroke width in pixels |
| `variant` | `CircularVariant` | `'default'` | Color: default=brand, success=green, warning=amber, error=red |
| `showLabel` | `boolean` | `false` | Shows percentage in center |
| `className` | `string` | - | Additional classes |

---

## Context Menu Props

```tsx
interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: 'item' | 'separator';
  disabled?: boolean;
  badge?: number | string;
}

interface ContextMenuProps {
  children: ReactNode;
  items: MenuItem[];
}
```

| Prop | Type | Description |
|------|------|-------------|
| `children`⚠️ | `ReactNode` | **Required** - Element to right-click |
| `items`⚠️ | `MenuItem[]` | **Required** - Menu items |

**MenuItem Props:**

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `ReactNode` | Icon component |
| `onClick` | `() => void` | Click handler |
| `type` | `'item' \| 'separator'` | Type: item=clickable, separator=divider line |
| `disabled` | `boolean` | Disables menu item |
| `badge` | `number \| string` | Badge to show (e.g., notification count) |

---

## Layout Props

### AppLayoutProvider

```tsx
interface AppLayoutProviderProps {
  variant: 'sidebar-left' | 'sidebar-right' | 'top-only';
  sidebarDefaultOpen?: boolean;
  nestedNavStyle?: 'accordion' | 'expandable' | 'hybrid';
  sidebarCollapsible?: boolean;
  sidebarBehavior?: 'push' | 'overlay';
  title?: string;
  logo?: ReactNode;
  user?: UserConfig;
  onLogout?: () => void;
  children: ReactNode;
}

interface UserConfig {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant`⚠️ | `LayoutVariant` | - | **Required** - Layout type |
| `title` | `string` | - | App title in sidebar/topnav |
| `logo` | `ReactNode` | - | Custom logo component |
| `sidebarDefaultOpen` | `boolean` | `true` | Initial sidebar state (desktop) |
| `sidebarCollapsible` | `boolean` | `true` | Can sidebar be toggled? |
| `sidebarBehavior` | `'push' \| 'overlay'` | `'push'` | Push content or overlay it |
| `nestedNavStyle` | `NestedNavStyle` | `'hybrid'` | Multi-level nav behavior |
| `user` | `UserConfig` | - | User info for menu |
| `onLogout` | `() => void` | - | Logout callback |
| `children` | `ReactNode` | - | App content |

### NavItem

```tsx
interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  badge?: string | number;
  children?: NavItem[];
}
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `ReactNode` | Icon component (w-5 h-5 for top-level, w-4 h-4 for nested) |
| `path` | `string` | Route path |
| `badge` | `string \| number` | Badge to show (e.g., notification count) |
| `children` | `NavItem[]` | Nested navigation items |

---

## Theme Types

```tsx
type Theme = 'light' | 'dark' | 'glass-light' | 'glass-dark' | 'midnight' | 'slate' | 'system';
type ResolvedTheme = 'light' | 'dark' | 'glass-light' | 'glass-dark' | 'midnight' | 'slate';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  resolvedTheme: ResolvedTheme;
  systemTheme: 'light' | 'dark';
}
```

---

## 🔗 Related Documentation

- [Component Guide](./COMPONENTS.md) - Usage examples
- [Examples](./EXAMPLES.md) - Real-world patterns
- [Layout Guide](./LAYOUT.md) - Layout configuration

---

**This reference is auto-generated from TypeScript types. For usage examples, see [Component Guide](./COMPONENTS.md).**
