# CI Troubleshooting Guide

**Project**: Built To Deploy  
**CI Workflow**: `.github/workflows/ci.yml`  
**Scope**: React dashboard in `dashboard/` directory

---

## CI Pass Criteria

All commands run in `dashboard/` directory:

1. `npm run build` - Clean React 19 production build
2. `npm run lint` - Zero ESLint errors

---

## Known Failure Patterns

### 1. Build Failures from Bad Imports

**Symptom**: `Module not found` or `Failed to resolve import` during build

**Root Cause**: Importing a component or module that does not exist

**Troubleshooting**:
- Check the import path in the error message
- Verify the target file exists in `dashboard/src/`
- Run `cd dashboard && npm run build` locally to reproduce

**Prevention**: Always verify import targets exist before committing

---

### 2. ESLint Errors

**Symptom**: `npm run lint` exits with errors

**Root Cause**: Code style violations, unused variables, missing types

**Troubleshooting**:
- Run `cd dashboard && npm run lint` locally
- Fix each error shown in output
- Common fixes: remove unused imports, add missing return types, fix indentation

**Prevention**: Run lint before committing

---

### 3. React 19 Compatibility Issues

**Symptom**: Build warnings or errors about deprecated React APIs

**Root Cause**: Using React 18 patterns that changed in React 19

**Troubleshooting**:
- Check React 19 migration guide for breaking changes
- Common changes: `ReactDOM.render` replaced with `createRoot`, new JSX transform

**Prevention**: Use functional components with hooks, avoid deprecated lifecycle methods

---

### 4. Working Directory Mistakes

**Symptom**: `npm ERR! missing script` or `package.json not found`

**Root Cause**: Running commands in repo root instead of `dashboard/` subdirectory

**Troubleshooting**:
- All npm commands must run inside `dashboard/`
- Check CI workflow shows `working-directory: dashboard`
- Verify you're in correct directory: `pwd` should show `.../dashboard`

**Prevention**: Always `cd dashboard` before running npm commands

---

### 5. Static Site vs Dashboard Confusion

**Symptom**: Changes to static site files break dashboard build or vice versa

**Root Cause**: This repo has two parts - a static site (root) and a React dashboard (`dashboard/`). CI only checks the dashboard.

**Troubleshooting**:
- Identify which part your changes affect
- Dashboard changes need lint + build to pass
- Static site changes (root `index.html`, `styles.css`) are not CI-checked

**Prevention**: Understand project structure before making changes

---

## Optimal Troubleshooting Strategy

1. **Check which job failed** - build or lint? Each has different fixes
2. **Reproduce locally** - `cd dashboard && npm run build && npm run lint`
3. **Read the error line** - CI logs show exact file and line number
4. **Fix one error at a time** - lint errors cascade, fix first one and re-run
5. **Verify working directory** - all commands run in `dashboard/`, not repo root

---

## Quick Reference

```bash
# Reproduce CI locally
cd dashboard
npm ci
npm run build
npm run lint

# Common fixes
npm run lint          # See all lint errors
npm run build         # See build errors with file paths
```

---

## CI Workflow Details

- **Triggers**: PRs and pushes to `main` or `dev` branches
- **Node Version**: 20
- **Package Manager**: npm with `npm ci` (clean install)
- **Cache**: npm cache based on `dashboard/package-lock.json`
