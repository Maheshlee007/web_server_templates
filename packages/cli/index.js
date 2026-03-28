#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import enquirer from 'enquirer';
const { Select, Input, Confirm } = enquirer;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesPath = path.resolve(__dirname, './templates');

// ── Template Metadata ─────────────────────────────────────────
// Maps folder names to rich descriptions shown in the CLI
const templateMetadata = {
  'react18-tailwind4': {
    name: 'React 18 + Tailwind CSS v4',
    description: 'Modern React with Tailwind v4, multi-theme system, Radix UI components',
    features: ['TypeScript', 'Tailwind CSS v4', 'Radix UI', '6 Themes', 'Vite'],
    postSetup: (name) => [
      name !== '.' ? `cd ${name}` : null,
      'pnpm install',
      'pnpm run dev',
    ].filter(Boolean),
  },
  'react18-tailwind3': {
    name: 'React 18 + Tailwind CSS v3',
    description: 'React with Tailwind v3, navigation components, clean starter',
    features: ['TypeScript', 'Tailwind CSS v3', 'Vite', 'Navigation'],
    postSetup: (name) => [
      name !== '.' ? `cd ${name}` : null,
      'npm install',
      'npm run dev',
    ].filter(Boolean),
  },
  'react18-fastify': {
    name: 'React 18 + Fastify (Full-Stack)',
    description: 'Full-stack app with Fastify API, JWT auth, RBAC, SQL Server',
    features: ['TypeScript', 'Fastify 5', 'JWT Auth', 'RBAC', 'React 18', 'Tailwind v4'],
    postSetup: (name) => [
      name !== '.' ? `cd ${name}` : null,
      '# Backend setup:',
      'cd Backend && pnpm install',
      'cp .env.example .env   # Then edit with your values',
      '# Frontend setup:',
      'cd ../Frontend && pnpm install',
      'pnpm run dev',
    ].filter(Boolean),
  },
  'react19-ts-basic': {
    name: 'React 19 + TypeScript (Basic)',
    description: 'Minimal React 19 starter with TypeScript and Vite',
    features: ['TypeScript', 'React 19', 'Vite', 'ESLint'],
    postSetup: (name) => [
      name !== '.' ? `cd ${name}` : null,
      'npm install',
      'npm run dev',
    ].filter(Boolean),
  },
};

// ── Helpers ───────────────────────────────────────────────────

async function getAvailableTemplates() {
  try {
    const items = await fs.readdir(templatesPath);
    const templates = [];
    for (const item of items) {
      const itemPath = path.join(templatesPath, item);
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        templates.push(item);
      }
    }
    return templates;
  } catch (error) {
    console.error(chalk.red('Error reading templates directory:'), error.message);
    return [];
  }
}

function validateProjectName(input) {
  if (!input || input.trim().length === 0) {
    return 'Project name cannot be empty';
  }
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(input)) {
    return 'Project name contains invalid characters: < > : " / \\ | ? *';
  }
  if (input.startsWith('.') || input.startsWith('-')) {
    return 'Project name cannot start with "." or "-"';
  }
  if (input.length > 100) {
    return 'Project name is too long (max 100 characters)';
  }
  const reserved = ['con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'];
  if (reserved.includes(input.toLowerCase())) {
    return 'Project name cannot be a reserved system name';
  }
  return true;
}

function getMeta(folderName) {
  return templateMetadata[folderName] || {
    name: folderName,
    description: 'Project template',
    features: [],
    postSetup: (name) => [name !== '.' ? `cd ${name}` : null, 'npm install', 'npm run dev'].filter(Boolean),
  };
}

function formatFeatures(features) {
  return features.map(f => chalk.dim(`• ${f}`)).join('  ');
}

