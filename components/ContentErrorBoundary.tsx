import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { theme } from '../constants/theme';

interface Props {
  children: ReactNode;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ContentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Content Error:', error);
    console.error('Error Info:', errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Card style={styles.errorCard}>
            <Card.Content>
              <Title style={styles.errorTitle}>
                Erreur de chargement du contenu
              </Title>
              <Paragraph style={styles.errorText}>
                Une erreur s'est produite lors du chargement du contenu. 
                Veuillez réessayer ou contacter le support si le problème persiste.
              </Paragraph>
              {this.props.onRetry && (
                <Button
                  mode="contained"
                  onPress={this.handleRetry}
                  style={styles.retryButton}
                >
                  Réessayer
                </Button>
              )}
            </Card.Content>
          </Card>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  errorCard: {
    elevation: 2,
  },
  errorTitle: {
    color: theme.colors.error,
    marginBottom: 8,
  },
  errorText: {
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
});

export default ContentErrorBoundary;