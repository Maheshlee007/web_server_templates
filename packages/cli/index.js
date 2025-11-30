#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import enquirer from 'enquirer';
const { Select, Input, Confirm } = enquirer;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get templates from the templates directory
const templatesPath = path.resolve(__dirname, '../templates');

// Template descriptions and metadata
const templateDescriptions = {
    'react-tailwind': {
        name: 'React + TypeScript + Tailwind CSS',
        description: 'Modern React app with TypeScript, Tailwind CSS, and basic navigation components',
        features: ['✨ TypeScript', '🎨 Tailwind CSS', '🧭 Navigation Components', '⚡ Vite']
    },
    'react-taliwind4': {
        name: 'React + Tailwind CSS v4',
        description: 'React app with the latest Tailwind CSS v4',
        features: ['✨ TypeScript', '🎨 Tailwind CSS v4', '⚡ Vite', '🚀 Modern Setup']
    },
    'react-ts-basic': {
        name: 'React + TypeScript (Basic)',
        description: 'Simple React app with TypeScript setup',
        features: ['✨ TypeScript', '⚛️ React 18', '⚡ Vite', '🎯 ESLint']
    }
};

async function getAvailableTemplates() {
    try {
        const items = await fs.readdir(templatesPath);
        const templates = [];
        
        for (const item of items) {
            const itemPath = path.join(templatesPath, item);
            const stat = await fs.stat(itemPath);
            if (stat.isDirectory()) {
                // Just use the folder name for the choice
                templates.push(item);
            }
        }
        
        return templates;
    } catch (error) {
        console.error('Error reading templates directory:', error.message);
        console.error('Templates path:', templatesPath);
        return [];
    }
}

function validateProjectName(input) {
    if (!input || input.trim().length === 0) {
        return 'Project name cannot be empty';
    }
    
    // Check for invalid characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(input)) {
        return 'Project name contains invalid characters: < > : " / \\ | ? *';
    }
    
    // Check if starts with dot or dash
    if (input.startsWith('.') || input.startsWith('-')) {
        return 'Project name cannot start with "." or "-"';
    }
    
    // Check length
    if (input.length > 100) {
        return 'Project name is too long (max 100 characters)';
    }
    
    // Check for reserved names
    const reserved = ['con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'];
    if (reserved.includes(input.toLowerCase())) {
        return 'Project name cannot be a reserved system name';
    }
    
    return true;
}

function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function run() {
    const templates = await getAvailableTemplates();
    if (templates.length === 0) {
        console.error('❌ No templates found in packages/templates');
        return;
    }

    // Interactive template selection with color
    const template = await new Select({
        name: 'template',
        message: chalk.bold.cyan('Select a template:'),
        choices: templates.map(t => ({
            name: t,
            message: chalk.cyan(t),
            value: t
        }))
    }).run();

    // Project name input
    const projectNameInput = await new Input({
        name: 'projectName',
        message: chalk.bold('Create a project name? (leave blank to use current directory)')
    }).run();

    let projectName = projectNameInput.trim();
    let projectDir;

    if (projectName === '' || projectName === '.') {
        // Use current directory
        projectDir = process.cwd();
        projectName = path.basename(projectDir);
        const files = await fs.readdir(projectDir);
        const nonHiddenFiles = files.filter(file => !file.startsWith('.'));
        if (nonHiddenFiles.length > 0) {
            const overwrite = await new Confirm({
                name: 'overwrite',
                message: chalk.yellow('The current directory is not empty. Are you sure you want to continue?')
            }).run();
            if (!overwrite) {
                console.log(chalk.red('Operation cancelled.'));
                return;
            }
        }
    } else {
        // User entered a name, validate it
        const validationResult = validateProjectName(projectName);
        if (validationResult !== true) {
            console.error(chalk.red(`Error: ${validationResult}`));
            return;
        }
        projectDir = path.resolve(process.cwd(), projectName);
        if (await fs.pathExists(projectDir)) {
            console.error(chalk.red(`Error: Directory "${projectName}" already exists.`));
            return;
        }
    }

    const templateDir = path.resolve(templatesPath, template);
    if (!(await fs.pathExists(templateDir))) {
        console.error(chalk.red(`Error: Template directory ${templateDir} does not exist.`));
        return;
    }
    console.log(chalk.green(`\nCreating project in ${projectDir}...`));
    try {
        await fs.ensureDir(projectDir);
        await fs.copy(templateDir, projectDir, {
            filter: (src) => !src.includes('node_modules') && !src.includes('pnpm-lock.yaml'),
        });
        console.log(chalk.green('\nProject created successfully!'));
        console.log(chalk.bold('Next steps:'));
        if (projectName !== path.basename(process.cwd())) {
            console.log(chalk.cyan(`  cd ${projectName}`));
        }
        console.log(chalk.cyan('  npm install (or pnpm install)'));
        console.log(chalk.cyan('  npm run dev'));
    } catch (err) {
        console.error(chalk.red('Error copying template:', err));
    }
}

run();