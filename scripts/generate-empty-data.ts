/**
 * Build-time script to generate empty form data templates from TypeScript type definitions
 * This ensures FormData.ts is the single source of truth
 *
 * Run: npm run generate:empty-data
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const FORM_DATA_FILE = path.resolve(
  __dirname,
  '../src/domain/form/types/formData.ts',
);
const OUTPUT_FILE = path.resolve(
  __dirname,
  '../src/domain/form/types/formDataTemplates.generated.ts',
);

// Types we want to generate empty objects for
const TARGET_TYPES = [
  'ClientData',
  'IntakeVLOSData',
  'IntakeOSAData',
  'IntakePulmanData',
  'IntakeRebacareData',
  'IntakeOSBData',
  'IntakeOVACData',
  'IntakeInsolesData',
  'CheckFoliepasData',
];

interface TypeInfo {
  name: string;
  properties: Map<string, PropertyInfo>;
}

interface PropertyInfo {
  name: string;
  type: string;
  isOptional: boolean;
  isArray: boolean;
  isRecord: boolean;
}

function getDefaultValue(prop: PropertyInfo): string {
  if (prop.isArray) {
    return '[]';
  }
  if (prop.isRecord) {
    return '{}';
  }

  const baseType = prop.type.replace(/\s*\|\s*undefined/g, '');

  if (baseType === 'string') {
    return "''";
  }
  if (baseType === 'number') {
    return '0';
  }
  if (baseType === 'boolean') {
    return 'false';
  }
  if (baseType.startsWith('Record<')) {
    return '{}';
  }
  if (baseType === 'Side' || baseType === "'left' | 'right' | 'both'") {
    return "'both'";
  }

  // Handle union types with string literals
  if (baseType.includes('|')) {
    // Extract the first literal type if available
    const literalMatch = baseType.match(/'([^']+)'/);
    if (literalMatch) {
      // If it's optional, use undefined to avoid type errors
      if (prop.isOptional) {
        return 'undefined';
      }
      return `'${literalMatch[1]}'`;
    }
    // Otherwise return undefined for optional or empty string for required
    return prop.isOptional ? 'undefined' : "''";
  }

  // For other types with single quotes (string literals)
  if (baseType.includes("'")) {
    return prop.isOptional ? 'undefined' : baseType;
  }

  return prop.isOptional ? 'undefined' : "''";
}

function extractTypeInfo(
  sourceFile: ts.SourceFile,
  typeName: string,
  checker: ts.TypeChecker,
): TypeInfo | null {
  const typeInfo: TypeInfo = {
    name: typeName,
    properties: new Map(),
  };

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && node.name.text === typeName) {
      // Handle interface inheritance
      if (node.heritageClauses) {
        for (const clause of node.heritageClauses) {
          for (const type of clause.types) {
            const baseTypeName = type.expression.getText(sourceFile);
            const baseTypeInfo = extractTypeInfo(
              sourceFile,
              baseTypeName,
              checker,
            );
            if (baseTypeInfo) {
              // Merge base type properties
              baseTypeInfo.properties.forEach((prop, key) => {
                typeInfo.properties.set(key, prop);
              });
            }
          }
        }
      }

      // Add this interface's properties (they override base properties)
      node.members.forEach(member => {
        if (
          ts.isPropertySignature(member) &&
          member.name &&
          ts.isIdentifier(member.name)
        ) {
          const propName = member.name.text;
          const isOptional = !!member.questionToken;

          let propType = 'unknown';
          let isArray = false;
          let isRecord = false;

          if (member.type) {
            propType = member.type.getText(sourceFile);
            isArray = ts.isArrayTypeNode(member.type);
            isRecord = propType.startsWith('Record<');
          }

          typeInfo.properties.set(propName, {
            name: propName,
            type: propType,
            isOptional,
            isArray,
            isRecord,
          });
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return typeInfo.properties.size > 0 ? typeInfo : null;
}

function generateEmptyObject(typeInfo: TypeInfo): string {
  const lines: string[] = [];

  typeInfo.properties.forEach(prop => {
    const value = getDefaultValue(prop);
    lines.push(`  ${prop.name}: ${value},`);
  });

  return `export const empty${typeInfo.name}Template: ${typeInfo.name} = {\n${lines.join('\n')}\n};`;
}

function main() {
  console.log('🔧 Generating empty form data templates...');

  // Read and parse the source file
  const program = ts.createProgram([FORM_DATA_FILE], {
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.ESNext,
  });

  const sourceFile = program.getSourceFile(FORM_DATA_FILE);
  if (!sourceFile) {
    console.error('❌ Could not read formData.ts');
    process.exit(1);
  }

  const checker = program.getTypeChecker();

  // Extract type information
  const typeInfos: TypeInfo[] = [];
  for (const typeName of TARGET_TYPES) {
    const info = extractTypeInfo(sourceFile, typeName, checker);
    if (info) {
      typeInfos.push(info);
      console.log(
        `✓ Extracted ${typeName} (${info.properties.size} properties)`,
      );
    } else {
      console.warn(`⚠ Could not extract ${typeName}`);
    }
  }

  // Generate output file
  const imports = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated by: scripts/generate-empty-data.ts
 * Source: src/domain/form/types/formData.ts
 * 
 * Run 'npm run generate:empty-data' to regenerate
 */

import type {
${TARGET_TYPES.map(t => `  ${t},`).join('\n')}
} from '@/domain/form/types/formData';

`;

  const templates = typeInfos
    .map(info => generateEmptyObject(info))
    .join('\n\n');

  const exports = `
/**
 * Complete empty form data object with all templates
 */
export const emptyFormData = {
  client: emptyClientDataTemplate,
  intakeVLOS: emptyIntakeVLOSDataTemplate,
  intakeOSA: emptyIntakeOSADataTemplate,
  intakePulman: emptyIntakePulmanDataTemplate,
  intakeRebacare: emptyIntakeRebacareDataTemplate,
  intakeOSB: emptyIntakeOSBDataTemplate,
  intakeOVAC: emptyIntakeOVACDataTemplate,
  intakeInsoles: emptyIntakeInsolesDataTemplate,
  checkFoliepas: emptyCheckFoliepasDataTemplate,
};
`;

  const output = imports + templates + exports;

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

  console.log(`✅ Generated ${OUTPUT_FILE}`);
  console.log(`📊 Total types: ${typeInfos.length}`);
  console.log(
    `📦 Total properties: ${typeInfos.reduce((sum, t) => sum + t.properties.size, 0)}`,
  );
}

main();
