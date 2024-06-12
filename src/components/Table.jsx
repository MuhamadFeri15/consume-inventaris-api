import React, {useState} from "react";
import Navbar from "./Navbar";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit"
import ModalAdd from "./ModalAdd"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'




export default function Table({ dataTh, dataTd, columnDb, buttonData, endpoints, columnDetail, judulModalEdit, inputData, judulModalAdd }) {

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

    const [endpointsReplaced, setEndpointReplaced] = useState({})

    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)

    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)



    function handleModalDelete(id) {
      const endpointsDetail = endpoints['detail'];
      const endpointsDelete = endpoints['delete'];

      const detailReplaced = endpointsDetail.replace('{id}', id);
      const deleteReplaced = endpointsDelete.replace('{id}', id);



      const replaced = {
       "detail": detailReplaced,
       "delete" : deleteReplaced
      }

    
      setEndpointReplaced(replaced);
      setIsOpenModalDelete(true);
    };

    function handleModalEdit(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsEdit = endpoints['update'];
  
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const editReplaced = endpointsEdit.replace('{id}', id);
  
  
        const replaced = {
         "detal": detailReplaced,
         "update" : editReplaced
        }
  
      
        setEndpointReplaced(replaced);
        setIsOpenModalEdit(true);
      };
    

    function handleModalAdd() {
        const replaced = {
            "store" : endpoints['store']
        }
        setEndpointReplaced(replaced)
        setIsOpenModalAdd(true);
    }

    const navigate = useNavigate();

    function handleRestore(id) {
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
             navigate('/stuffs')
            })
            .catch(err => {
                console.log(err)
            })
    }




    
   

   


    


    return (
        <>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-5">
            {
                buttonData.includes("create") ? (
                    <button onClick={handleModalAdd} type="button" href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create</button>
                ) : ''
            }
             {
                buttonData.includes("trash") ? (
                    <Link to={'/stuff/trash'} type="button" href="#" class="ml-3 py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">trash</Link>
                ) : ''
            }
           

           
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {dataTh.map((data, index) => (
                            <th scope="col" class="px-6 py-3 dark:text-black" key={index}>{data}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {   
                        Object.entries(dataTd).map(([index, value]) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 text-right"> {parseInt(index) + 1}.</td>
                                {
                                    Object.entries(columnDb).map(([i, v]) => (
                                        <td class="px-6 py-4">{
                                            !v ? value[i] : value[i.replace(/[!@#$%^&]/, '')] ? value[i.replace(/[!@#$%^&]/, '')][v] : '0'
                                            
                                        } </td>
                                    ))
                                   
                        
                                }
                                <td class="px-6 py-4 ">
                                   
                                   {
                                        buttonData.includes("edit") ? (
                                            <button onClick={() => handleModalEdit(value.id)} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Edit</button>
                                        ) : ''
                                    } 
                                   {
                                    buttonData.includes("delete") ? (
                                        <button onClick={() => handleModalDelete(value.id)} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                                    ) : ''
                                   
                                   } 
                                    {
                                    buttonData.includes("restore") ? (
                                        <a  onClick={()=> handleRestore(value.id)} href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Restore</a>
                                    ) : ''
                                   } 
                                    {
                                    buttonData.includes("permanent-delete") ? (
                                        <a  onClick={()=> handlePermanentDelete(value.id)} href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ml-3"> permanent delete</a>
                                    ) : ''
                                   
                                   }
                                    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointsReplaced} columnDetail={columnDetail}></ModalDelete>
        <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced} />
        <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalAdd} inputData={inputData} endpoints={endpointsReplaced}></ModalAdd>
        </>
    );
}

// sortByPrice() {
//     this.setState(prevState => ({
//       sortBy(prevState, ['price'])
//     }));
//   }


{/* <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Blue</button>
<button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Green</button>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan</button>
<button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal</button>
<button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Lime</button>
<button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red</button>
<button type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink</button>
<button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purple</button> */}
