import {useState} from 'react';

export default function Player({initialName,symbol,isActive}){
    const [PlayerName,setPlayerName]=useState(initialName);
    const [isEditing,setIsEditing]=useState(false);
    function handelClick(){
       setIsEditing((editing)=>!editing);

    }
    function handelchange(event){
        console.log(event);
        setPlayerName(event.target.value)
    }
     let editableplayerName=<span className="player-name">{PlayerName}</span>;
    if(isEditing){
    editableplayerName=<input className="text" required  value={PlayerName} onChange={handelchange}/>;
    }
    
    return(
           <li className={isActive?'active':undefined}>
            <span className='player' >
          {editableplayerName}
          <span className="player symbol">{symbol}</span>
          </span>
           <button onClick={handelClick}>{isEditing?'save':'edit'}</button>
        </li>
           
    );
}




