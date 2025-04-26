import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import type { ContentItem } from '../models/ContentTypes';

/**
 * Test JSON import
 */
const testJsonImport = async () => {
  try {
    // Test direct JSON import
    const testJson = await import('@data/json/test_sync.json');
    console.log('✅ Direct JSON import successful');
    return true;
  } catch (error) {
    console.error('❌ JSON import failed:', error);
    return false;
  }
};

/**
 * Test path aliases
 */
const testPathAliases = () => {
  try {
    // Test various path aliases
    require('@/App');
    require('@services/debug');
    require('@components/ContentRenderer');
    console.log('✅ Path aliases working');
    return true;
  } catch (error) {
    console.error('❌ Path alias resolution failed:', error);
    return false;
  }
};

/**
 * Test TypeScript types
 */
const testTypeScript = () => {
  try {
    // Verify type system
    const item: ContentItem = {
      id: 'TEST',
      type: 'Quiz',
      category: 'Test',
      tags: ['test'],
      question: 'Test?',
      answer: 'Test!',
      options: [
        { text: 'Test', isCorrect: true },
        { text: 'Wrong', isCorrect: false }
      ],
      difficulty: 1
    };
    console.log('✅ TypeScript types working');
    return true;
  } catch (error) {
    console.error('❌ TypeScript validation failed:', error);
    return false;
  }
};

/**
 * Test file system access
 */
const testFileSystem = async () => {
  try {
    const jsonDir = FileSystem.documentDirectory + 'data/json';
    const info = await FileSystem.getInfoAsync(jsonDir);
    console.log('✅ File system access working');
    return true;
  } catch (error) {
    console.error('❌ File system access failed:', error);
    return false;
  }
};

/**
 * Run all configuration tests
 */
export const runConfigTests = async () => {
  console.log('\n=== Configuration Tests ===\n');
  
  const results = {
    jsonImport: await testJsonImport(),
    pathAliases: testPathAliases(),
    typeScript: testTypeScript(),
    fileSystem: await testFileSystem(),
  };

  console.log('\n=== Test Results ===');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${test}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  });
  console.log('\n=======================\n');

  return results;
};

/**
 * Get environment info
 */
export const getEnvironmentInfo = () => {
  return {
    expoVersion: Constants.expoVersion,
    appVersion: Constants.manifest?.version || 'unknown',
    buildType: __DEV__ ? 'development' : 'production',
    platform: Constants.platform?.ios ? 'iOS' : 'Android',
  };
};