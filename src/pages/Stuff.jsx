import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";


export default function Stuffs() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/stuff', {
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
        "stuff_stock" : "total_available",
        "stuff_stock*" : "total_defec",
    }

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const endpoints = {
        "detail" : "http://localhost:8000/stuff/{id}",
        "delete" : "http://localhost:8000/stuff/delete/{id}",
        "update"  : "http://localhost:8000/stuff/update/{id}",
        "trash" : "http://localhost:8000/stuff/trash",
        "store" : "http://localhost:8000/stuff/store"
    }

    const columnDetailModalDelete = 'name'

    const judulModalEdit = 'stuff'

  const inputData = {
    "name" : {
       "type" : "text",
       "options" : null
    },
    "category" : {
        "type" : "select",
        "options" : ['KLN', 'HTL', 'Teknisi/Sarpas']
     }
  }

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}/>

            </div>
        </>
    )
}