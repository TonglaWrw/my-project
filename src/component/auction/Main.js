import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Authen'
import { Firestore } from '../../hooks/Firestore';
import { Additems } from './Additems';
import { ItemsField } from './ItemsField';
import { Progress } from './Progress';
import { Alert } from 'react-bootstrap'

export const Main = () => {
    const [item, setItem] = useState(null);
    const { currentUser , globalmsg } = useContext(AuthContext);
    const {docs} = Firestore('auctiondb');
    // console.log(docs)
  return (
    <div className='py-5'>
        <div className='container'> 
            {item && <Progress item={item} setItem={setItem} />}
            {globalmsg && <Alert variant="danger">{globalmsg}</Alert>}
            {currentUser && <Additems setItem={setItem}/>}
            {docs && (
                <div className='row row-col-1 row-cols-sm-2 row-cols-md-3 g-3'>
                    {docs.map((doc) => {
                        return <ItemsField item={doc} key={doc.id} />
                    })}
                </div>
            )}
        </div>
    </div>
  )
}
