import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import he from 'he';
// import Home from './Home';
import Login from './Login';

const App = () => {
  const [answered, setAnswered] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [question, setQuestion] = useState("");
  const [count, setcount] = useState(0);
  const [correctcount, setcorrectcount] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [check, setcheck] = useState(null);
  const handleLogin = () => {
    setLoggedIn(true);
    // You may perform additional actions after a successful login
  };
  const loadQuestion = async () => {
    // Check if selectedCategory is defined
    if (!selectedCategory || selectedCategory === 'Select Category') {
      setQuestion('Please select a category');
      setOptions([]);
      return;
    }


    // const categoryParam = selectedCategory === "" ? "" : `&category=${selectedCategory }`;
    const APIUrl = `https://opentdb.com/api.php?amount=1${categoryOptions[selectedCategory]}`;

    // const categoryParam = selectedCategory === 'General Knowledge' ? '' : `&category=${selectedCategory.toLowerCase()}`;
    // const APIUrl = `https://opentdb.com/api.php?amount=1${categoryParam}`;

    try {
      let res = await fetch(APIUrl);
      let data = await res.json();

      if (data && data.results && data.results.length > 0) {
        // Decode the URL-encoded question
        const decodedQuestion = he.decode(data.results[0].question);
        setQuestion(decodedQuestion);

        // Decode the URL-encoded options
        const decodedOptions = data.results[0].incorrect_answers.map(option => decodeURIComponent(option));
        const decodedCorrectOption = decodeURIComponent(data.results[0].correct_answer);
        // Correct = decodeURIComponent(data.results[0].correct_answer);
        setCorrectAnswer(decodedCorrectOption);
        // Randomly insert the correct option among incorrect options
        const randomIndex = Math.floor(Math.random() * (decodedOptions.length + 1));
        decodedOptions.splice(randomIndex, 0, decodedCorrectOption);

        setOptions(decodedOptions);
      } else {
        setQuestion('Loading...');
        setOptions([]);
        setTimeout(loadQuestion, 10);
        // setCorrectAnswer('');
      }
    } catch (e) {
      setQuestion('loading Next Question');
      setOptions([]);

      // console.warn('Error fetching question:', e);
    }
  };

  const categoryOptions = {
    'Any Category': '',
    'General Knowledge': '9',
    'Sports': '21',
    'Art': '25',
    'Animals': '27',
    'History': '23',
    'Entertainment: Books': '10',
    'Entertainment: Film': '11',
    'Entertainment: Video Games': '15',
    'Entertainment: Board Games': '16',
    'Science & Nature': '17',
    'Science: Computers': '18',
    'Science: Mathematics': '19',
    'Mythology': '20',
    'Geography': '22',
    'Politics': '24',
    'Celebrities': '26',
    'Vehicles': '28',
    'Science: Gadgets': '30',
  };
  const categories = Object.keys(categoryOptions);
  const [selectedCategory, setSelectedCategory] = useState('General Knowledge');

  const onSelectCategory = (selectedItem, index) => {
    setSelectedCategory(selectedItem);
  };
  const checkAnswer = (selectedOption) => {
    if (selectedOption !== correctAnswer) {
      setcheck(0);
      setcount(count + 1);
    } else {
      setcorrectcount(correctcount + 1);
      setcheck(1);
    }

    setAnswered(true); // Set answered state to true

    setTimeout(() => {
      loadQuestion();
      setAnswered(false); // Reset answered state to false for the next question
      setcheck(null);
    }, 550);
  };



  const startQuiz = () => {
    // Implement the logic for starting the quiz
    console.log('Quiz started for category:', selectedCategory);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        {!loggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>QuizTime!</Text>

            <View style={styles.startButtonContainer}>
              <View style={styles.dropdownContainer}>
                <SelectDropdown
                  data={categories}
                  onSelect={onSelectCategory}
                  defaultButtonText={'Any Category'}
                  buttonTextAfterSelection={(selectedItem) => selectedItem}
                  rowTextForSelection={(item) => item}
                  buttonStyle={styles.dropdown}
                  dropdownStyle={{
                    backgroundColor: '#fafafa',
                    borderRadius: 12,
                    elevation: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.6,
                    shadowRadius: 3,
                  }}
                  rowStyle={{ backgroundColor: '#fafafa' }}
                  rowTextStyle={{ color: '#222222' }}
                />
              </View>

              <View style={styles.startButton}>
                {selectedCategory !== 'Select Category' && (
                  <TouchableOpacity onPress={loadQuestion}>
                    <Text style={{ fontSize: 22, fontWeight: "bold", color: 'white' }}>Start</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.quest}>{question}</Text>
            <Text style={styles.title}>{selectedCategory}</Text>

            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => !answered && checkAnswer(option)} // Disable onPress if answered
              >
                <Text style={styles.op}>{option}</Text>
              </TouchableOpacity>
            ))}


            <View style={styles.answerStatusContainer}>
              <Text style={styles.answerStatus}>
                {check === 0 ? <Text style={styles.box}>Wrong Answer 😯: {correctAnswer}</Text> : <Text style={styles.box}>Correct Answer :- {correctcount}</Text>}
              </Text>
              <Text style={styles.answerStatus}>Question {count}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,

  },
  dropdown: { borderRadius: 23 },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 42,
  },
  startButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 20,

  },
  dropdownContainer: {
    flex: 1,

  },
  startButton: {
    backgroundColor: 'rgb(136, 84, 192)',

    borderRadius: 23,
    padding: 8,
    width: 80,
    alignItems: 'center',

  },
  box: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",

  },
  quest: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  content: {
    fontSize: 23,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 120,


  },

  answerStatusContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,

  },

  answerStatus: {
    fontSize: 23,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 30,
    marginTop: 10,
    backgroundColor: 'rgb(136, 84, 192)',
    borderRadius: 15,
    height: 45,
    width: 300,
    padding: 5,
    color: "white"
  },
  op: {
    
    padding:12,
    backgroundColor: 'rgb(136, 84, 192)',
    borderRadius:12,
    color:"white",
width:350,
    // marginRight: ,
    marginTop: 15,
    lineHeight: 20,
    fontSize: 23,
  },

  shadowBox: {
    // Add shadow properties for Android
    elevation: 5,
    // Add shadow properties for iOS (optional, as it doesn't affect Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    fontSize: 16, textAlign: "center",
    fontWeight: "800",
    backgroundColor: 'rgb(136, 84, 192)',
    //  width:auto,
    // marginLeft:,
    marginTop: 11,
    marginBottom: 11,
    color: "#fff",
    borderRadius: 12,
    padding: 7

  }
});

export default App;