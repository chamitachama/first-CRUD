import "./App.css"
import { useState } from 'react'

// const Animals = [
//     { category: "Gato", raza: "carey", adopted: true, name: "Maladeta" },
//     { category: "Gato", raza: "angora", adopted: true, name: "Sen" },
//     { category: "perro", raza: "dalmata", adopted: false, name: "Vaca" },
//     { category: "perro", raza: "chow-chow", adopted: true, name: "Peluso" },
// ];





const AnimalRow = ({ animal, onDelete, onChange }) => {
    const name = animal.isAdopted ? animal.name :
    <span style={{color:'red'}}>{animal.name}</span>
  
    return(
      <> 
      <tr>
        <td>{animal.id}</td>
        <td style={{color:'black'}}>{name}</td>
        <td>{animal.breed}</td>
        <td> <div className="checkbox-wrapper-29">
                    <label className="checkbox">
                    <input onChange={(event)=> onChange(animal.id,event.target.checked)} checked={animal.isAdopted} type="checkbox" className="checkbox__input" />  
                    <span className="checkbox__label"></span>
                </label>   
            </div></td>
        <td>{animal.age}</td>
        <td><button onClick={() => onDelete(animal.id)}>Delete Pet</button></td>
      </tr>

      </>
    )
};

const AnimalTable = ({ animals, onDelete, onChange }) =>{
  const rows = [];
   animals.forEach((animal) => {
     rows.push(
       <AnimalRow animal={animal} key={animal.id} id={animal.id} onDelete={onDelete} onChange={onChange}  />
     );
  });

    return (
      <>
        <div className="container">
            <table>
                <thead>
                <tr>
                    <th className="id">ID</th>
                    <th>Name</th>
                    <th>Breed</th>
                    <th>Adopted</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>        
      </>
    );
};


function AnimalCreationForm ({onCreate}) {

    const [petName, setPetName] = useState('');


    const handleNameChange = (event) => {
        setPetName(event.target.value)
        console.log(setPetName)
    }
        

    return (
      <>
        <h1>Enter a new Pet</h1>
        <h2>Preview: {petName}</h2>
        <form onSubmit={onCreate}>
            <label htmlFor="name">Name         <input name="name" type="text" placeholder='Please enter a Name' onChange={handleNameChange} value={petName} />
</label>
        <input name="breed" type="text" placeholder='Please enter a Breed' />
        <input name="age" type="number" placeholder="How old is it?"/>
        <label>
            <input className="check" type="checkbox" name="adopted" />
            Is " {petName} " Adopted?
        </label>
        <input type="submit"  />    
        </form>
    </>
  )
};




const FilterableTable = () => {
  const [animals, setAnimals] = useState([])
  const [nextID, setNextID] = useState(1)

  const addPet = (event) => {
    let animal = {
      id: nextID,
      name: event.target[0].value,
      breed: event.target[1].value,
      age: event.target[2].value,
      isAdopted: event.target[3].checked
      
    };

    setAnimals((currentAnimals) => [...currentAnimals, animal])
    event.preventDefault();

    setNextID(nextID + 1)

    }

  const deletePet = (key) =>{
    setAnimals((currentAnimals)=> {
      return currentAnimals.filter((animal) => animal.id !== key)
    })
  }

  const updateStatus = (key,newState) => {
    setAnimals((currentAnimals)=>{
      return currentAnimals.map((animal)=>{
        if (animal.id === key) {
          return {
            ...animal,
            isAdopted: newState
          };
        } else {
          return animal;
        }
      })
    })
  }
  
  return (
    <div className="filteredTable">
      <AnimalCreationForm onCreate={addPet}/>
      <AnimalTable animals={animals} onDelete={deletePet} onChange={updateStatus} />
    </div>
  )
};

function App() {
  
    return (
      <>
      <FilterableTable />
      </>
    )
  }
  
  export default App


