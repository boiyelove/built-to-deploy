# CI Troubleshooting Guide

This document covers common CI failure patterns, their root causes, and fix strategies for this project.

## CI Pipeline Overview

The CI pipeline runs on every PR and push to main/dev branches. It consists of two jobs:

1. **root-build**: Builds the static site in the repository root
2. **dashboard-build**: Builds and lints the React dashboard in the `dashboard/` directory

Both jobs must pass for CI to succeed.

### Dashboard Pass Criteria

All commands run in the `dashboard/` directory:

1. `npm run build` - Clean React 19 production build with no errors
2. `npm run lint` - Zero ESLint errors

## Known Failure Patterns

### 1. Build Failures from Bad Imports

**Symptom**: `Module not found` or `Failed to resolve import` during build

**Root Cause**: Importing a component or module that does not exist or has an incorrect path

**Troubleshooting**:
- Check the import path in the error message
- Verify the target file exists in `dashboard/src/`
- Run `cd dashboard && npm run build` locally to reproduce
- Check for typos in file names or paths
- Verify the file extension matches (.tsx, .ts, .jsx, .js)

**Prevention**: Always verify import targets exist before committing

### 2. ESLint Errors

**Symptom**: `npm run lint` exits with errors

**Root Cause**: Code style violations, unused variables, missing types, or other linting rule violations

**Troubleshooting**:
- Run `cd dashboard && npm run lint` locally
- Fix each error reported by ESLint
- Common fixes:
  - Remove unused imports and variables
  - Add missing return types
  - Fix indentation and formatting
  - Add missing dependencies to useEffect hooks

**Prevention**: Run lint before committing changes

### 3. React 19 Compatibility Issues

**Symptom**: Build warnings or errors about deprecated React APIs

**Root Cause**: Using React 18 patterns that changed or were removed in React 19

**Troubleshooting**:
- Check React 19 migration guide for breaking changes
- Common changes:
  - `ReactDOM.render` replaced with `createRoot`
  - New JSX transform (no need to import React in every file)
  - Changes to ref handling and forwarding

**Prevention**: Use functional components with hooks. Avoid deprecated lifecycle methods.

### 4. Working Directory Mistakes

**Symptom**: `npm ERR! missing script` or `package.json not found`

**Root Cause**: Running commands in the repository root instead of the `dashboard/` subdirectory

**Troubleshooting**:
- All dashboard npm commands must run inside `dashboard/`
- Check that you're in the correct directory: `pwd` should show `.../dashboard`
- The CI workflow uses `working-directory: dashboard` for all dashboard commands

**Prevention**: Always `cd dashboard` before running npm commands for the dashboard

### 5. Static Site vs Dashboard Confusion

**Symptom**: Changes to static site files break dashboard build or vice versa

**Root Cause**: This repository has two parts:
- Static site (repository root)
- React dashboard (`dashboard/` subdirectory)

CI checks both, but they are independent projects with separate dependencies.

**Troubleshooting**:
- Identify which part your changes affect
- Dashboard changes require passing both `npm run build` and `npm run lint` in `dashboard/`
- Static site changes require passing `npm run build` in the repository root
- Each has its own `package.json` and dependencies

**Prevention**: Understand which part of the project you're modifying

### 6. Dependency Issues

**Symptom**: Build fails with missing package errors or version conflicts

**Root Cause**: `package-lock.json` out of sync with `package.json`, or missing dependencies

**Troubleshooting**:
- Run `cd dashboard && npm ci` to install exact versions from lock file
- If adding new dependencies, ensure `package-lock.json` is committed
- Check that the dependency exists in `package.json`

**Prevention**: Always commit both `package.json` and `package-lock.json` when adding dependencies

## Optimal Troubleshooting Strategy

1. **Check which job failed** - Look at the CI logs to see if it was root-build or dashboard-build, and whether it failed on build or lint
2. **Reproduce locally** - Run the exact commands that failed:
   - For dashboard: `cd dashboard && npm run build && npm run lint`
   - For root: `npm run build`
3. **Read the error line** - CI logs show the exact file and line number where the error occurred
4. **Fix one error at a time** - Lint errors can cascade; fix the first error and re-run to see if others resolve
5. **Verify working directory** - Ensure you're running commands in the correct directory (dashboard commands in `dashboard/`, root commands in root)
6. **Test before pushing** - Run both build and lint locally before pushing to ensure CI will pass

## Quick Reference

### Local Testing Commands

```bash
# Test dashboard build and lint
cd dashboard
npm ci
npm run build
npm run lint

# Test root build
cd ..
npm ci
npm run build
```

### Common Fixes

- **Unused import**: Remove the import statement
- **Missing type**: Add TypeScript type annotation
- **Module not found**: Check import path and file existence
- **Lint error**: Run `npm run lint` and follow the error messages
- **Build error**: Run `npm run build` and check the stack trace
