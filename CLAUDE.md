## Project Structure

This is a monorepo managed by pnpm and Turborepo containing:

- `apps/` - The directory where all applications in the monorepo live
- `apps/web/` - Next.js 15 frontend application with React 19
- `apps/backend/` - NestJS backend API application
- `packages/` - The directory where all shared packages live
- `packages/ui/` - UI component library using shadcn/ui
- `packages/eslint-config/` - Shared ESLint configuration
- `packages/typescript-config/` - Shared TypeScript configuration

## Commands

This project uses pnpm with workspaces. Always use `pnpm` instead of npm or yarn.

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development servers for all apps
- `pnpm build` - Build all apps
- `pnpm lint` - Run linting across all packages
- `pnpm check-types` - Type checking across all packages
- `pnpm format` - Format code
