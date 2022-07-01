import React, { useContext } from 'react'
import Countdown from 'react-countdown'
import { AuthContext } from '../../context/Authen';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
    //   console.log('days:'+days+'hour:'+hours+'minutes:'+minutes+'seconds'+seconds)
    //   console.log(props)
      return (
        <div className='col'>
            <div className='card shadow-sm'>
                <div style={{height: '320px', 
                backgroundImage:`url(${props.item.imgUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                }} className='w-100'/>
                <div className='card-body'>
                    <p className='lead display-6'>{props.item.name}</p>
                    <div className='d-flex justify-content-between align-item-center'>
                        <h5>
                            {days * 24 + hours} hr: {minutes} minutes: {seconds} seconds
                        </h5>
                    </div>
                    <p className='card-text'>{props.item.desc}</p>
                    <p className='card-text'>seller: {props.item.email}</p>
                    <div className='d-flex justify-content-between align-item-center'>
                        <div>
                            {!props.owner ? (
                                <div onClick={() => props.bid()} className='btn btn-outline-secondary'>Bid</div>
                            ) : props.owner.email === props.item.email ? (
                                <div onClick={() => props.endbid(props.item.id)} className='btn btn-outline-secondary'>Cancel</div>
                            ) : props.owner.email === props.item.curWinner ? (
                                <h5 className='display-6'>You win!</h5>
                            ) : (
                                <div onClick={() => props.bid(props.item.id, props.item.curPrice, props.item.bidPrice)} className='btn btn-outline-secondary'>Bid</div>
                            )}
                        </div>
                        <div className='display-6'>{props.item.curPrice} bath</div>
                    </div>
                </div>

            </div>
        </div>
      )
    }
  }; 

export const ItemsField = ({item}) => {
    let expDate = item.duration;
    const {currentUser , bid, endbid} = useContext(AuthContext);
 return <Countdown 
    owner={currentUser} 
    date={expDate} 
    bid={bid}
    endbid={endbid}
    item={item} 
    renderer={renderer} />
}
