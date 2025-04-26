import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

export async function diagnoseEnvironment() {
  console.log('\n=== Environment Diagnosis ===');
  
  // Check Expo version and dependencies
  console.log('Expo Version:', Constants.expoVersion);
  console.log('React Native Version:', require('react-native/package.json').version);
  
  // Check file system access
  try {
    const appDir = FileSystem.documentDirectory;
    console.log('File System Access:', !!appDir);
  } catch (error) {
    console.error('File System Error:', error);
  }
  
  // Check JSON loading
  try {
    const configFile = require('../data/config.json');
    console.log('JSON Loading:', !!configFile);
    console.log('Content Sources:', configFile.contentSources?.length || 0);
  } catch (error) {
    console.error('JSON Loading Error:', error);
  }
  
  // Check TypeScript configuration
  console.log('TypeScript Config:', {
    moduleResolution: require('../tsconfig.json').compilerOptions?.moduleResolution,
    allowJs: require('../tsconfig.json').compilerOptions?.allowJs,
    resolveJsonModule: require('../tsconfig.json').compilerOptions?.resolveJsonModule
  });

  console.log('========================\n');
}

export async function validateContentLoading() {
  console.log('\n=== Content Loading Validation ===');
  
  try {
    // Test direct JSON import
    const testFile = await import('../data/json/test_sync.json');
    console.log('Direct JSON Import:', !!testFile);
  } catch (error) {
    console.error('Direct Import Error:', error);
  }
  
  try {
    // Test file system read
    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory + 'data/json'
    );
    console.log('JSON Files Found:', files.length);
  } catch (error) {
    console.error('File Read Error:', error);
  }
  
  console.log('============================\n');
}