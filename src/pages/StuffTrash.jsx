import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar"
import Table from "../components/Table"
import axios from "axios"

export default function StuffTrash() {

    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/stuff/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setStuffs(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const columnDatabase = {
        "name":null,
        "category":null,
     
    }

    const buttons = [
       "restore",
       "permanent-delete"
    ]

    const endpoints = {
        "restore": "http://localhost:8000/stuff/trash/restore/{id}",
        "permanent-delete": "http://localhost:8000//stuff/trash/delete-permanent/{id}",
    }

    const columnDetailModalDelete = ''

    const judulModalEdit = ''

  const inputData = {}


    return (
        <>
        <Navbar />
        <div className="p-10">
         <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}/>
         </div>
        </>
    )
}