import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

const buttons = [
  {
    backgroundColor: '#636466',
    title: 'AC',
    disable: false,
    borderColor: '#555759',
    onPress: () => 'clear',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#636466',
    title: '',
    disable: true,
    borderColor: 'transparent',
    onPress: () => {},
    color: 'transparent',
    isWide: true
  },
  {
    backgroundColor: '#636466',
    title: '÷',
    disable: false,
    borderColor: '#555759',
    onPress: () => '÷',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '7',
    disable: false,
    borderColor: '#555759',
    onPress: () => '7',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '8',
    disable: false,
    borderColor: '#555759',
    onPress: () => '8',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '9',
    disable: false,
    borderColor: '#555759',
    onPress: () => '9',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#ff9a00',
    title: '×',
    disable: false,
    borderColor: '#555759',
    onPress: () => '×',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '4',
    disable: false,
    borderColor: '#555759',
    onPress: () => '4',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '5',
    disable: false,
    borderColor: '#555759',
    onPress: () => '5',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '6',
    disable: false,
    borderColor: '#555759',
    onPress: () => '6',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#ff9a00',
    title: '−',
    disable: false,
    borderColor: '#555759',
    onPress: () => '-',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '1',
    disable: false,
    borderColor: '#555759',
    onPress: () => '1',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '2',
    disable: false,
    borderColor: '#555759',
    onPress: () => '2',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '3',
    disable: false,
    borderColor: '#555759',
    onPress: () => '3',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#ff9a00',
    title: '+',
    disable: false,
    borderColor: '#555759',
    onPress: () => '+',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#505050',
    title: '0',
    disable: false,
    borderColor: '#555759',
    onPress: () => '0',
    color: '#e8e9ea',
    isWide: true
  },
  {
    backgroundColor: '#505050',
    title: ',',
    disable: false,
    borderColor: '#555759',
    onPress: () => '.',
    color: '#e8e9ea'
  },
  {
    backgroundColor: '#ff9a00',
    title: '=',
    disable: false,
    borderColor: '#555759',
    onPress: () => '=',
    color: '#e8e9ea'
  }
];

const scientificButtons = [
  ['(', ')', 'mc', 'm+', 'm-', 'mr'],
  ['2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ'],
  ['¹/x', '√x', '∛x', 'ʸ√x', 'ln', 'log₁₀'],
  ['x!', 'sin', 'cos', 'tan', 'e', 'EE'],
  ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand']
];

