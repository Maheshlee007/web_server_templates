import { Button } from '@/components/UI/Buttons/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/UI/Card';
import { ThemeSelector } from '@/components/UI/ThemeSelector';
import { ArrowRight, Download, Trash2, Check, ExternalLink } from 'lucide-react';

export default function ComponentTest() {
  return (
    <div className="min-h-screen bg-(--color-bg) p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-(--color-text)">
            Component Testing Ground
          </h1>
          <p className="text-(--color-text-secondary)">
            Testing all button variants, card sizes, and theme compatibility
          </p>
        </div>

        {/* Theme Selector - Compact Dropdown */}
        <Card variant="glass-strong" padding="lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-(--color-text)">
                Theme Selection
              </h3>
              <p className="text-sm text-(--color-text-muted)">
                Choose from 6 professional themes with visual color previews
              </p>
            </div>
            <ThemeSelector />
          </div>
        </Card>

        {/* Button Variants Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-(--color-text) mb-2">
              Button Variants
            </h2>
            <p className="text-(--color-text-secondary)">
              All button variants with proper foreground colors
            </p>
          </div>

          {/* Primary Variants */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Primary & Status Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">Glass</Button>
            </div>
          </Card>

          {/* NEW: Gradient & Link Variants */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              ✨ New: Gradient & Link Buttons
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="gradient">Gradient Button</Button>
              <Button variant="gradient" leftIcon={<Download size={18} />}>
                Download
              </Button>
              <Button variant="gradient-border">Gradient Border</Button>
              <Button variant="link">Link Button</Button>
              <Button variant="link" rightIcon={<ExternalLink size={16} />}>
                External Link
              </Button>
            </div>
          </Card>

          {/* Button Sizes */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Button Sizes
            </h3>
            <div className="flex flex-wrap gap-3 items-end">
              <Button variant="primary" size="xs">Extra Small</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
          </Card>

          {/* Icon Buttons */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Icon Buttons
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="icon-sm">
                <Check size={16} />
              </Button>
              <Button variant="success" size="icon">
                <Check size={18} />
              </Button>
              <Button variant="danger" size="icon-lg">
                <Trash2 size={20} />
              </Button>
              <Button variant="gradient" size="icon">
                <Download size={18} />
              </Button>
            </div>
          </Card>

          {/* Buttons with Icons */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Buttons with Icons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" leftIcon={<Download size={18} />}>
                Download
              </Button>
              <Button variant="danger" leftIcon={<Trash2 size={18} />}>
                Delete
              </Button>
              <Button variant="outline" rightIcon={<ArrowRight size={18} />}>
                Continue
              </Button>
              <Button variant="gradient" leftIcon={<Check size={18} />} rightIcon={<ArrowRight size={18} />}>
                Complete
              </Button>
            </div>
          </Card>

          {/* Loading States */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Loading States
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="success" isLoading>Saving</Button>
              <Button variant="danger" isLoading>Deleting</Button>
              <Button variant="gradient" isLoading>Processing</Button>
            </div>
          </Card>

          {/* Full Width */}
          <Card variant="glass-strong" padding="lg">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Full Width Buttons
            </h3>
            <div className="space-y-3 max-w-md">
              <Button variant="primary" fullWidth>Full Width Primary</Button>
              <Button variant="gradient" fullWidth leftIcon={<Download size={18} />}>
                Full Width Gradient
              </Button>
              <Button variant="outline" fullWidth>Full Width Outline</Button>
            </div>
          </Card>
        </section>

        {/* Card Variants Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-(--color-text) mb-2">
              Card Variants & Sizes
            </h2>
            <p className="text-(--color-text-secondary)">
              Testing card variants with proper theming
            </p>
          </div>

          {/* Card Variants */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Perfect for most use cases
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Stands out with elevation
                </p>
              </CardContent>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>Transparent with border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Minimal and clean
                </p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Frosted glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Beautiful glassmorphism
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-strong">
              <CardHeader>
                <CardTitle>Glass Strong</CardTitle>
                <CardDescription>More prominent glass</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Enhanced visibility
                </p>
              </CardContent>
            </Card>

            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
                <CardDescription className="text-gray-300">
                  Premium dark gradient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Eye-catching design
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Card Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-(--color-text)">
              ✨ New: Card Sizes
            </h3>
            
            <Card variant="glass-strong" size="sm">
              <CardHeader>
                <CardTitle>Small Card (sm)</CardTitle>
                <CardDescription>max-w-sm (24rem / 384px)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Perfect for compact content
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-strong" size="md">
              <CardHeader>
                <CardTitle>Medium Card (md)</CardTitle>
                <CardDescription>max-w-md (28rem / 448px)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Good for most content
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-strong" size="lg">
              <CardHeader>
                <CardTitle>Large Card (lg)</CardTitle>
                <CardDescription>max-w-lg (32rem / 512px)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  More spacious layout
                </p>
              </CardContent>
            </Card>

            <Card variant="glass-strong" size="2xl">
              <CardHeader>
                <CardTitle>2XL Card (2xl)</CardTitle>
                <CardDescription>max-w-2xl (42rem / 672px)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Wide content area
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card variant="glass-strong" hoverable>
              <CardHeader>
                <CardTitle>Hoverable Card</CardTitle>
                <CardDescription>Try hovering!</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Scales up on hover
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" hoverable>
              <CardHeader>
                <CardTitle>Clickable Card</CardTitle>
                <CardDescription>Interactive element</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-(--color-text-secondary)">
                  Use for navigation
                </p>
              </CardContent>
            </Card>

            <Card variant="gradient" hoverable>
              <CardHeader>
                <CardTitle>Gradient Hover</CardTitle>
                <CardDescription className="text-gray-300">
                  Premium interaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Stands out beautifully
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Card with Footer */}
          <Card variant="glass-strong" size="lg">
            <CardHeader>
              <CardTitle>Complete Card Example</CardTitle>
              <CardDescription>
                With header, content, and footer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-(--color-text-secondary) mb-4">
                This card demonstrates all sections including a footer with action buttons.
                The new gradient button variant looks amazing here!
              </p>
              <div className="flex gap-2 text-sm">
                <span className="px-2 py-1 bg-(--color-brand-light) text-(--color-brand) rounded-md">
                  Feature 1
                </span>
                <span className="px-2 py-1 bg-(--color-success-light) text-(--color-success) rounded-md">
                  Feature 2
                </span>
                <span className="px-2 py-1 bg-(--color-accent-light) text-(--color-accent) rounded-md">
                  Feature 3
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="gradient" leftIcon={<Check size={18} />}>
                Approve
              </Button>
              <Button variant="outline">Review</Button>
              <Button variant="ghost">Cancel</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Theme Compatibility Note */}
        <Card variant="gradient" padding="lg">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white ">
              ✅ Theme Compatibility Fixed
            </h3>
            <p className="text-gray-200">
              All components now properly support light and dark themes with correct foreground colors:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Brand, Secondary, Accent buttons have proper contrast in both themes</li>
              <li>Success, Warning, Error buttons use appropriate foreground colors</li>
              <li>New gradient and link button variants</li>
              <li>Card sizes (sm, md, lg, xl, 2xl, 3xl, 4xl) for better layout control</li>
              <li>All CSS variables properly scoped with (--color-*) syntax</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
