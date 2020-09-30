import React, { Component } from 'react'


const AwesomeMap = (props)=>{
   
   const tiles = props.tiles

   return( 
      <div className="awesome-map">
         {tiles.map(renderMapRow)}
      </div>
      
   );
}

const renderMapRow = (tileRow, index)=>{
   return(
      <tr key={index}>
         {tileRow.map(renderMapTile)}
      </tr>
   )
}
const renderMapTile= (tile, index)=>{
   const imgUrl=process.env.PUBLIC_URL +"/images/"+tile
   return(
      <td><img src={imgUrl} alt={imgUrl}/></td>
   )
}

export default AwesomeMap 