/* 선언부 */

import React from "react";
// Component 들을 추가 해야지 아래에서 사용 할 수 있다.
// StatusBar, TextInput를 사용하기 위해서 Import 함
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";

/* 정의부 */

// height, width에 대한 정의를 내린다.
// windows라고 쓰면 전체 화면에 대한 길이를 정의.
const { height, width } = Dimensions.get("window");

/* Veiw Control */
export default class App extends React.Component {
  // state란..? 화면에 어떤 상태에 대한 선언?
  state = {
    newToDo: ""
  };
  render() {
    const { newToDo } = this.state;
    return (
      // View 안에 Compoenet 들은 순서대로 화면에 표시 된다.
      // ScrollView 안에 들어가는 To Do List는 새로운 파일을 생성하여 랜더하자 ( ToDo.js )
      <View style={styles.container}>
        <StatusBar barstyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <ScrollView>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }

  // Action에 대한 정의
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
}

/* Style Define */

// styles에 대한 상세 정의는 아래와 같이 한다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    // 좌우중간
    alignItems: "center"
    // 상하중간
    //justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    // 위 여백
    marginTop: 50,
    // 글자 굵기
    fontWeight: "200",
    // 아래 여백
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    // 모서리 둥글게
    //borderRadius: 10
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // Shodow는 android, ios 둘다 다르다
    // 그래서 Platform 이 뭔지 알아야 한다.
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        // 투명도
        shadowOpacity: 0.5,
        // 그림자 곡률
        shadowRadius: 5,
        shadowOffset: {
          // 위로 뻗도록
          height: -1,
          // 좌우는 없도록
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    // 상하좌우여백
    padding: 20,
    // 아래 테두리 색상
    borderBottomColor: "#bbb",
    // 아래 테두리 굵기
    borderBottomWidth: 1,
    fontSize: 25
  }
});
