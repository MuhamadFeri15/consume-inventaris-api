import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Inbound() {
    const dataThParent = [
        "#",  
        "stuff_id",      
        "total",
        "date",
        "image",
        "Action"
    ]
    
    const [inbound, setInbound] = useState({});

   
    useEffect(() => {
        axios.get('http://localhost:8000/inbound-stuffs/', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setInbound(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);



    const columnDatabase = {
        "stuff_id":null,
        "total": null,
        "date" : null,
        "proof_file" : null
    }

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const endpoints = {
        "detail" : "http://localhost:8000/inbound-stuffs/{id}",
        "delete" : "http://localhost:8000/inbound-stuffs/delete/{id}",
        "update"  : "http://localhost:8000/inbound-stuffs/update/{id}",
        "trash" : "http://localhost:8000/inbound-stuffs/trash",
        "store" : "http://localhost:8000/inbound-stuffs/store"
    }

    const columnDetailModalDelete = 'name'

    const judulModalEdit = 'inbound'

    const inputData = {
        "stuff_id" : {
           "type" : "text",
           "options" : null
        },
         "total" : {
            "type" : "number",
            "options" : null
         },
         "date" : {
             "type" : "date",
             "options" : null
         },
         "proof_file" : {
            "type" : "file",
            "options" : null
        },

      }

   return(
    <>
     <Navbar />
     <div className="p-10">
     <Table dataTh={dataThParent} dataTd={inbound} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}/>
     </div>
    </>
   )
}