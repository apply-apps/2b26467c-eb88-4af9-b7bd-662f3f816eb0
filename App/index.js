// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = 20;
const BOARD_SIZE = Math.floor(width / CELL_SIZE) * CELL_SIZE;

const initialSnake = [
  { x: 4 * CELL_SIZE, y: 0 },
  { x: 3 * CELL_SIZE, y: 0 },
  { x: 2 * CELL_SIZE, y: 0 },
  { x: 1 * CELL_SIZE, y: 0 },
  { x: 0, y: 0 },
];

const getRandomPosition = () => {
  const positions = Array.from({ length: BOARD_SIZE / CELL_SIZE }, (_, i) => i * CELL_SIZE);
  return {
    x: positions[Math.floor(Math.random() * positions.length)],
    y: positions[Math.floor(Math.random() * (height / CELL_SIZE))],
  };
};

export default function App() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const intervalRef = useRef();

  const moveSnake = () => {
    const snakeCopy = [...snake];
    const head = { ...snakeCopy[0] };

    switch (direction) {
      case 'UP':
        head.y -= CELL_SIZE;
        break;
      case 'DOWN':
        head.y += CELL_SIZE;
        break;
      case 'LEFT':
        head.x -= CELL_SIZE;
        break;
      case 'RIGHT':
        head.x += CELL_SIZE;
        break;
    }

    snakeCopy.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition());
    } else {
      snakeCopy.pop();
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= width ||
      head.y >= height ||
      snakeCopy.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      clearInterval(intervalRef.current);
      setGameOver(true);
    } else {
      setSnake(snakeCopy);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(moveSnake, 200);
    return () => clearInterval(intervalRef.current);
  }, [snake, direction]);

  const restartGame = () => {
    setSnake(initialSnake);
    setFood(getRandomPosition());
    setDirection('RIGHT');
    setGameOver(false);
    intervalRef.current = setInterval(moveSnake, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      <View style={styles.board}>
        {snake.map((segment, index) => (
          <View key={index} style={[styles.snakeSegment, { left: segment.x, top: segment.y }]} />
        ))}
        <View style={[styles.food, { left: food.x, top: food.y }]} />
        {gameOver && (
          <View style={styles.gameOver}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Button title="Restart" onPress={restartGame} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // Ensures content does not overlap with the status bar
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#000',
    position: 'relative',
  },
  snakeSegment: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#0f0',
    position: 'absolute',
  },
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#f00',
    position: 'absolute',
  },
  gameOver: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});