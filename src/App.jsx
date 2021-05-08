import React, { useEffect, useState } from 'react';
import image from './images/todo.png';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import EditIcon from '@material-ui/icons/Edit';




// to get the data from localstorage***********************




const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    console.log(list);

    if(list){
        return JSON.parse( localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}


////////////////////**/////////////////////////////////


const App = () =>{





    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);






// addd items***********************


    const addItems = () =>{
        if(!inputData){
            alert("Please Enter Data");
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem)
                    {
                        return {...elem, name:inputData}
                    }

                    return elem;
                })
            )


            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null)


        }
        else{
            const allInputData = {id:new Date().getTime().toString(), name:inputData}
        setItems([...items,allInputData]);
        setInputData('');
        }
    }








    // delete items***********************



    const deleteItem = (index) =>{
        const updatedItems = items.filter((elem)=>{
            return index !== elem.id
        });

        setItems(updatedItems)
    }









// edit items***********************



    const editItem = (id) =>{
        let newEditItems = items.find((elem)=>{
            return elem.id == id;
        })
        console.log(newEditItems);

        setToggleSubmit(false);

        setInputData(newEditItems.name);

        setIsEditItem(id)
    }






    // delete all items***********************




    const removeAll = () =>{
        setItems([])
    }








// show items***********************



    const inputEvent = (e) =>{
        setInputData(e.target.value)
    }







/// local storage


    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items])



//////////////////////////



    

// ui part***********************




    return(
       <>

        <div className='navbar'>
            <h1>📝 TODO LIST 📝</h1>
        </div>

       <div className='main_div'>
           <div className='child_div'>
               <figure>
                   <img src={image} alt='todo_logo' height='80' width='80'/>
                <figcaption>Add Your List Here ✍️</figcaption>
               </figure>



               <div className='addItem'>
                    <input type='text' 
                        placeholder='Enter Your Todo List'
                        onChange={inputEvent} 
                        value={inputData}
                    />

                    {
                        
                        toggleSubmit?<div className='btn'><Button className='add-btn' title='add Item' onClick={addItems}>
                    <AddIcon />
                    </Button></div>:<div className='btn'><Button className='edit-btn' title='edit Item' onClick={addItems}>
                    <EditIcon />
                    </Button></div>
                    }

                    

               </div>








               <div className='showItems'>
                   <Button className='removeAll' onClick={removeAll}>Remove all<ClearAllIcon/></Button>
               </div>

               <div className='show_item'>
              { items.map((elem)=>{
                return(
                    <div className='each_item' key={elem.id}>

                    <h3>{elem.name}</h3>
                    <div className='todoBtn'>
                    <EditIcon className='edit' onClick={()=>editItem(elem.id)}/>
                     <DeleteIcon className='dlt' onClick={()=>deleteItem(elem.id)}/>
                     </div>
                   
                </div>
                )
               })}
                
               </div>
               
           </div>
       </div>
      <div>
          <footer>
              <h4>Made With ❤️ By Swati Thakare</h4>
          </footer>
      </div>
       </>
    )
}




export default App;