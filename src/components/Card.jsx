import profilePic from '../assets/chisnolan.jpg'

function Card(){
     
    return (
         <div className="card">
            <img className="card-image" src={profilePic} alt="profile picture"></img>
            <h2 className='card-title'>Muhamad feri</h2>
            <p className='card-text'>saya membuat card ini dari tutorial youtube</p>
         </div>
    );
} 

export default Card