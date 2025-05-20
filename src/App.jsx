
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
        <td style={{color:'green'}}>{name}</td>
        <td>{animal.breed}</td>
        <td><input onChange={(event) => onChange(animal.name, event.target.checked)} type="checkbox" checked={animal.isAdopted}/></td>
        <td><button onClick={() => onDelete(animal.name)}>delete</button></td>
      </tr>
      </>
    )
};

const AnimalTable = ({ animals, onDelete, onChange }) =>{
  const rows = [];
   animals.forEach((animal) => {
     rows.push(
       <AnimalRow animal={animal} key={animal.name} onDelete={onDelete} onChange={onChange}  />
     );
  });

    return (
      <>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Raza</th>
                <th>Is Adopted?</th>

            </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
      </>
    );
};


function AnimalCreationForm ({onCreate}) {
  return (
    <form onSubmit={onCreate}>
      <input name="name" type="text" placeholder='Pet Name' />
      <input name="breed" type="text" placeholder='Pet Breed' />
      <label>
        <input type="checkbox" name="adopted" />
        is Adopted?
      </label>
      <input type="submit"  />    
      </form>
  )
};

const FilterableTable = () => {
  const [animals, setAnimals] = useState([])
  // const [nextID, setNextID] = useState(0)

  const addPet = (event) => {
    let animal = {
      name: event.target[0].value,
      breed: event.target[1].value,
      isAdopted: event.target[2].checked
      // Id: nextID
      
    };

    setAnimals((currentAnimals) => [...currentAnimals, animal])
    event.preventDefault()
  
    // setNextID
  }

  const deletePet = (key) =>{
    setAnimals((currentAnimals)=> {
      return currentAnimals.filter((animal) => animal.name !== key)
    })
  }

  const updateStatus = (key,newState) => {
    setAnimals((currentAnimals)=>{
      return currentAnimals.map((animal)=>{
        if (animal.name === key) {
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
    <div>
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


