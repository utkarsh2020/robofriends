import React,{useState,useEffect} from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

import './App.css';

function App() {    
    const[robots,setRobots] =useState([]);    
    const[searchField,setSearchField] = useState('');

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {setRobots(users)});
    },[])   

    const onSearchChange = (event) => {
        setSearchField(event.target.value);        
    }

    const filteredRobots = robots.filter(robo => {
        return robo.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return(       
        robots.length === 0 
        ?
             <h1>Loading...</h1>
        :           
            <div className='tc'>
                <h1 className ='f1'>RoboFriends </h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>                    
                </Scroll>                   
            </div>      
    )    
}

export default App;