const App = () => {
  const [input, setInput] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [memory, setMemory] = useState(0);
  const [secondOperand, setSecondOperand] = useState(null);
  const [isSecondFunction, setIsSecondFunction] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };
    Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();
    return () => Dimensions.removeEventListener('change', updateOrientation);
  }, []);

  const handleNumber = (num) => {
    setInput((prev) => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op) => {
    setInput((prev) => {
      const lastChar = prev.slice(-1);

      if (['+', '-', '×', '÷', '.'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      
      return prev + op;
    });
  };


  const safeEval = (rawExpr) => {
    let expr = rawExpr.trim();

    expr = expr.replace(/÷/g, '/').replace(/×/g, '*');

    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      throw new Error("Niedozwolone znaki w wyrażeniu: " + expr);
    }

    return eval(expr);
  };


  const calculate = () => {
    try {
      let expr = input;

      if (/[+\-×÷.]$/.test(expr)) {
        expr = expr.slice(0, -1);
      }

      const result = safeEval(expr);

      if (result === undefined) throw new Error("Wynik undefined");

      setInput(result.toString());
    } catch (err) {
      console.error("Błąd eval:", err);
      setInput("Błąd");
    }
  };


  const clear = () => {
    setInput('0');
    setOperator(null);
    setFirstValue(null);
    setSecondOperand(null);
    setIsSecondFunction(false);
  };

  const handleScientificFunction = (func) => {
    let value = parseFloat(input);
    let result = value;

    switch (func) {
      case '2ⁿᵈ':
        setIsSecondFunction(!isSecondFunction);
        return;
      case 'x²': result = isSecondFunction ? Math.sqrt(value) : value ** 2; break;
      case 'x³': result = isSecondFunction ? Math.cbrt(value) : value ** 3; break;
      case 'xʸ':
        if (firstValue !== null) {
          result = firstValue ** value;
          setFirstValue(null);
        } else {
          setFirstValue(value);
          setInput('0');
          return;
        }
        break;
      case '√x': result = Math.sqrt(value); break;
      case '∛x': result = Math.cbrt(value); break;
      case 'ʸ√x':
        if (secondOperand !== null) {
          result = Math.pow(secondOperand, 1 / value);
          setSecondOperand(null);
        } else {
          setSecondOperand(value);
          setInput('0');
          return;
        }
        break;
      case '¹/x': result = 1 / value; break;
      case 'ln': result = Math.log(value); break;
      case 'log₁₀': result = Math.log10(value); break;
      case 'x!': 
        result = 1;
        for (let i = 2; i <= value; i++) result *= i;
        break;
      case 'sin': result = Math.sin(value); break;
      case 'cos': result = Math.cos(value); break;
      case 'tan': result = Math.tan(value); break;
      case 'sinh': result = Math.sinh(value); break;
      case 'cosh': result = Math.cosh(value); break;
      case 'tanh': result = Math.tanh(value); break;
      case 'e': result = Math.E; break;
      case 'EE': result = value * Math.pow(10, value); break;
      case 'Rand': result = Math.random(); break;
      case 'π': result = Math.PI; break;
      case 'Rad': break;
      case 'eˣ': result = Math.exp(value); break;
      case '10ˣ': result = 10 ** value; break;
      default: return;
    }

    setInput(result.toString());
  };

  const handleMemory = (memFunc) => {
    let value = parseFloat(input);
    switch(memFunc) {
      case 'mc': setMemory(0); break;
      case 'm+': setMemory(memory + value); break;
      case 'm-': setMemory(memory - value); break;
      case 'mr': setInput(memory.toString()); break;
    }
  };

  const handleButtonPress = (button) => {
    const action = button.onPress();
    
    if (action === 'clear') {
      clear();
    } else if (action === '=') {
      calculate();
    } else if (['+', '-', '×', '÷'].includes(action)) {
      handleOperator(action);
    } else if (action === '.') {
      handleDot();
    } else if (!isNaN(action)) {
      handleNumber(action);
    }
  };

  const handleDot = () => {
    setInput((prev) => {
      const parts = prev.split(/[\+\-×÷]/);
      const lastPart = parts[parts.length - 1];

      if (lastPart.includes('.')) return prev;

      return prev + '.';
    });
  };


  const renderScientificButtons = () => (
    <View style={styles.scientificArea}>
      {scientificButtons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((func, btnIndex) => (
            <TouchableOpacity 
              key={btnIndex}
              style={[styles.button, styles.dark, {
                minHeight: 50
              }]} 
              onPress={() => {
                if (['mc', 'm+', 'm-', 'mr'].includes(func)) {
                  handleMemory(func);
                } else {
                  handleScientificFunction(func);
                }
              }}
            >
              <Text style={styles.buttonText}>{func}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );

 const renderKeyboard = () => {
    const rows = [];
    let currentRow = [];
    
    buttons.forEach((button, index) => {
      currentRow.push(
        <TouchableOpacity
          key={index}
          disabled={button.disable}
          style={[
            styles.button,
            { 
              backgroundColor: button.backgroundColor,
              flex: button.isWide ? 2 : 1,
              minHeight: isLandscape ? 50 : 80 
            }
          ]}
          onPress={() => handleButtonPress(button)}
        >
          <Text style={[styles.buttonText, { color: button.color }]}>
            {button.title}
          </Text>
        </TouchableOpacity>
      );

      if ((index === 2) || (index === 6) || (index === 10) || (index === 14) || (index === 17)) {
        rows.push(
          <View key={`row-${index}`} style={styles.row}>
            {currentRow}
          </View>
        );
        currentRow = [];
      }
    });
    
    return <View style={styles.keyboard}>{rows}</View>;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {isLandscape ? (
          <>
            <View style={styles.displayLandscape}>
              <Text style={styles.displayText}>{input}</Text>
            </View>

            <View style={styles.calculatorAreaLandscape}>
              {renderScientificButtons()}
              {renderKeyboard()}
            </View>
          </>
        ) : (
          <>
            <View style={styles.display}>
              <Text style={styles.displayText}>{input}</Text>
            </View>

            <View style={styles.calculatorArea}>
              {renderKeyboard()}
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  display: { flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  displayLandscape: {
    height: '25%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    backgroundColor: '#000',
  },
  displayText: { fontSize: 70, color: 'white', fontWeight: '200' },
  calculatorArea: { flex: 3, flexDirection: 'row' },
  calculatorAreaLandscape: { flex: 1, flexDirection: 'row', height: '75%' },
  scientificArea: { flex: 2, justifyContent: 'flex-end' },
  keyboard: { flex: 2, justifyContent: 'flex-end' },
  row: { flexDirection: 'row' },
  button: { flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1 },
  dark: { backgroundColor: '#505050' },
  gray: { backgroundColor: '#A5A5A5' },
  orange: { backgroundColor: '#FF9500' },
  buttonText: { color: 'white', fontSize: 24, fontWeight: '400' },
});

export default App;