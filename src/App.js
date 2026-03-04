import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [names, setNames] = useState([]); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [favorites, setFavorites] = useState("");
  
  function handleChange(event) {
    setText(event.target.value);
  }

  function addName() {
    const cleaned = text.trim();    

    if (cleaned === "") {
      return;
    }

    if (names.includes(cleaned)) {
      alert("Такое имя уже есть!");
        return setText("");
    }

    setNames([...names, cleaned]);
    setText("");
  }

  function deleteName(indexToDelete){
    const updatedNames = [];
    
    for(let i = 0; i < names.length; i++){
      if(i !== indexToDelete) {
        updatedNames.push(names[i]); 
      }
    }
    setNames(updatedNames);

    const updatedFavorites = [];

    for (let i = 0; i < favorites.length; i++) {
      const favIndex = favorites[i];

      if(favIndex === indexToDelete){
        continue; 
      }
      if(favIndex > indexToDelete) {
        updatedFavorites.push(favIndex - 1);
      }else {
        updatedFavorites.push(favIndex);
      }
    }
    setFavorites(updatedFavorites);
  }

  function startEdit(index) {
    setEditingIndex(index);
    setEditText(names[index]);
  }

  function cancelation() {
    setEditingIndex(null);
    setEditText("")
  }
  

  function saveEdit(index) {
    const cleaned = editText.trim();

    if (names.includes(cleaned)) {
      alert("Такое имя уже есть!");
      return
    }

    if (cleaned === "") return;
    const updated = [...names];
    updated[index] = cleaned;
    setNames(updated);
    setEditingIndex(null);
    setEditText("") 
  }

  
  function favoriteNames(name) {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter(favName => favName !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  }

  return (
    <div style={{
      padding: 20, //отсуп внутри блока
      fontFamily: "Arial",
      maxWidth: 350, //макс ширина блока
      margin: "40px auto", // отступы снаружи блока, auto- по центру автоматически
      border: "1px solid #ccc",
      borderRadius: 8, // скругление углов
    }}>
      <h2>Всего имен: {names.length}</h2>

      <div style={{marginBottom: 16}}>
        <input
          type="text"
          placeholder="Введите имя"
          value={text}
          onChange={handleChange}
          style={{
            padding: 6,
            borderRadius: 4,
            border: "1px solid #aaa"
          }}

          />

          <button onClick={addName}
          style={{
            color: "black",                  
            backgroundColor: "white",      
            // border: "2px solid black",       
            marginLeft: 8,
            padding: "6px 10px",
            cursor: "pointer",
            borderRadius: 4
          }}
          >Добавить</button>

      </div>

            <ul style={{ paddingLeft: 20 }}>
        {names.map((name, index) => ( 
          <li key={index} 
          style={{ 
            marginBottom: 10,
            fontWeight: favorites.includes(index) ? "bold" : "normal",
            fontStyle: favorites.includes(index) ? "italic" : "normal"
            }}>
            {editingIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={()=> saveEdit(index)}
                style={{
                  color: "green",                  
                  backgroundColor: "white",      
                  // border: "2px solid green",       
                  marginLeft: 8,
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: 4
                }}
                >Сохранить</button>
                <button onClick={() => cancelation()}
                style={{
                  color: "grey",                  
                    backgroundColor: "white",      
                    // border: "2px solid grey",       
                    marginLeft: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    borderRadius: 4
                }}
                >Отменить</button>
              </>
            ) : (
                <>
                  {name} 
                  <button onClick={() => startEdit(index)}
                  style={{
                    color: "black",                  
                    backgroundColor: "white",      
                    // border: "2px solid black",       
                    marginLeft: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    borderRadius: 4
                  }}
                  >Изменить</button>
                  <button onClick={() => deleteName(index)}
                  style={{
                    color: "red",                  
                    backgroundColor: "white",      
                    // border: "2px solid red",       
                    marginLeft: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    borderRadius: 4
                  }}
                  >Удалить</button>

                  <button onClick={() => favoriteNames(index)}
                  style={{
                    backgroundColor: "white",
                    marginLeft: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    borderRadius: 4
                  }}
                >⭐️</button>
                </>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
  
}

export default App;



