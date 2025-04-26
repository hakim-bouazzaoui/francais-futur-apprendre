import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider, Badge, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dataSync, CONTENT_EVENTS } from '../services/dataSync';
import { contentRegistry } from '../services/contentRegistry';
import ContentTestHelper from '../services/contentTestHelper';
import { theme } from '../constants/theme';

// Rest of the file remains the same...