// ── Progress indicator ────────────────────────────────────────
function createSpinner(text) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.cyan(frames[i++ % frames.length])} ${text}`);
  }, 80);
  return {
    stop(finalText) {
      clearInterval(interval);
      process.stdout.write(`\r${chalk.green('✔')} ${finalText}\n`);
    },
    fail(finalText) {
      clearInterval(interval);
      process.stdout.write(`\r${chalk.red('✖')} ${finalText}\n`);
    },
  };
}

// ── Main ──────────────────────────────────────────────────────
async function run() {
  // Banner
  const pkg = JSON.parse(await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8'));
  console.log('');
  console.log(chalk.bold.cyan('  create-webstack-app') + chalk.dim(` v${pkg.version}`));
  console.log(chalk.dim('  Scaffold modern web applications\n'));

  // Discover templates
  const templates = await getAvailableTemplates();
  if (templates.length === 0) {
    console.error(chalk.red('  ✖ No templates found. Ensure templates/ directory exists.'));
    return;
  }

  // Template selection with rich descriptions
  const template = await new Select({
    name: 'template',
    message: chalk.bold('Select a template'),
    choices: templates.map(t => {
      const meta = getMeta(t);
      return {
        name: t,
        message: `${chalk.bold.white(meta.name)}\n     ${chalk.dim(meta.description)}\n     ${formatFeatures(meta.features)}`,
        value: t,
      };
    }),
  }).run();

  // Project name
  const projectNameInput = await new Input({
    name: 'projectName',
    message: chalk.bold('Project name') + chalk.dim(' (blank = current directory)'),
  }).run();

  let projectName = projectNameInput.trim();
  let projectDir;

  if (projectName === '' || projectName === '.') {
    projectDir = process.cwd();
    projectName = path.basename(projectDir);
    const files = await fs.readdir(projectDir);
    const nonHiddenFiles = files.filter(file => !file.startsWith('.'));
    if (nonHiddenFiles.length > 0) {
      const overwrite = await new Confirm({
        name: 'overwrite',
        message: chalk.yellow('Current directory is not empty. Continue anyway?'),
      }).run();
      if (!overwrite) {
        console.log(chalk.dim('\n  Cancelled.\n'));
        return;
      }
    }
  } else {
    const validationResult = validateProjectName(projectName);
    if (validationResult !== true) {
      console.error(chalk.red(`\n  ✖ ${validationResult}\n`));
      return;
    }
    projectDir = path.resolve(process.cwd(), projectName);
    if (await fs.pathExists(projectDir)) {
      console.error(chalk.red(`\n  ✖ Directory "${projectName}" already exists.\n`));
      return;
    }
  }

  // Copy template
  const templateDir = path.resolve(templatesPath, template);
  if (!(await fs.pathExists(templateDir))) {
    console.error(chalk.red(`\n  ✖ Template directory not found: ${template}\n`));
    return;
  }

  const spinner = createSpinner('Scaffolding project...');
  try {
    await fs.ensureDir(projectDir);
    await fs.copy(templateDir, projectDir, {
      filter: (src) => {
        const relativePath = path.relative(templateDir, src);
        return (
          !relativePath.includes('.npmignore') &&
          !relativePath.includes('node_modules') &&
          !src.includes('pnpm-lock.yaml') &&
          !src.includes('package-lock.json')
        );
      },
    });
    spinner.stop('Project scaffolded successfully!');
  } catch (err) {
    spinner.fail('Failed to scaffold project');
    console.error(chalk.red(`  ${err.message}\n`));
    return;
  }

  // Success + next steps
  const meta = getMeta(template);
  const steps = meta.postSetup(projectName === path.basename(process.cwd()) ? '.' : projectName);

  console.log('');
  console.log(chalk.bold.green('  ✔ Done!') + chalk.dim(` Created ${chalk.white(projectName)} with ${chalk.white(meta.name)}`));
  console.log('');
  console.log(chalk.bold('  Next steps:\n'));
  steps.forEach(step => {
    if (step.startsWith('#')) {
      console.log(chalk.dim(`    ${step}`));
    } else {
      console.log(chalk.cyan(`    ${step}`));
    }
  });
  console.log('');
}

run().catch((err) => {
  if (err?.message === '' || err?.code === 'ERR_USE_AFTER_CLOSE') {
    console.log(chalk.dim('\n  Cancelled.\n'));
  } else {
    console.error(chalk.red(err?.message || err));
  }
  process.exit(1);
});
